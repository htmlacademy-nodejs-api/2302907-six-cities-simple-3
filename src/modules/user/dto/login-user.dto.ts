import {IsEmail, IsString} from 'class-validator';

export default class LoginUserDto {

  @IsEmail({}, {message: 'Email должен быть валидным'})
  public email!: string;

  @IsString({message: 'Пароль обязателен'})
  public password!: string;
}
