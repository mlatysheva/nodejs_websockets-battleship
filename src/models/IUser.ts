export interface IUser {
  name: string;
  password?: string;
  index: number;
}

export type TUserPayload = {
  name: string;
  password?: string;
}

export type TUserRequest= {
  type: "reg",
  data:
    {
      name: string,
      password: string,
    },
  id: 0,
};

export type TUserResponse = {
  type: 'reg';
  data: {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
  };
  id: 0;
};
