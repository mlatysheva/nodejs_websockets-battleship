import WebSocket, { createWebSocketStream } from "ws";

function handleConnection(ws: WebSocket): void {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  
  duplex.on('data', async (data: Buffer) => {
    try {
      const [ command, ...args ] = data.toString().split(' ');
      console.log(`Received: ${data.toString()}`);
    } catch (err) {
      console.error(err);
    }
  });
  ws.on('close', () => { 
    duplex.destroy();
    console.log(`WebSocket closed`);
  });
};

export { handleConnection };
