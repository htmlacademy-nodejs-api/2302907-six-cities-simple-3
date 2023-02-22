import {UserRole} from '../../../types/user.type.js';
import {IsEnum, IsOptional, IsString, Length} from 'class-validator';
import {USER_RESTRICTIONS} from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({message: USER_RESTRICTIONS.name.message.string})
  @Length(
    USER_RESTRICTIONS.name.minLength,
    USER_RESTRICTIONS.name.maxLength,
    {message: USER_RESTRICTIONS.name.message.length})
  public name?: string;

  @IsOptional()
  @IsString({message: USER_RESTRICTIONS.password.message.string})
  @Length(
    USER_RESTRICTIONS.password.minLength,
    USER_RESTRICTIONS.password.maxLength,
    {message: USER_RESTRICTIONS.password.message.length})
  public password?: string;

  @IsOptional()
  @IsEnum(UserRole, {message: USER_RESTRICTIONS.type.message})
  public type?: UserRole;

  @IsOptional()
  @IsString({message: USER_RESTRICTIONS.avatar.message})
  public avatarURL?: string;
}
