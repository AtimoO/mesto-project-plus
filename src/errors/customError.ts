import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../utils/constants';

export class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errBadRequest = (message: string) => new CustomError(message, BAD_REQUEST);
export const errNotFound = (message: string) => new CustomError(message, NOT_FOUND);
export const errIntServer = (message: string) => new CustomError(message, INTERNAL_SERVER_ERROR);
