import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StreamDeckProvider } from './hooks/stream-deck';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.connectElgatoStreamDeckSocket = (inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) => {
  const registration = {
    port: inPort,
    uuid: inUUID,
    registerEvent: inRegisterEvent,
    info: JSON.parse(inInfo),
    actionInfo: JSON.parse(inActionInfo),
  };
  root.render(
    <StreamDeckProvider registration={registration}>
      <App />
    </StreamDeckProvider>,
  );
};
