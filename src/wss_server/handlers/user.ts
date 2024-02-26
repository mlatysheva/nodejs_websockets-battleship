import { COMMAND } from '../../constants/commands';
import { CONSOLE_COLORS } from '../../constants/consoleColors';
import InMemoryDB from '../../data/InMemoryDB';
import { IBsWebsocket } from '../../models/IBsWebsocket';

export const createUser = (name: string, ws: IBsWebsocket): string => {

  const userExists = InMemoryDB.userExists(name);
  if (userExists) {
    console.log(CONSOLE_COLORS.red, `User ${name} already exists`);
  }

  const newUser = InMemoryDB.createUser({name});
  ws.index = newUser.index;
  ws.name = newUser.name;

  console.log('New user added: ', newUser);

  return JSON.stringify({
    type: COMMAND.reg,
    data: JSON.stringify({
      name: newUser.name,
      index: newUser.index,
      error: userExists,
      errorText: userExists ? 'User already exists' : '',
    }),
    id: 0,
  });
};
