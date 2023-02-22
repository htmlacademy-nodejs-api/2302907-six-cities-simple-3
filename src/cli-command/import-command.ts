import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../utils/common.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import CityService from '../modules/city/city.service.js';
import OfferService from '../modules/offer/offer.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import {CityModel} from '../modules/city/city.entity.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';
import {OfferType} from '../types/offer.type.js';

import {UserRole} from '../types/user.type.js';
import {getURI} from '../utils/db.js';
import 'dotenv/config.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private cityService!: CityService;
  private offerService!: OfferService;
  private databaseService!: DatabaseService;
  private readonly logger: LoggerInterface;
  private readonly salt!: string;
  private readonly configService: ConfigInterface;

  constructor() {
    this.onRow = this.onRow.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.salt = process.env.SALT || '';
    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: OfferType) {
    const city = await this.cityService.findByCityNameOrCreate(offer.cityName, );

    // Тестовый пользователь
    const user = await this.userService.findOrCreate({
      name: 'Floriane',
      email: 'floriane@gmail.com',
      password: '123456',
      type: UserRole.Usual,
    }, this.salt);

    await this.offerService.create({
      ...offer,
      cityID: city.id.toString(),
      hostID: user.id.toString(),
    });
  }

  private async onRow(row: string, resolve: () => void) {
    const offer = createOffer(row);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string): Promise<void> {

    const user = this.configService.get('DB_USER');
    const password = this.configService.get('DB_PASSWORD');
    const host = this.configService.get('DB_HOST');
    const port = this.configService.get('DB_PORT');
    const dbname = this.configService.get('DB_NAME');

    const uri = getURI(
      user,
      password,
      host,
      port,
      dbname);

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('row', this.onRow);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {

      console.log(chalk.bgRed(`Can't read the file «${getErrorMessage(err)}»`));
    }
  }
}
