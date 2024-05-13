/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, 
  Outlet
} from 'react-router-dom';
import Home from './container/Home';
import Category from './container/Category';
import Product from './container/Product';
import Profile from './container/Profile';
import Document from './container/Document';
import About from './container/About';
import NotFound from './container/NotFound';
import Register from './container/Register';
import Login from './container/Login';
import CategoryImage from './container/CategoryImage';
import ProductImage from './container/ProductImage';
import 'react-toastify/dist/ReactToastify.css';

// import Dashboard from './Dashboard';

function App() {
  const isAuthenticated = useSelector(state => state.auth.value);  // Accessing state
  const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:id" element={<CategoryImage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductImage />} />
            <Route path="/tenant" element={<Profile />} />
            <Route path="/document" element={<Document />} />
            <Route path="/about" element={<About />} />
            {/* Fallback route for 404 not found pages */}
            <Route path="*" element={<NotFound />} />
          </Route>          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
