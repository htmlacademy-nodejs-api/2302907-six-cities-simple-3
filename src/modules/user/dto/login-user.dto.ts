import {IsEmail, IsString} from 'class-validator';
import {USER_RESTRICTIONS} from '../user.constant.js';

export default class LoginUserDto {

  @IsEmail({}, {message: USER_RESTRICTIONS.email.message})
  public email!: string;

  @IsString({message: USER_RESTRICTIONS.password.message.string})
  public password!: string;
}
