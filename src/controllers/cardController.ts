import { NextFunction, Response } from 'express';
import { errBadRequest, errForbidden, errNotFound } from '../errors/customError';
import Card from '../models/card';
import { SessionRequestAuth } from '../utils/types';

const { Types } = require('mongoose');

export const getCards = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      if (!cards) throw errNotFound('Карточки не найдены');
      res.send(cards);
    })
    .catch(next);
};

export const createCard = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const idUser = req.user?._id;

  Card.create({ name, link, owner: idUser })
    .then((card) => res.send(card))
    .catch((err: Error) => {
      const error =
        err.name === 'ValidationError' ? errBadRequest('Некорректно введены данные') : err;
      next(error);
    });
};

export const deleteCard = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const idUser = req.user?._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) throw errNotFound('Запрашиваемая карточка не найдена');
      if (card.owner.toString() === idUser) {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      } else {
        throw errForbidden('Нельзя удалить чужую карточку');
      }
    })
    .catch(next);
};

export const setLikeCard = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const idUser = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: idUser } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) throw errNotFound('Запрашиваемая карточка не найдена');
      res.send(card);
    })
    .catch(next);
};

export const deleteLikeCard = (req: SessionRequestAuth, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = Types.ObjectId(req.user?._id);

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
