import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Assuming you have an index.css for global styles
import App from './App'; // Assuming you have an App.js component

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
