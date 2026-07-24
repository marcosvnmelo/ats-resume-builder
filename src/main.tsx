import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <TanStackDevtools
      config={{ hideUntilHover: true, position: 'top-right' }}
      eventBusConfig={{ connectToServerBus: true }}
      plugins={[formDevtoolsPlugin()]}
    />
  </StrictMode>,
);
