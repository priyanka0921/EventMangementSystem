import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Ensure this is the correct path to your App component
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './components/store';
axios.defaults.baseURL = 'http://localhost:5000';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
      
    </BrowserRouter>
  </React.StrictMode>
);
