import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {getURI} from '../utils/db.js';
import {UserModel} from '../modules/user/user.entity.js';
import {UserRole} from '../types/user.type.js';
import {CityModel} from '../modules/city/city.entity.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const user = UserModel.create({
      name: 'test',
      email: 'test3@email.local',
      avatarURL: 'img/test.jpg',
      password: 'test123',
      type: UserRole.Pro,
    });

    console.log(user);

    const city = CityModel.create({
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499
      }
    });

    console.log(city);
  }
}
