import { COMMAND } from '../../constants/commands';
import InMemoryDB from '../../data/InMemoryDB';

export const createGame = (playerId: number, roomId: number): string => {
  const game = InMemoryDB.createGame(playerId, roomId);
  console.log(`Game was started in room: `, roomId);

  return JSON.stringify({
    type: COMMAND.createGame,
    data: JSON.stringify({
      idGame: game.idGame,
      idPlayer: game.idPlayer,
    }),
    id: 0,
  });
}