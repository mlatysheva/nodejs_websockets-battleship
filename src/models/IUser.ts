export interface IUser {
  name: string;
  password?: string;
  index?: number;
}

export type TUserRequest = {
  name: string;
  password: string;
};

export type TUserResponse = {
  name: string;
  index: number;
};