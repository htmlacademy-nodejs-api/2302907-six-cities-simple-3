import {Container} from 'inversify';
import {CityServiceInterface} from './city-service.interface.js';
import {Component} from '../../types/component.types.js';
import CityService from './city.service.js';
import {types} from '@typegoose/typegoose';
import {CityEntity, CityModel} from './city.entity.js';

const cityContainer = new Container();

cityContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService);
cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);


export {cityContainer};
