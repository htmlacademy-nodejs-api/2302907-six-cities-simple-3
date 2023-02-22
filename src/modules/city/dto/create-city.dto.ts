import {LocationType} from '../../../types/location.type.js';
import {ArrayMaxSize, ArrayMinSize, IsArray, IsString} from 'class-validator';
import {CITY_RESTRICTIONS} from '../city.constant.js';

export default class CreateCityDto {
  @IsString({message: 'Поле name должно быть строкой'})
  public name!: string;

  @IsArray({message: CITY_RESTRICTIONS.location.message})
  @ArrayMinSize(CITY_RESTRICTIONS.location.length, {message: CITY_RESTRICTIONS.location.message})
  @ArrayMaxSize(CITY_RESTRICTIONS.location.length, {message: CITY_RESTRICTIONS.location.message})
  public location!: LocationType;
}
