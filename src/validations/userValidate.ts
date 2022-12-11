import { celebrate, Joi } from 'celebrate';

export const createUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri(),
  }),
});

export default createUserValidate;
