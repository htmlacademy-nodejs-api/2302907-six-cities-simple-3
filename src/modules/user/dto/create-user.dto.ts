import {UserRole} from '../../../types/user.type.js';


export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarURL!: string;
  public password!: string;
  public type!: UserRole;
}
