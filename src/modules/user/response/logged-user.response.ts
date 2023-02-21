import {Expose} from 'class-transformer';
import {UserRole} from '../../../types/user.type.js';

export default class LoggedUserResponse {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatarURL?: string;

  @Expose()
  public type!: UserRole;
}
