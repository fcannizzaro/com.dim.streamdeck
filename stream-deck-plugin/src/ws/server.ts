import { WebSocket, WebSocketServer } from 'ws';
import { sd } from '../index';
import { DimAction, ExtWebSocket, MessageHandlers } from '../interfaces';
import {
  authorizationChallengeHandler,
  authorizationResetHandler,
  itemsInfoHandler,
  updateHandler,
} from './msg-handlers';
import { tokenOf } from './authorization';

export const clients: Record<string, WebSocket> = {};

const server = new WebSocketServer({
  port: 9119,
  host: 'localhost',
});

export const sendToDIM = (
  action: DimAction,
  args?: Record<string, any>,
  ws?: WebSocket,
  noAuth = false,
) => {
  if (ws) {
    const token = tokenOf(ws.protocol);
    if ((noAuth || token) && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          token,
          action,
          ...(args || {}),
        }),
      );
    }
    return;
  }
  server.clients.forEach((client) => sendToDIM(action, args, client));
};

server.on('error', () => {
  sd.logMessage('There is another instance of this plugin running');
  process.exit();
});

const handlers: MessageHandlers = {
  'authorization:challenges': authorizationChallengeHandler,
  'authorization:reset': authorizationResetHandler,
  'items:info': itemsInfoHandler,
  'dim:update': updateHandler,
};

export const init = () => {
  server.on('connection', (ws: ExtWebSocket) => {
    // disallow any not identified connection
    if (!ws.protocol) {
      return ws.close();
    }

    // keep track of WebSocket
    clients[ws.protocol] = ws;

    ws.token = tokenOf(ws.protocol);

    // retrieve the identifier's challenge
    if (!ws.token) {
      sendToDIM('authorization:init', undefined, ws, true);
    } else {
      sd.setPluginSettings({ connected: true });
    }

    // check if data is an authentication flow or not
    ws.on('message', (msg: string) => {
      const { action, data } = JSON.parse(msg);

      // update token
      ws.token = tokenOf(ws.protocol);

      if (!ws.token && !action.startsWith('authorization')) {
        return sd.logMessage('missing-token from ' + ws.protocol);
      }

      // execute handler
      handlers[action]?.({ data, ws, identifier: ws.protocol, token: ws.token });
    });

    // on connection close update plugin status
    ws.on('close', () => {
      sd.setPluginSettings({ connected: false });
    });
  });
};
