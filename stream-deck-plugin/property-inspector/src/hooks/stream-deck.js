import React, { useContext, useEffect, useState } from 'react';

let ws;

const StreamDeckContext = React.createContext(undefined);

const send = (event, data) => {
  ws.send(
    JSON.stringify({
      event,
      ...data,
    }),
  );
};

export const StreamDeckProvider = ({ children, registration }) => {
  const [state, setState] = useState(undefined);
  const [settings, setSettings] = useState({});
  const [globalSettings, setGlobalSettings] = useState(null);
  const [messageFromPlugin, setMessageFromPlugin] = useState({});

  useEffect(() => {
    ws = new WebSocket('ws://localhost:' + registration.port);

    ws.onopen = () => {
      send(registration.registerEvent, { uuid: registration.uuid });
      send('getSettings', { context: registration.uuid });
      send('getGlobalSettings', { context: registration.uuid });
      setState({
        uuid: registration.uuid,
        info: registration.info,
        action: registration.actionInfo.action,
        context: registration.actionInfo.context,
        device: registration.actionInfo.device,
        coordinates: registration.actionInfo.payload.coordinates,
      });
      setSettings(registration.actionInfo.payload.settings);
    };

    ws.onmessage = ({ data }) => {
      const { event, payload } = JSON.parse(data);
      if (event === 'sendToPropertyInspector') {
        setMessageFromPlugin(payload);
      } else if (event === 'didReceiveSettings') {
        setSettings(payload.settings);
      } else if (event === 'didReceiveGlobalSettings') {
        setGlobalSettings(payload.settings);
      }
    };
  }, [registration]);

  const providerValue = {
    ...state,
    settings,
    globalSettings,
    setSettings,
    setGlobalSettings,
    messageFromPlugin,
    setMessageFromPlugin,
  };

  return <StreamDeckContext.Provider value={providerValue}>{children}</StreamDeckContext.Provider>;
};

export const useStreamDeck = () => useContext(StreamDeckContext);

export const useSendToPlugin = () => {
  const sd = useStreamDeck();
  return (payload) =>
    send('sendToPlugin', {
      action: sd?.action,
      context: sd?.uuid,
      payload: payload,
    });
};

export const useSettings = () => {
  const sd = useStreamDeck();
  const setSettings = (payload) => {
    const newSettings = {
      ...sd.settings,
      ...payload,
    };
    send('setSettings', {
      action: sd?.action,
      context: sd?.uuid,
      payload: newSettings,
    });
    sd.setSettings(newSettings);
  };
  return [sd?.settings || {}, setSettings];
};

export const useGlobalSettings = () => {
  const sd = useStreamDeck();
  const setGlobalSettings = (payload) => {
    const newSettings = {
      ...sd.globalSettings,
      ...payload,
    };
    send('setGlobalSettings', {
      action: sd?.action,
      context: sd?.uuid,
      payload: {
        ...sd.globalSettings,
        ...payload,
      },
    });
    sd.setGlobalSettings(newSettings);
  };
  return [sd?.globalSettings, setGlobalSettings];
};
