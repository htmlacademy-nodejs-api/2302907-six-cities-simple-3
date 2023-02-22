import {UserRole} from '../../../types/user.type.js';
import {IsEmail, IsEnum, IsString, Length} from 'class-validator';
import {USER_RESTRICTIONS} from '../user.constant.js';

export default class CreateUserDto {
  @IsString({message: USER_RESTRICTIONS.name.message.string})
  @Length(
    USER_RESTRICTIONS.name.minLength,
    USER_RESTRICTIONS.name.maxLength,
    {message: USER_RESTRICTIONS.name.message.length})
  public name!: string;

  @IsEmail({}, {message: USER_RESTRICTIONS.email.message})
  public email!: string;

  @IsString({message: USER_RESTRICTIONS.password.message.string})
  @Length(
    USER_RESTRICTIONS.password.minLength,
    USER_RESTRICTIONS.password.maxLength,
    {message: USER_RESTRICTIONS.password.message.length})
  public password!: string;

  @IsEnum(UserRole, {message: USER_RESTRICTIONS.type.message})
  public type!: UserRole;
}
