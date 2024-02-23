import { COMMAND } from '../../constants/commands';
import InMemoryDB from '../../data/InMemoryDB';
import { IBsWebsocket } from '../../models/IBsWebsocket';

export const createRoom = (ws: IBsWebsocket): string => {

  const room = InMemoryDB.createRoom(ws);
  console.log('New room added:', room);

  return JSON.stringify({
    type: COMMAND.createRoom,
    data: JSON.stringify({
      roomId: room.roomId,
      roomUsers: room.roomUsers,
    }),
    id: 0,
  });
}
