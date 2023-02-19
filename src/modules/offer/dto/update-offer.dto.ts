import {ObjectType} from '../../../types/object.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {LocationType} from '../../../types/location.type.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId, IsOptional,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, {message: 'Название слишком короткое. Должно содержать от 10 до 100 символов'})
  public title!: string;

  @IsOptional()
  @Length(20, 1024, {message: 'Название слишком короткое. Должно содержать от 20 до 1024 символов'})
  public description!: string;

  @IsOptional()
  @IsMongoId({message: 'Поле cityID должно содержать id города'})
  public cityID!: string;

  @IsOptional()
  @IsString({message: 'Поле imgPreview должно содержать адрес на фото-превью'})
  public imgPreview!: string;

  @IsOptional()
  @IsArray({message: 'Поле images должно содержать массив строк'})
  @IsString({each: true, message: 'Поле images должно содержать массив строк'})
  public images!: string[];

  @IsOptional()
  @IsBoolean({message: 'Поле isPremium может быть true или false'})
  public isPremium!: boolean;

  @IsOptional()
  @IsEnum(ObjectType, {message: 'type может быть одним из 4 вариантов: apartment, house, room или hotel'})
  public type!: ObjectType;

  @IsOptional()
  @IsInt({message: 'Поле roomsCount должно быть числом'})
  @Min(1, {message: 'Поле roomsCount должно быть не меньше 1'})
  @Max(8, {message: 'Поле roomsCount должно быть не больше 8'})
  public roomsCount!: number;

  @IsOptional()
  @IsInt({message: 'Поле guestsCount должно быть числом'})
  @Min(1, {message: 'Поле guestsCount должно быть не меньше 1'})
  @Max(10, {message: 'Поле guestsCount должно быть не больше 10'})
  public guestsCount!: number;

  @IsOptional()
  @IsInt({message: 'Поле price должно быть числом'})
  @Min(100, {message: 'Поле price должно быть не меньше 100'})
  @Max(100000, {message: 'Поле price должно быть не больше 100000'})
  public price!: number;

  @IsOptional()
  @IsArray({message: 'Поле goods должно быть массивом'})
  @IsEnum(GoodsType, {
    each: true,
    message: 'Возможные значения для поля goods:  Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge'
  })
  public goods!: GoodsType[];

  @IsOptional()
  @IsMongoId({message: 'Поле hostID должно содержать id хоста'})
  public hostID!: string;

  @IsOptional()
  @IsArray({message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMaxSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMinSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  public locationOffer!: LocationType;
}
