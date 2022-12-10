import { Router } from 'express';
import {
  createCard,
  deleteCard,
  deleteLikeCard,
  getCards,
  setLikeCard,
} from '../controllers/cardController';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

export default router;
