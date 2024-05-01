import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';
import Providers from './providers/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Providers>
      {/* <React.StrictMode> */}
      <ToastContainer />
      <App />
      {/* </React.StrictMode> */}
    </Providers>
  </BrowserRouter>,
);
