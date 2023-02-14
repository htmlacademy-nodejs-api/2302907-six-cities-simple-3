import crypto from 'crypto';
import {OfferType} from '../types/offer.type.js';
import {LocationType} from '../types/location.type.js';
import {ObjectType} from '../types/object.type.js';
import {GoodsType} from '../types/goods.type.js';

export const createOffer = (row: string): OfferType => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, cityName, imgPreview, images, isPremium,
    rating, type, roomsCount, guestsCount, price, goods, hostID, locationOffer] = tokens;

  const [latitude, longitude] = locationOffer.split(', ');

  const location: LocationType = [
    Number.parseInt(latitude, 10),
    Number.parseInt(longitude, 10),
  ];

  return {
    title,
    description,
    cityName,
    imgPreview,
    images: images.split('; '),
    isPremium: Boolean(isPremium),
    rating: Number.parseInt(rating, 10),
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
