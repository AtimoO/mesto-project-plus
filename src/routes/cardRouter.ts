import { Router } from 'express';
import { createCardValidate } from '../validations/cardValidate';
import {
  createCard,
  deleteCard,
  deleteLikeCard,
  getCards,
  setLikeCard,
} from '../controllers/cardController';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidate, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

export default router;
