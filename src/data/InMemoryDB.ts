import { IBsWebsocket } from '../models/IBsWebsocket';
import { IRoom } from '../models/IRoom';
import { IUser, TUserPayload } from '../models/IUser';

class InMemoryDB {
  public users: IUser[];
  public rooms: IRoom[];

  constructor() {
    this.users = [];
    this.rooms = [];
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
}

export default new InMemoryDB();
