import { ICategory, IPost, IUser, LocationAddress, TypeDefault } from "../type";

export interface IAuthState {
  user: IUser | null;
  access_token: string;
  allUsers: IUser[];
  totalPages: number;
  locationUser: LocationAddress | null
}

export interface IParamPost {
  page?: number;
  priceId?: number;
  areaId?: number;
  address?: string;
  categoryId?: number;
  status?: string;
}

export interface ICommentState {
  page?: number;
  postId?: number;
}

export interface IAPIState {
  posts: IPost[];
  totalPages: number;
  page: number;
  categories: ICategory[];
  prices: TypeDefault[];
  acreages: TypeDefault[];
}
