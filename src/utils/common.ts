import * as jose from 'jose';
import crypto from 'crypto';
import {OfferType} from '../types/offer.type.js';
import {LocationType} from '../types/location.type.js';
import {ObjectType} from '../types/object.type.js';
import {GoodsType} from '../types/goods.type.js';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {ValidationErrorFieldType} from '../types/validation-error-field.type.js';
import {ValidationError} from 'class-validator';
import {ServiceError} from '../types/service-error.enum.js';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.constant.js';

export const createOffer = (row: string): OfferType => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, cityName, imgPreview, images, isPremium,
    type, roomsCount, guestsCount, price, goods, locationOffer] = tokens;

  const location: LocationType = [0, 0];

  if (locationOffer) {
    const [latitude, longitude] = locationOffer.split(', ');
    location[0] = +latitude;
    location[1] = +longitude;
  }

  return {
    title,
    description,
    cityName,
    imgPreview,
    images: images.split('; '),
    isPremium: Boolean(isPremium),
    rating: 0,
    type: type as ObjectType,
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split('; ') as GoodsType[],
    locationOffer: location,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorFieldType[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorFieldType[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) =>
  `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject).forEach((key) => {
    if (key === property) {
      transformFn(someObject);
    } else if (isObject(someObject[key])) {
      transformProperty(property, someObject[key] as UnknownObject, transformFn);
    }
  });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data: UnknownObject) => {
  properties.forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
    const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
    target[property] = `${rootPath}/${target[property]}`;
  }));
};
