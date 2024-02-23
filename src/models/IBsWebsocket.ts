import { WebSocket } from 'ws';

export interface IBsWebsocket extends WebSocket {
  index: number;
  name: string;
}
