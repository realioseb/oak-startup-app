import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles';
import App from './App';
import { AppProvider } from './context/app-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
