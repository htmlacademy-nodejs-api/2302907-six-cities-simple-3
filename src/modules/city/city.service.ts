import {inject, injectable} from 'inversify';
import {CityServiceInterface} from './city-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {CityEntity} from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {LocationType} from '../../types/location.type.js';

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

  public async findByCityNameOrCreate(cityName: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    if (!dto.location) {
      dto.location = getCityLocation(dto.name);
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: {cityID: '$_id'},
            pipeline: [
              {$match: {$expr: {$in: ['$$cityID', '$cities']}}},
              {$project: {_id: 1}}
            ],
            as: 'offers'
          },
        },
        {
          $addFields:
            {id: {$toString: '$_id'}, offersCount: {$size: 'offers'}}
        },
        {$unset: 'offers'},
      ])
      .exec();
  }
}

function getCityLocation(cityName: string): LocationType {
  const data = [
    {
      name: 'Paris',
      location: [48.85661, 2.351499]
    },
    {
      name: 'Cologne',
      location: [50.938361, 6.959974]
    },
    {
      name: 'Brussels',
      location: [50.846557, 4.351697]
    },
    {
      name: 'Amsterdam',
      location: [52.370216, 4.895168]
    },
    {
      name: 'Hamburg',
      location: [53.550341, 10.000654]
    },
    {
      name: 'Dusseldorf',
      location: [51.225402, 6.776314]
    }
  ];

  const city = data.find((item) => item.name === cityName);
  if (city) {
    return [city.location[0], city.location[1]];
  } else {
    throw new Error('City is not found');
  }
}
