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

    const [longitude, latitude] = dto.location;

    if (longitude === 0 && latitude === 0) {
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
      location: {
        latitude: 48.85661,
        longitude: 2.351499
      }
    },
    {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974
      }
    },
    {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697
      }
    },
    {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168
      }
    },
    {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654
      }
    },
    {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314
      }
    }
  ];

  const city = data.find((item) => item.name === cityName);
  if (city) {
    return [city.location.latitude, city.location.longitude];
  } else {
    return [0, 0];
  }
}
