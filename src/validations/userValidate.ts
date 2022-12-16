import { celebrate, Joi } from 'celebrate';
import { regCheckUrl } from '../utils/constants';

export const createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(new RegExp(regCheckUrl)),
  }),
});

export const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const updateProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const updateAvatarProfile = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(regCheckUrl)),
  }),
});
