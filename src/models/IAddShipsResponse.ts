import { IShip } from './IShip';

export interface IAddShipsResponse {
  type: 'add_ships';
  data: {
    gameId: number;
    ships: IShip[];
    indexPlayer: number;
  };
  id: number;
}
