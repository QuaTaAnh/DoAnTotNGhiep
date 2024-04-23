export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  phone?: string;
  zalo?: string;
  avatar?: string;
}

export interface IUserProps {
  user: IUser;
  token: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IImage {
  image: string;
}

export interface IAttribute {
  acreage?: string;
  hashtag?: string;
  price?: string;
  published?: string;
}

export interface ICategory {
  id?: string | number;
  code?: string;
  value?: string;
  header: string;
  subheader?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  id?: string;
  user?: IUser;
  title?: string;
  attributes?: IAttribute;
  description?: string;
  address?: string;
  star?: string;
  images?: any;
  createdAt?: string;
}
