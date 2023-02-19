import * as jose from 'jose';
import crypto from 'crypto';
import {OfferType} from '../types/offer.type.js';
import {LocationType} from '../types/location.type.js';
import {ObjectType} from '../types/object.type.js';
import {GoodsType} from '../types/goods.type.js';
import {ClassConstructor, plainToInstance} from 'class-transformer';

export const createOffer = (row: string): OfferType => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, cityName, imgPreview, images, isPremium,
    type, roomsCount, guestsCount, price, goods, hostID, locationOffer] = tokens;

  const location: LocationType = [0, 0];

  if (locationOffer) {
    const [latitude, longitude] = locationOffer.split(', ');
    location[0] = Number.parseInt(latitude, 10);
    location[1] = Number.parseInt(longitude, 10);
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
    hostID,
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

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
