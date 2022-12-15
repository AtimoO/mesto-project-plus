import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationUser } from '../validations';
import { errUnauthorized } from '../errors/customError';
import { IUser, IUserModel } from '../utils/types';

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validationUser.email,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    validate: validationUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
    validate: validationUser.about,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validationUser.avatar,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email }).then((user) => {
      if (!user) return Promise.reject(errUnauthorized('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(errUnauthorized('Неправильные почта или пароль'));
        return user;
      });
    });
  },
);

export default mongoose.model<IUser, IUserModel>('user', userSchema);
