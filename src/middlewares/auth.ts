import { NextFunction, Response } from 'express';
import { SessionRequest } from '../utils/types';

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '639475ce27166bed4e98868d',
  };

  next();
};
