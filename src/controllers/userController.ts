import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

export const getUser = (req: Request, res: Response) => {
  User.findOne({ _id: req.params.userId })
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

export const updateProfile = () => {};

export const updateAvatar = () => {};
