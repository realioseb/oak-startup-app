import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles';
import App from './App';
import { PhaseProvider } from './context/phase-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <PhaseProvider>
      <App />
    </PhaseProvider>
  </React.StrictMode>,
);
