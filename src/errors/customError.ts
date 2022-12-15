import {
  BAD_REQUEST,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED_ERROR,
} from '../utils/constants';

export class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errBadRequest = (message: string) => new CustomError(message, BAD_REQUEST);
export const errUnauthorized = (message: string) => new CustomError(message, UNAUTHORIZED_ERROR);
export const errForbidden = (message: string) => new CustomError(message, FORBIDDEN_ERROR);
export const errNotFound = (message: string) => new CustomError(message, NOT_FOUND);
export const errConflict = (message: string) => new CustomError(message, CONFLICT_ERROR);
export const errIntServer = (message: string) => new CustomError(message, INTERNAL_SERVER_ERROR);
