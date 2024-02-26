import { COMMAND } from '../../constants/commands';
import InMemoryDB from '../../data/InMemoryDB';
import { IWinner } from '../../models/IWinner';

export const updateWinners = (data: IWinner[]) => {
  const winners = InMemoryDB.updateWinners(data);
  return JSON.stringify({
    type: COMMAND.updateWinners,
    data: JSON.stringify(winners),
    id: 0,
  });
};