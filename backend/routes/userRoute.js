import express from 'express';
import { loginUser,adminLogin,registerUser, getUserProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminLogin);
userRouter.post('/profile', authUser, getUserProfile);

export default userRouter;
