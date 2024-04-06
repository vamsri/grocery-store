import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './container/Home';
import Category from './container/Category';
import About from './container/About';
import NotFound from './container/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/about" element={<About />} />
          {/* Fallback route for 404 not found pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
