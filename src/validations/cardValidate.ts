import { celebrate, Joi } from 'celebrate';
import { regCheckUrl } from '../utils/constants';

export const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    link: Joi.string().required().pattern(new RegExp(regCheckUrl)),
  }),
});

export default createCardValidate;
