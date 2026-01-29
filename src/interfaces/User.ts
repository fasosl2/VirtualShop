
export interface IUser {
  id: string;
  _id: string;
  email?: string;
  password?: string; // Password should be optional
  token: string;
  [key: string]: any;
}

export interface IUserToken {
  token?: string;
}

export interface ILoginData {
    email: string;
    password?: string;
}