import {IsInt, IsMongoId, IsOptional} from 'class-validator';

export default class GetOffersDto {
  @IsOptional()
  @IsMongoId({message: 'Поле cityID должно содержать id города'})
  public cityID?: string;

  @IsOptional()
  @IsInt({message: 'Поле count может содержать количество запрашиваемых объявлений'})
  public count?: number;
}
