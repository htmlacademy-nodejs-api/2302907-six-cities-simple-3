import {LocationType} from './location.type.js';
import {GoodsType} from './goods.type.js';
import {ObjectType} from './object.type.js';

export type OfferType = {
  id: number;
  title: string;
  description: string;
  publicDate: Date;
  city: string;
  imgPreview: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: ObjectType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  goods: GoodsType[];
  hostID: string;
  commentsCount: number;
  locationOffer: LocationType;
};