// test-utils.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {store} from './../store'; // Adjust the path to your rootReducer
import { render } from '@testing-library/react';

export function renderWithProviders(ui, {route = '/'} = {}) {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store,
  };
}
