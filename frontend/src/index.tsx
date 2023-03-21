import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
// import Home from './pages/Home';
// import Register from './pages/Register';
import Main from './pages/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Home /> */}
    {/* <Register /> */}
    <Main />
  </React.StrictMode>
);
