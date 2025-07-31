import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/slices/productSlice';

import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Favourite from './pages/Favourite.js';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </main>

        <Footer />

        {/* Toast messages appear globally */}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
};

export default App;
