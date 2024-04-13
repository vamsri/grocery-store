import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App'; // Assuming you have an App.js component
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import './index.css'; // Assuming you have an index.css for global styles

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
