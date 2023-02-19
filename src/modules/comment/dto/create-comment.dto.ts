import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'Поле name должно быть строкой'})
  @Length(5, 1024, {message: 'Длина текста комментария может быть от 2 до 1024 символов'})
  public text!: string;

  @IsMongoId({message: 'Поле offerID должно содержать id предложения'})
  public offerID!: string;

  @IsInt({message: 'Поле rating должно быть числом'})
  @Min(1, {message: 'Поле rating должно быть целым числом от 1 до 5'})
  @Max(5, {message: 'Поле rating должно быть целым числом от 1 до 5'})
  public rating!: number;

  public userID!: string;
}
