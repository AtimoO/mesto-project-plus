import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errUnauthorized } from '../errors/customError';
import { SessionRequest } from '../utils/types';

const { NODE_ENV = 'production', JWT_SECRET = 'secret-key' } = process.env;

const extractBearerToken = (token: string) => token.replace(/Bearer\s?/, '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw errUnauthorized('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw errUnauthorized('Необходима авторизация');
  }

  req.user = payload;

  next();
};
