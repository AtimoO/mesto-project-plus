import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { errBadRequest, errNotFound } from '../errors/customError';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      if (!cards) {
        throw errNotFound('Карточки не найдены');
      }
      res.send(cards);
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err: Error) => {
      const error = err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw errNotFound('Запрашиваемая карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

export const setLikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw errNotFound('Запрашиваемая карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

export const deleteLikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const id = req.user._id as ObjectId;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw errNotFound('Запрашиваемая карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};
