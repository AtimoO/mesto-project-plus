import { Router } from 'express';
import { updateAvatarProfile, updateProfileValidate } from '../validations/userValidate';
import {
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateProfileValidate, updateProfile);
router.patch('/me/avatar', updateAvatarProfile, updateAvatar);

export default router;
