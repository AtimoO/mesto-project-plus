import { Router } from 'express';
import {
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
