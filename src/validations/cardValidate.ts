import { celebrate, Joi } from 'celebrate';
import { regCheckUrl } from '../utils/constants';

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(regCheckUrl)),
  }),
});

export default cardValidate;
