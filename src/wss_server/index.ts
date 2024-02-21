import WebSocket, { WebSocketServer } from "ws";
import { COMMAND } from '../constants/commands';

export const startWsServer = (): void => {
  const WSS_PORT = process.env.WSS_PORT || 3000;

  const wsServer = new WebSocketServer({ port: Number(WSS_PORT), clientTracking: true }, () => {
    console.log(`Web Socket server is running on ${WSS_PORT} port`);
  });

  wsServer.on('connection', (ws: WebSocket, req) => {
    
    ws.on('message', (message: string) => {
      const request = JSON.parse(message);
      const command = request.type;
      const payload = JSON.parse(request.data);

      switch (command) {
        case COMMAND.reg: {
          const response = {
            name: payload.name,
            index: Date.now(),
            error: false,
            errorText: '',
          };
          ws.send(            
            JSON.stringify({
              type: COMMAND.reg,
              data: JSON.stringify(response),
              id: 0,
            }),     
          )          
          console.log(response);
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
