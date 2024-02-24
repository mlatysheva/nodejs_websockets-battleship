import { IBsWebsocket } from '../models/IBsWebsocket';
import { IRoom } from '../models/IRoom';
import { IUser, TUserPayload } from '../models/IUser';
import { IWinner } from '../models/IWinner';

class InMemoryDB {
  public users: IUser[];
  public rooms: IRoom[];
  public winners: IWinner[];

  constructor() {
    this.users = [];
    this.rooms = [];
    this.winners = [];
  }

  userExists = (name: string) => {
    return this.users.some((user) => user.name === name);
  }

  createUser = (user: TUserPayload) => {
    const newUser: IUser = {
      ...user,
      index: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  };

  createRoom = (ws: IBsWebsocket) => {
    const room: IRoom = {
      roomId: Date.now(),
      roomUsers: [{index: ws.index, name: ws.name}],
    };
    this.rooms.push(room);
    return room;
  };

  updateWinners = (data: IWinner[]) => {
    this.winners = data;
    return this.winners;
  }

  addUserToRoom = (ws: IBsWebsocket, roomId: number) => {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId);
    this.rooms[roomIndex].roomUsers.push({index: ws.index, name: ws.name});
    return this.rooms[roomIndex];
  }

  getRooms = () => {
    return this.rooms;
  }
}

export default new InMemoryDB();
