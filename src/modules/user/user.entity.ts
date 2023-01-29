import {UserRole, UserType} from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';


const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

// не могу разобраться с password
// если делать как в учебном проекте тип без поля password, то появляется ошибка в dto
// если делать с полем password, то ошибка Class 'UserEntity' incorrectly implements interface 'UserType'.

export class UserEntity extends defaultClasses.TimeStamps implements UserType {
  constructor(data: UserType) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarURL = data.avatarURL;
    this.type = data.type;
  }

  @prop({
    required: true,
    minLength: [1, 'Имя не заполнено'],
    maxLength: [15, 'Слишком длинное имя, максимум 15 символов'],
  })
  public name!: string;

  @prop({
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,10})?$/, 'Некорректный формат email'],
    unique: true,
  })
  public email!: string;

  @prop({
    match: [/(.*?)\.(jpg|png)$/, 'Некорректное расширение файла. Допустимы только .jpg и .png'],
  })
  public avatarURL!: string;

  @prop({
    required: true,
  })
  private password!: string;

  @prop({
    enum: UserRole,
    required: true,
  })
  public type!: UserRole;

  public setPassword(password: string, salt: string) {
    if (password.length < 6 || password.length > 12) {
      throw new Error('Длина пароля должна быть от 6 до 12 символов');
    }
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
