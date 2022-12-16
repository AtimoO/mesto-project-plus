import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model, Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, pass: string) => Promise<Document<unknown, any, IUser>>;
}

export interface ICard {
  name: string;
  link: string;
  owner: IUser;
  likes: Array<IUser> | [];
  createdAt: Date;
}

export interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface SessionRequestAuth extends Request {
  user?: {
    _id: string;
  };
}
