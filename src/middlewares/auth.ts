import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '639475ce27166bed4e98868d',
  };

  next();
};
