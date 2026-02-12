import type { IUser } from "../../interfaces/User";

export interface PropertyMap {
  prop: keyof IUser;
  name: string;
}