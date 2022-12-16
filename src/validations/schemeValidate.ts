import validator from 'validator';

export const validationUser = {
  email: {
    validator: (v: string) => validator.isEmail(v),
    message: 'Невереный формат почты',
  },
  name: {
    validator: (v: string) => validator.isLength(v, { min: 2, max: 30 }),
    message: 'Имя должно быть минимум 2 символа, но не более 30',
  },
  about: {
    validator: (v: string) => validator.isLength(v, { min: 2, max: 200 }),
    message: 'Раздел о себе, должен содержать минимум 2 символа, но не более 200',
  },
  avatar: {
    validator: (v: string) => validator.isURL(v),
    message: 'Неверный формат ссылки',
  },
};

export const validationCard = {
  name: {
    validator: (v: string) => validator.isLength(v, { min: 2, max: 30 }),
    message: 'Имя должно быть минимум 2 символа, но не более 30',
  },
  link: {
    validator: (v: string) => validator.isURL(v),
    message: 'Неверный формат ссылки',
  },
};
