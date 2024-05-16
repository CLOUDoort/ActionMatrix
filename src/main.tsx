import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { CreateSubtaskContextProvider } from './features/create/CreateSubtaskContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CreateSubtaskContextProvider>
      <App />
    </CreateSubtaskContextProvider>
    <ToastContainer />
  </React.StrictMode>,
);
