import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { cwd } from 'process';
import { resolve } from 'path';
import { handleConnection } from './src/wss_server/handleConnection';

dotenv.config({ path: resolve(cwd(), '.env') });

const HTTP_PORT = process.env.HTTP_PORT || 8181;
const WSS_PORT = process.env.WSS_PORT || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT); 

const wss = new WebSocketServer({ port: Number(WSS_PORT)});

console.log(`Websocket server is running on ${WSS_PORT} port.`);

wss.on('connection', handleConnection);

process.on("SIGNINT", () => {
  console.log("WebSocketServer closed");
  wss.close();
  process.exit(0);
});

