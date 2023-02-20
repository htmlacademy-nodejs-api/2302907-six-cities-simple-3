import CreateCityDto from './dto/create-city.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CityEntity} from './city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByCityID(cityID: string): Promise<DocumentType<CityEntity> | null>;
  findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null>;
  findByCityNameOrCreate(cityName: string): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
}
