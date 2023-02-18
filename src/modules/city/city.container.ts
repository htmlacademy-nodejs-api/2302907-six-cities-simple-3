import {Container} from 'inversify';
import {CityServiceInterface} from './city-service.interface.js';
import {Component} from '../../types/component.types.js';
import CityService from './city.service.js';
import {types} from '@typegoose/typegoose';
import {CityEntity, CityModel} from './city.entity.js';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import CityController from './city.controller.js';

const cityContainer = new Container();

cityContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService);
cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
cityContainer.bind<ControllerInterface>(Component.CityController).to(CityController).inSingletonScope();


export {cityContainer};
