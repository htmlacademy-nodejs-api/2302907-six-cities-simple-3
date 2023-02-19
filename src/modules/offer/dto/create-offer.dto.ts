import {ObjectType} from '../../../types/object.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {LocationType} from '../../../types/location.type.js';
import {
  ArrayMaxSize, ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString, Length, Max,
  Min,
} from 'class-validator';

export default class CreateOfferDto {
  @Length(10, 100, {message: 'Название слишком короткое. Должно содержать от 10 до 100 символов'})
  public title!: string;

  @Length(20, 1024, {message: 'Название слишком короткое. Должно содержать от 20 до 1024 символов'})
  public description!: string;

  @IsMongoId({message: 'Поле cityID должно содержать id города'})
  public cityID!: string;

  @IsString({message: 'Поле imgPreview должно содержать адрес на фото-превью'})
  public imgPreview!: string;

  @IsArray({message: 'Поле images должно содержать массив строк'})
  @IsString({each: true, message: 'Поле images должно содержать массив строк'})
  public images!: string[];

  @IsBoolean({message: 'Поле isPremium может быть true или false'})
  public isPremium!: boolean;

  @IsEnum(ObjectType, {message: 'type может быть одним из 4 вариантов: apartment, house, room или hotel'})
  public type!: ObjectType;

  @IsInt({message: 'Поле roomsCount должно быть числом'})
  @Min(1, {message: 'Поле roomsCount должно быть не меньше 1'})
  @Max(8, {message: 'Поле roomsCount должно быть не больше 8'})
  public roomsCount!: number;

  @IsInt({message: 'Поле guestsCount должно быть числом'})
  @Min(1, {message: 'Поле guestsCount должно быть не меньше 1'})
  @Max(10, {message: 'Поле guestsCount должно быть не больше 10'})
  public guestsCount!: number;

  @IsInt({message: 'Поле price должно быть числом'})
  @Min(100, {message: 'Поле price должно быть не меньше 100'})
  @Max(100000, {message: 'Поле price должно быть не больше 100000'})
  public price!: number;

  @IsArray({message: 'Поле goods должно быть массивом'})
  @IsEnum(GoodsType, {
    each: true,
    message: 'Возможные значения для поля goods:  Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge'
  })
  public goods!: GoodsType[];

  public hostID!: string;

  @IsArray({message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMaxSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMinSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  public locationOffer!: LocationType;
}
