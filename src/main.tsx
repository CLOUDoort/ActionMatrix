import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import { CreateSubtaskContextProvider } from './features/create/CreateSubtaskContext.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CreateSubtaskContextProvider>
      <App />
    </CreateSubtaskContextProvider>
    <Analytics />
    <SpeedInsights />
    <ToastContainer />
  </React.StrictMode>,
);
