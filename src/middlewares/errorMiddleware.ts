import { NextFunction, Request, Response } from 'express';
import { errIntServer, CustomError } from '../errors/customError';

const handleError = (
  err: TypeError | CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = errIntServer('На сервере произошла ошибка');
  }

  res.status((customError as CustomError).status).send({ message: customError.message });
  return next();
};

export default handleError;
