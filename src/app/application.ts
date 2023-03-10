import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {getURI} from '../utils/db.js';
import express, {Express} from 'express';
import CityController from '../modules/city/city.controller.js';
import {ExceptionFilterInterface} from '../common/error/exception-filter.interface.js';
import UserController from '../modules/user/user.controller.js';
import OfferController from '../modules/offer/offer.controller.js';
import {AuthenticateMiddleware} from '../common/middleware/authenticate.middleware.js';
import {getFullServerPath} from '../utils/common.js';
import cors from 'cors';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.CityController) private cityController: CityController,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.CommentController) private commentController: UserController,
    @inject(Component.OfferController) private offerController: OfferController,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/cities', this.cityController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
    this.expressApp.use('/offers', this.offerController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());

    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY')));

    this.expressApp.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApp.use(cors());
  }

  public initExceptionFilters(){
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));

    const serverPath = getFullServerPath(this.config.get('HOST'), this.config.get('PORT'));
    this.logger.info(`Server started on ${serverPath}`);
  }
}
