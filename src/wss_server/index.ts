import { WebSocketServer } from "ws";
import { COMMAND } from '../constants/commands';
import { createUser } from './handlers/user';
import { createRoom, updateRoom } from './handlers/room';
import { IBsWebsocket } from '../models/IBsWebsocket';
import { updateWinners } from './handlers/winners';

export const startWsServer = (): void => {
  const WSS_PORT = process.env.WSS_PORT || 3000;

  const wsServer = new WebSocketServer({ port: Number(WSS_PORT), clientTracking: true }, () => {
    console.log(`Web Socket server is running on ${WSS_PORT} port`);
  });

  wsServer.on('connection', (ws: IBsWebsocket, req) => {
    
    ws.on('message', (message: string) => {
      const request = JSON.parse(message);
      const command = request.type;
      console.log('request', request);

      switch (command) {
        case COMMAND.reg: {
          const payload = JSON.parse(request.data);
          const user = createUser(payload.name, ws);
          ws.send(user);
          break;
        };
        case COMMAND.createRoom: {
          createRoom(ws);
          wsServer.clients.forEach((client) => {
            client.send(updateRoom());
          });
          const winners = updateWinners([]);
          ws.send(winners);
          break;
        }
      }
    });

    ws.on('close', () => {
      ws.close();
    });
  });

  wsServer.on('error', (err) => {
    console.error('WebSocketServer error', err);
  });
  
  wsServer.on('close', () => {
    wsServer.clients.forEach((client) => {
      client.send('WebSocketServer is closed');
      client.close();
    });
  });  

  process.on("SIGNINT", () => {
    console.log("WebSocketServer is closed");
    wsServer.close();
    process.exit(0);
  });
};
