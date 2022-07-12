import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles';
import App from './App';
import { PhaseProvider } from './context/phase-context';
import { TaskProvider } from './context/task-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// TODO: error handlings
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <PhaseProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </PhaseProvider>
  </React.StrictMode>,
);
