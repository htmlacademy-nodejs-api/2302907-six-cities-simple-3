import {ObjectType} from '../../../types/object.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {LocationType} from '../../../types/location.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publicDate?: Date;
  public cityName?: string;
  public imgPreview?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: ObjectType;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public goods?: GoodsType[];
  public hostID?: string;
  public locationOffer?: LocationType;
  public commentCount?: number;
}
