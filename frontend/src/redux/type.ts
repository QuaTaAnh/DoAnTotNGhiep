import { IUser } from "../type";

export interface IAuthState {
  user: IUser | null;
  access_token: string;
}
