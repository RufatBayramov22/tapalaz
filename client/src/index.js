import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AuthContextProvider } from './context/AuthContext.jsx';
import "../src/assets/scss/index.scss"
import "./utils/i18.js"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
