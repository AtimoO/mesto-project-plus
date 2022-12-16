import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { errBadRequest, errConflict, errNotFound } from '../errors/customError';
import { SessionRequestAuth } from '../utils/types';

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

      // res.cookie('jwt', token, {
      //   maxAge: 3600 * 24 * 7,
      //   httpOnly: true,
      //   sameSite: true,
      // }).end();
      res.send({ token });
    })
    .catch(next);
};

export const getUsers = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      if (!users) throw errNotFound('Пользователи не найдены');
      res.send(users);
    })
    .catch(next);
};

export const getUser = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) throw errNotFound('Запрашиваемый пользователь не найден');
      res.send(user);
    })
    .catch(next);
};

export const updateProfile = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const idUser = req.user?._id;

  User.findByIdAndUpdate(idUser, { name, about }, { new: true })
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

export const updateAvatar = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const idUser = req.user?._id;

  User.findByIdAndUpdate(idUser, { avatar }, { new: true })
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
