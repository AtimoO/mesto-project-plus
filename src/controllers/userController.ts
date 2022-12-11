import { NextFunction, Request, Response } from 'express';
import { errBadRequest, errNotFound } from '../errors/customError';
import User from '../models/user';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err: Error) => {
      const error = err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw errNotFound('Пользователи не найдены');
      }
      res.send(users);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw errNotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw errNotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err: Error) => {
      const error = err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw errNotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err: Error) => {
      const error = err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};
