import { sd } from '../index';
import { ExtWebSocket } from '../interfaces';
import { decrypt, DIM_RESET, DIM_SECURE, DIM_VERIFICATION, randomToken } from './encryption';
import WebSocket from 'ws';
import { switchFirstDeviceProfile } from '../util';
import { join } from 'path';
import { IMAGE_PATH } from '../constant';

export const sharedKeyById = (id: string) => {
  return sd.pluginSettings.authorization?.find((it) => it.identifier === id)?.sharedKey;
};

const saveSharedKey = (identifier: string, sharedKey: string) => {
  if (!sd.pluginSettings.authorization) {
    sd.pluginSettings.authorization = [];
  }
  sd.pluginSettings.authorization.push({
    identifier,
    sharedKey,
  });
  return sd.pluginSettings.authorization;
};

const removeSharedKeyById = (identifier: string) => {
  const authorization = (sd.pluginSettings.authorization ?? []).filter(
    (it) => it.identifier !== identifier,
  );
  sd.setPluginSettings({ authorization });
};

/*
export const resetAuthorizationTokens = () => {
  sd.setPluginSettings({ authorization: [] });
};
*/

export const checkAuthorizationFlow = (
  data: string,
  ws: ExtWebSocket,
): Record<string, any> | undefined => {
  // reset shared key by identifier
  if (data.startsWith(DIM_RESET)) {
    const identifier = data.slice(DIM_RESET.length);
    removeSharedKeyById(identifier);
    return;
  }
  // if challenged is confirmed store the sharedKey with the identifier
  if (data.startsWith(DIM_VERIFICATION)) {
    const sharedKey = data.slice(DIM_VERIFICATION.length);
    ws.sharedKey = sharedKey;
    sd.setPluginSettings({
      challenge: undefined,
      authorization: saveSharedKey(ws.protocol, sharedKey),
    });

    switchFirstDeviceProfile();
    return;
  }

  // if no shared key found stop authorization flow
  if (!ws.sharedKey) {
    return;
  }

  // if shared key exist decrypt the message
  if (data.startsWith(DIM_SECURE)) {
    return JSON.parse(decrypt(data, ws.sharedKey));
  }

  return;
};

export const initChallenge = (ws: WebSocket) => {
  // send challenge to be confirmed
  const challenge = Math.round(Math.random() * 899) + 100;
  // store temporary challenge
  sd.setPluginSettings({ challenge });
  // send challenge and sharedKey
  ws.send(`${DIM_VERIFICATION + challenge}:${randomToken()}`);

  const type: number = switchFirstDeviceProfile('DIM-Enhanced');
  const positionByType = [7, 1, 11, 7][type];

  setTimeout(() => {
    const tiles = sd.allContexts()['com.dim.streamdeck.page'];
    sd.setImage(tiles[positionByType], join(IMAGE_PATH, './authorization.png'));
    sd.setTitle(tiles[positionByType], challenge.toString());
  }, 250);
};
