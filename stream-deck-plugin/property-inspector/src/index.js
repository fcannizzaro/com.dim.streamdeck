import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StreamDeckProvider } from './hooks/stream-deck';

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = (registration = null) => {
  root.render(
    registration ? (
      <StreamDeckProvider registration={registration}>
        <App />
      </StreamDeckProvider>
    ) : (
      <App isSetup />
    ),
  );
};

if (window.location.href.includes('?setup')) {
  render();
} else {
  window.connectElgatoStreamDeckSocket = (
    inPort,
    inUUID,
    inRegisterEvent,
    inInfo,
    inActionInfo,
  ) => {
    const registration = {
      port: inPort,
      uuid: inUUID,
      registerEvent: inRegisterEvent,
      info: JSON.parse(inInfo),
      actionInfo: JSON.parse(inActionInfo),
    };
    render(registration);
  };
}
