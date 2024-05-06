export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  phone?: string;
  zalo?: string;
  avatar?: string;
}

export interface UpdateProfileForm extends IUser {
  newPassword: string;
  oldPassword: string;
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
  id?: number;
  code?: string;
  value?: string;
  header: string;
  subheader?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  id?: number;
  user?: IUser;
  title?: string;
  attributes?: IAttribute;
  description?: string;
  address?: string;
  star?: string;
  images?: any;
  createdAt?: string;
}

export interface CreatePostForm {
  title: string;
  address: string;
  shortDescription: string;
  detail: string;
  categoryId: number;
  priceId: number;
  areaId: number;
  priceNumber: number;
  areaNumber: number;
  images: string[];
  target: string;
  status: string;
}

export interface TypeDefault {
  code: string;
  value: string;
}

export interface Province {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface District {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}

export interface Ward {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}
