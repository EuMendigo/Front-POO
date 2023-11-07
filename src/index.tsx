import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import AuthProvider from './contexts/AuthContexts';
import EdicaoModeProvider from './contexts/EdicaoContexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EdicaoModeProvider>
        <BrowserRouter>
          <PublicRoutes />
        </BrowserRouter>
      </EdicaoModeProvider>
    </AuthProvider>
  </React.StrictMode>
);
