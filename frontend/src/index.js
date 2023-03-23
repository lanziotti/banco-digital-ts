import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from './contexts/GlobalContext';


ReactDOM.createRoot(
  document.getElementById('root')).render(
    <React.StrictMode>
      <GlobalContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalContextProvider>
    </React.StrictMode>
  );
