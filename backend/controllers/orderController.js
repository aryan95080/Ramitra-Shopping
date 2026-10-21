import crypto from "crypto";
import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const deliveryFee = 10;

const getRazorpayInstance = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

const validateOrder = async (items, address) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your cart is empty");
  }
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    throw new Error("A delivery address is required");
  }

  const validatedItems = await Promise.all(
    items.map(async (item) => {
      const { _id, size, quantity } = item || {};
      if (
        typeof _id !== "string" ||
        typeof size !== "string" ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        throw new Error("Invalid item in order");
      }

      const product = await productModel.findById(_id);
      if (!product || !product.sizes.includes(size)) {
        throw new Error("A product or size in your cart is no longer available");
      }

      return { ...product.toObject(), size, quantity };
    })
  );

  const amount =
    validatedItems.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryFee;
  return { items: validatedItems, amount };
};

const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const { items, amount } = await validateOrder(req.body.items, address);
    await new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    }).save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (_req, res) => {
  res.json({ success: false, message: "Stripe payments are not configured" });
};

const placeOrderRazorpay = async (req, res) => {
  let newOrder;
  try {
    const { userId, address } = req.body;
    const { items, amount } = await validateOrder(req.body.items, address);
    const razorpay = getRazorpayInstance();

    newOrder = await new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    }).save();

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    res.json({ success: true, order });
  } catch (error) {
    if (newOrder) {
      try {
        await orderModel.findByIdAndDelete(newOrder._id);
      } catch (cleanupError) {
        console.error("Could not remove the unpaid order after Razorpay failed", cleanupError);
      }
    }
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const {
      userId,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body;
    const { RAZORPAY_KEY_SECRET } = process.env;

    if (
      !RAZORPAY_KEY_SECRET ||
      typeof razorpayOrderId !== "string" ||
      typeof razorpayPaymentId !== "string" ||
      typeof razorpaySignature !== "string" ||
      !/^[a-f\d]{64}$/i.test(razorpaySignature)
    ) {
      return res.json({ success: false, message: "Invalid payment verification data" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest();
    const receivedSignature = Buffer.from(razorpaySignature, "hex");
    if (!crypto.timingSafeEqual(expectedSignature, receivedSignature)) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    const razorpay = getRazorpayInstance();
    const gatewayOrder = await razorpay.orders.fetch(razorpayOrderId);
    if (
      gatewayOrder.status !== "paid" ||
      gatewayOrder.currency !== "INR" ||
      typeof gatewayOrder.receipt !== "string"
    ) {
      return res.json({ success: false, message: "Payment has not been completed" });
    }

    const order = await orderModel.findOne({
      _id: gatewayOrder.receipt,
      userId,
      paymentMethod: "Razorpay",
    });
    if (!order || gatewayOrder.amount !== Math.round(order.amount * 100)) {
      return res.json({ success: false, message: "Order not found for this payment" });
    }

    if (!order.payment) {
      order.payment = true;
      await order.save();
    }
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (_req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
