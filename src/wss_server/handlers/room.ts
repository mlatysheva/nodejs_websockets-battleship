import { COMMAND } from '../../constants/commands';
import InMemoryDB from '../../data/InMemoryDB';
import { IBsWebsocket } from '../../models/IBsWebsocket';

export const createRoom = (ws: IBsWebsocket): string => {

  const room = InMemoryDB.createRoom(ws);
  console.log('New room added:', room);

  return JSON.stringify({
    type: COMMAND.updateRoom,
    data: JSON.stringify({
      roomId: room.roomId,
      roomUsers: room.roomUsers,
    }),
    id: 0,
  });
}

export const addUserToRoom = (ws: IBsWebsocket, roomId: number): string => {
  const room = InMemoryDB.addUserToRoom(ws, roomId);
  console.log(`User ${ws.name} added to room: `, roomId);

  return JSON.stringify({
    type: COMMAND.updateRoom,
    data: JSON.stringify({
      roomId: room.roomId,
      roomUsers: room.roomUsers,
    }),
    id: 0,
  });
}

export const updateRoom = (): string => {
  const rooms = InMemoryDB.getRooms();
  console.log('Rooms updated:', rooms);

  return JSON.stringify({
    type: COMMAND.updateRoom,
    data: JSON.stringify(rooms),
    id: 0,
  });
}
