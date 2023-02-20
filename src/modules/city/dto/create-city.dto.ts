import {LocationType} from '../../../types/location.type.js';
import {ArrayMaxSize, ArrayMinSize, IsArray, IsString} from 'class-validator';

export default class CreateCityDto {
  @IsString({message: 'Поле name должно быть строкой'})
  public name!: string;

  @IsArray({message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMaxSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  @ArrayMinSize(2, {message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]'})
  public location!: LocationType;
}
