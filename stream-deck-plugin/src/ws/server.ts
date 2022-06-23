import { WebSocket, WebSocketServer } from 'ws';
import { sd } from '../index';
import { DimAction, ExtWebSocket, MessageHandlers } from '../interfaces';
import { createServer } from 'https';
import {
  authorizationChallengeHandler,
  authorizationResetHandler,
  shareUrlHandler,
  updateHandler,
} from './msg-handlers';
import { certs } from '../security/certs';
import { tokenOf } from '../security/authorization';

export const clients: Record<string, WebSocket> = {};
const server = createServer(certs);
const wss = new WebSocketServer({ server });

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
  wss.clients.forEach((client) => sendToDIM(action, args, client));
};

wss.on('error', () => {
  sd.logMessage('There is another instance of this plugin running');
  process.exit();
});

const handlers: MessageHandlers = {
  'authorization:challenges': authorizationChallengeHandler,
  'authorization:reset': authorizationResetHandler,
  'dim:share-url': shareUrlHandler,
  'dim:update': updateHandler,
};

export const init = () => {
  wss.on('connection', (ws: ExtWebSocket) => {
    // disallow any not identified connection
    if (!ws.protocol) {
      return ws.close();
    }

    // keep track of WebSocket
    clients[ws.protocol] = ws;

    // retrieve the identifier's challenge
    if (!(ws.token = tokenOf(ws.protocol))) {
      sendToDIM('authorization:init', undefined, ws, true);
    }

    // on any client connect set plugin connected
    sd.setPluginSettings({ connected: true });

    // check if data is an authentication flow or not
    ws.on('message', (msg: string) => {
      const { action, data } = JSON.parse(msg);

      // update token
      ws.token = tokenOf(ws.protocol);

      if (!ws.token && !action.startsWith('authorization')) {
        return sd.logMessage('missing-token from ' + ws.protocol);
      }

      handlers[action]?.({
        data,
        ws,
        identifier: ws.protocol,
        token: ws.token,
      });
    });

    // on connection close update plugin status
    ws.on('close', () => {
      sd.setPluginSettings({ connected: false });
    });
  });
};

server.listen(9119, 'localhost');
