import {ObjectType} from '../../../types/object.type.js';
import {Expose, Type} from 'class-transformer';
import CityResponse from '../../city/response/city.response.js';

export default class OfferListResponse {
  @Expose()
  public title!: string;

  @Expose({name: 'cityID'})
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public imgPreview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public type!: ObjectType;

  @Expose()
  public createdAt!: string;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  public rating!: number;
}
