import {inject, injectable} from 'inversify';
import {CityServiceInterface} from './city-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {CityEntity} from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {LocationType} from '../../types/location.type.js';
import {CITIES} from './city.constant.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CityModel) private readonly cityModel: ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCityID(cityID: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityID).exec();
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName}).exec();
  }

  public async findByCityNameOrCreate(cityName: string): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    const dto: CreateCityDto = {
      name: cityName,
      location: this.getCityLocation(cityName)
    };

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel.find().exec();
  }

  private getCityLocation(cityName: string): LocationType {
    const location: LocationType = CITIES[cityName];
    if (location) {
      return location;
    } else {
      throw new Error('City is not found');
    }
  }
}
