import { celebrate, Joi } from 'celebrate';
import { regCheckUrl } from '../utils/constants';

export const createUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().pattern(new RegExp(regCheckUrl)),
  }),
});

export default createUserValidate;
