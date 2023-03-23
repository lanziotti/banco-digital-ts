import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ModalLoginContextProvider } from './contexts/ModalLoginContext';

ReactDOM.createRoot(
  document.getElementById('root')).render(
    <React.StrictMode>
      <ModalLoginContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ModalLoginContextProvider>
    </React.StrictMode>
  );
