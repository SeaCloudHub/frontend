import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Providers from './providers/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Providers>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Providers>
  </BrowserRouter>,
);
