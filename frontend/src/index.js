import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './providers/globalProvider';

ReactDOM.createRoot(
  document.getElementById('root')).render(
    <React.StrictMode>
      <GlobalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalProvider>
    </React.StrictMode>
  );
