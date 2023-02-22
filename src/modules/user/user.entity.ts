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
  })
  public name!: string;

  @prop({
    required: true,
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
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
