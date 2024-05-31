import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import { CreateSubtaskContextProvider } from './features/create/CreateSubtaskContext.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './services/queryClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CreateSubtaskContextProvider>
        <App />
      </CreateSubtaskContextProvider>
      <ReactQueryDevtools />
      <Analytics />
      <SpeedInsights />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
