import {UserRole} from '../../../types/user.type.js';

// почему здесь password public?
export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarURL!: string;
  public password!: string;
  public type!: UserRole;
}
