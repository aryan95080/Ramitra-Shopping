import React from 'react'
import { Routes,Route } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Loging from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ScrollToTop from './components/ScrollTop'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";


function App() {

  return (
    <div className='#ffffff w-full min-w-full'>
      <ToastContainer className='mr-[2%]'/>
      <Navbar/>
      <SearchBar/>
      <ScrollToTop/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/login' element={<Loging />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes here */}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App