export interface IUserToken {
  token?: string;
}

export interface ILoginData {
    email: string;
    password?: string;
}


interface IAddress {
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  referencePoint?: string;
}

export interface IUser {
  _id?: string;
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  address?: IAddress;
  observations?: string;
  password?: string;
  type?: string;
  image?: string | File;
  deliveryDay?: string;
  frequency?: string;
  status?: string;
  token?: string;
  [key: string]: any;
}