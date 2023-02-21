import {Expose} from 'class-transformer';
import {UserRole} from '../../../types/user.type.js';

export default class UserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarURL?: string;

  @Expose()
  public type!: UserRole;
}
