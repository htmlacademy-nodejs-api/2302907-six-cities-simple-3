import {UserRole} from '../../../types/user.type.js';
import {IsEmail, IsEnum, IsOptional, IsString, Length, MinLength} from 'class-validator';

// почему здесь password public?
export default class CreateUserDto {
  @IsString({message: 'name должно быть строкой'})
  @Length(1, 15, {message: 'name должно содержать от 1 до 15 символов'})
  public name!: string;

  @IsEmail({}, {message: 'Email должен быть валидным'})
  public email!: string;

  @IsString({message: 'avatarURL может быть только строкой'})
  @IsOptional()
  public avatarURL!: string;

  @IsString({message: 'Пароль обязателен'})
  @MinLength(6, {message: 'Пароль должен содержать не менее 6 символов'})
  public password!: string;

  @IsEnum(UserRole, {message: 'Тип может быть или "обычный", или "pro"'})
  public type!: UserRole;
}
