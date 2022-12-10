import { Router } from 'express';
import userRouter from './userRouter';
import cardRouter from './cardRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
