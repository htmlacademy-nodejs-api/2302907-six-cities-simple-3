import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {CityServiceInterface} from './city-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import CityResponse from './response/city.response.js';
import CreateCityDto from './dto/create-city.dto.js';
import HttpError from '../../common/error/http-error.js';
import {ValidateDtoMiddleware} from '../../common/middleware/validate-dto.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CityController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middleware: [new ValidateDtoMiddleware(CreateCityDto)]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const cityResponse = fillDTO(CityResponse, cities);
    this.send(res, StatusCodes.OK, cityResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response): Promise<void> {

    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `City with name ${body.name} exists.`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(CityResponse, result)
    );
  }
}
