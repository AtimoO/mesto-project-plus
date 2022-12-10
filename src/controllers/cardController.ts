import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';
import Card from '../models/card';
import { SessionRequest } from '../utils/types';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

export const createCard = (req: SessionRequest, res: Response) => {
  const { name, link } = req.body;
  // временное решение для _id
  if (typeof req.user === 'object' && Object.keys(req.user).includes('_id')) {
    const { _id } = req.user;

    Card.create({ name, link, owner: _id })
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(400).send({ message: err.message }));
  }
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const setLikeCard = (req: SessionRequest, res: Response) => {
  const { cardId } = req.params;
  if (typeof req.user === 'object' && Object.keys(req.user).includes('_id')) {
    const { _id } = req.user;

    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(400).send({ message: err.message }));
  }
};

export const deleteLikeCard = (req: SessionRequest, res: Response) => {
  const { cardId } = req.params;
  if (typeof req.user === 'object' && Object.keys(req.user).includes('_id')) {
    const { _id } = req.user;

    Card.findByIdAndUpdate(cardId, { $pull: { likes: _id as ObjectId } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => res.send(card))
      .catch((err) => res.status(400).send({ message: err.message }));
  }
};
