import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
// import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
  
    <AuthProvider>
      <App /> 
    </AuthProvider>

  
  </React.StrictMode>
 
);
