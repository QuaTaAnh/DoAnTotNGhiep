import { IUser } from "../type";

export interface IAuthState {
  user: IUser | null;
  access_token: string;
  allUsers: IUser[];
  totalPages: number;
}

export interface IParamPost {
  page?: number;
  priceId?: number;
  areaId?: number;
  categoryId?: number;
}

export interface ICommentState {
  page?: number;
  postId?: number;
}
