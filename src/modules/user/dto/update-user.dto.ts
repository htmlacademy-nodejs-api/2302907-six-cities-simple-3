import {UserRole} from '../../../types/user.type.js';
import {IsEnum, IsOptional, IsString, Length, MinLength} from 'class-validator';

// почему здесь password public?
export default class UpdateUserDto {
  @IsOptional()
  @IsString({message: 'name должно быть строкой'})
  @Length(1, 15, {message: 'name должно содержать от 1 до 15 символов'})
  public name?: string;

  @IsOptional()
  @IsString({message: 'Пароль обязателен'})
  @MinLength(6, {message: 'Пароль должен содержать не менее 6 символов'})
  public password?: string;

  @IsOptional()
  @IsEnum(UserRole, {message: 'Тип может быть или "обычный", или "pro"'})
  public type?: UserRole;

  @IsOptional()
  @IsString({message: 'AvatarURL должен быть строкой'})
  public avatarURL?: string;
}
