import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {CityType} from '../../types/city.type.js';
import {LocationType} from '../../types/location.type.js';

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

export class CityEntity extends defaultClasses.TimeStamps implements CityType {
  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public location!: LocationType;
}

export const CityModel = getModelForClass(CityEntity);
