import {WebSocket, WebSocketServer} from "ws";
import {sd} from "./index";
import ncp from "copy-paste";

const wss = new WebSocketServer({port: 9119, host: 'localhost'});

export const sendToDIM = (action: string, args: Record<string, any> = {}) => {
    const msg = JSON.stringify({action, args});
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

wss.on('error', () => {
    sd.logMessage("There is another instance of this plugin running");
    process.exit();
});

export const init = () => {
    wss.on('connection', (ws: WebSocket) => {
        sd.setPluginSettings({connected: true});
        ws.on('message', (data: string) => {
            const parsed = JSON.parse(data);
            const share = parsed['shareUrl'];
            if (share) {
                ncp.copy(share);
            } else {
                sd.setPluginSettings(parsed);
            }
        });
        ws.on('close', () => {
            sd.setPluginSettings({connected: false});
        });
    });
}

