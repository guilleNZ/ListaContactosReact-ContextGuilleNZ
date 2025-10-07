import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ListaContactosProvider from './components/Context/ListaContactosContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListaContactosProvider>
      <App />
    </ListaContactosProvider>
  </React.StrictMode>
);
