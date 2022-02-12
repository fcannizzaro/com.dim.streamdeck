import {WebSocket, WebSocketServer} from "ws";
import {sd} from "./index";

const wss = new WebSocketServer({port: 9119});

export const callExtension = (action: string, args: Record<string, any> = {}) => {
    const msg = JSON.stringify({action, args});
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: string) => {
        data = JSON.parse(data);
        const settings = Object.assign(sd.pluginSettings || {}, data);
        sd.setPluginSettings(settings);
    });
});
