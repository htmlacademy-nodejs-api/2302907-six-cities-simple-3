import {ObjectType} from '../../../types/object.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import CityResponse from '../../city/response/city.response.js';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({name: 'cityID'})
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public imgPreview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public type!: ObjectType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: GoodsType[];

  @Expose({name: 'hostID'})
  @Type(() => UserResponse)
  public host!: UserResponse;

  @Expose()
  public commentCount!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public locationOffer!: string;
}
