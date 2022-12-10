import { Router } from 'express';
import userValidate from '../validations/userValidate';
import {
  createUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', userValidate, createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
