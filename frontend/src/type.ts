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
