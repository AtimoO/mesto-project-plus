// import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: IUser;
  likes?: Array<IUser> | [];
  createdAt: Date;
}
