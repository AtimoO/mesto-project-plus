import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { errBadRequest, errConflict, errNotFound } from '../errors/customError';

const { NODE_ENV = 'production', JWT_SECRET = 'secret-key', SALT = 5 } = process.env;

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const dataBody = req.body;

  return bcrypt
    .hash(dataBody.password, SALT)
    .then((hash) => User.create({
      ...dataBody,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      let error;
      if (err.name === 'MongoServerError' && err.code === 11000) {
        error = errConflict('Такой пользователь уже зарегистрирован!');
      } else if (err.name === 'ValidationError') {
        error = errBadRequest('Некорректно введены данные');
      } else {
        error = err;
      }
      next(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}, {
    email: 1, name: 1, about: 1, avatar: 1,
  })
    .then((users) => {
      if (!users) throw errNotFound('Пользователи не найдены');
      res.send(users);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ _id: req.params.userId }, {
    email: 1, name: 1, about: 1, avatar: 1,
  })
    .then((user) => {
      if (!user) throw errNotFound('Запрашиваемый пользователь не найден');
      res.send(user);
    })
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .then((user) => {
      if (!user) throw errNotFound('Запрашиваемый пользователь не найден');
      res.send(user);
    })
    .catch((err: Error) => {
      const error =
        err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) => {
      if (!user) throw errNotFound('Запрашиваемый пользователь не найден');
      res.send(user);
    })
    .catch((err: Error) => {
      const error =
        err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};
