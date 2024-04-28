import { IUser } from "../type";

export interface IAuthState {
  user: IUser | null;
  access_token: string;
}

export interface IParamPost {
  page?: number;
  priceCode?: string;
  areaCode?: string;
  categoryCode?: string;
}
