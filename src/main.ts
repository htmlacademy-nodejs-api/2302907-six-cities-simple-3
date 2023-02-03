import 'reflect-metadata';
import Application from './app/application.js';

import {Component} from './types/component.types.js';
import {Container} from 'inversify';
import {applicationContainer} from './app/application.container.js';
import {userContainer} from './modules/user/user.container.js';
import {cityContainer} from './modules/city/city.container.js';
import {offerContainer} from './modules/offer/offer.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  cityContainer,
  offerContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();

