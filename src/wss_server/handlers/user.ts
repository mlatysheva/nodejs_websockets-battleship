import { users } from '../../data/InMemoryDB';
import { IUser, TUserRequest } from '../../models/IUser';

export const registerUser = (newUser: TUserRequest) => {
  const user: IUser = {
      ...newUser,
      index: Date.now(),
  };
  users.push(user);
  return user;
}