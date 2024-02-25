import { IBsWebsocket } from '../models/IBsWebsocket';
import { IGame } from '../models/IGame';
import { IRoom } from '../models/IRoom';
import { IUser, TUserPayload } from '../models/IUser';
import { IWinner } from '../models/IWinner';

class InMemoryDB {
  public users: IUser[];
  public rooms: IRoom[];
  public winners: IWinner[];
  public game: IGame;

  constructor() {
    this.users = [];
    this.rooms = [];
    this.winners = [];
    this.game = {idGame: 0, idPlayer: 0};
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
    const room = this.rooms[roomIndex];
    if (room) {
      room.roomUsers.push({index: ws.index, name: ws.name});
      this.removeRoom(roomId);
      this.game.idPlayer = ws.index;
      return room;
    }    
  }

  getRoomById = (roomId: number) => {
    const room = this.rooms.find((room) => room.roomId === roomId);
    return room;
  }

  removeRoom = (roomId: number) => {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId);
    this.rooms.splice(roomIndex, 1);
  }

  createGame = (roomId: number, playerId: number) => { 
    this.game.idGame = roomId;
    this.game.idPlayer = playerId;
    return this.game;
  }

  getRooms = () => {
    return this.rooms;
  }
}

export default new InMemoryDB();
