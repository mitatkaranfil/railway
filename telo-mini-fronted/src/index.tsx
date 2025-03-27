import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MiningProvider } from './contexts/MiningContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MiningProvider>
      <App />
    </MiningProvider>
  </React.StrictMode>
);
