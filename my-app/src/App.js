import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Login from '../src/components/Login/login';
import Register from './components/Login/register';
import Infor from './components/Home/infor';
import ProductsPage from './components/Home/ProductPage/productsPage';
import ProductDetailPage from './components/Home/ProductDetailPage/productDetailPage';
import OrderPage from './components/Home/OrderPage/order';
import PaymentPage from './components/Home/PaymentPage/payment';
import AdminHome from './components/Admin/home';
import AdminProduct from './components/Admin/Product/product';
import AdminUser from './components/Admin/User/user';
import AdminOrder from './components/Admin/Order/order';
import AdminLogin from './components/Admin/Login/login';
import AdminChat from './components/Admin/LiveChat/livechat';
import Chat from './components/Chat/chat'
import {Authenticate,NotAuthenticate,authMiddleware,AuthenticateAdmin} from '../src/middleware/authenticate';
import {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authMiddleware(dispatch)
  },[dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NotAuthenticate><Login /></NotAuthenticate>} />
        <Route path="/register" element={<NotAuthenticate><Register /></NotAuthenticate>} />
        <Route path="/infor" element={<Authenticate><Infor /></Authenticate>} />
        <Route path="/order" element={<OrderPage />}/>
        <Route path="/payment" element={<PaymentPage />}/>
        
        <Route path="/infor" element={<Infor />}/>
        <Route path="/products/category/:id" element={<ProductsPage />}/>
        <Route path="/product-detail/:id" element={<ProductDetailPage />}/>
        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AuthenticateAdmin><AdminHome /></AuthenticateAdmin>}/>
        <Route path="/admin/product" element={<AuthenticateAdmin><AdminProduct /></AuthenticateAdmin>}/>
        <Route path="/admin/user" element={<AuthenticateAdmin><AdminUser /></AuthenticateAdmin>}/>
        <Route path="/admin/order" element={<AuthenticateAdmin><AdminOrder /></AuthenticateAdmin>}/>
        <Route path="/admin/chat" element={<AuthenticateAdmin><AdminChat /></AuthenticateAdmin>}/>
        <Route path="/admin/login" element={<AdminLogin />}/>

        <Route path="/admin" element={<AuthenticateAdmin><AdminHome /></AuthenticateAdmin>}/>
        {/* CHAT */}
        <Route path="/chat" element={<Chat />}/>


      </Routes>

    </Router>
  );
}

export default App;