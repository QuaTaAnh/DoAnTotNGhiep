import { IUser } from "../type";

export interface IAuthState {
  user: IUser | null;
  access_token: string;
}

export interface IParamPost {
  page?: number;
  priceId?: number;
  areaId?: number;
  categoryId?: number;
}
