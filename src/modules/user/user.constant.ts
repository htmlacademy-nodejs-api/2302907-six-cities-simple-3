import {UserRole} from '../../types/user.type.js';

export const JWT_ALGORITM = 'HS256';
export const DEFAULT_AVATAR_FILE_NAME = 'avatar.png';

export const USER_RESTRICTIONS = {
  name: {
    minLength: 1,
    maxLength: 15,
    message: {
      string: 'Поле name должно быть строкой',
      length: 'Поле name должно содержать от 1 до 15 символов',
    }
  },
  email: {
    message: 'Email должен быть валидным',
  },
  password: {
    minLength: 6,
    maxLength: 12,
    message: {
      string: 'Поле password должно содержать строку',
      length: 'Длина пароля должна быть от 6 до 12 символов'
    }
  },
  type: {
    message: `Тип может быть или "${UserRole.Usual}", или "${UserRole.Pro}"`
  },
  avatar: {
    message: 'Поле avatarURL может быть только строкой',
  }
} as const;
