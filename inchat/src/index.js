import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ToastContainer>
      <React.StrictMode>
      
      <App />
      {/* <ToastContainer /> */}
    </React.StrictMode>
  // {/* </ToastContainer> */}
);
