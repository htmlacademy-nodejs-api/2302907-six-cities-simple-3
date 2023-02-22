import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {ObjectType} from '../../types/object.type.js';
import {GoodsType} from '../../types/goods.type.js';
import {LocationType} from '../../types/location.type.js';
import {CityEntity} from '../city/city.entity.js';
import {UserEntity} from '../user/user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    trim: true,
    required: true,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
    ref: CityEntity,
  })
  public cityID!: Ref<CityEntity>;

  @prop({
    required: true,
  })
  public imgPreview!: string;

  @prop({
    required: true,
    type: [String]
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    default: 0,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: ObjectType,
  })
  public type!: ObjectType;

  @prop({
    required: true,
  })
  public roomsCount!: number;


  @prop({
    required: true,
  })
  public guestsCount!: number;


  @prop({
    required: true,
  })
  public price!: number;

  @prop({
    required: true,
    type: [String]
  })
  public goods!: GoodsType[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public hostID!: Ref<UserEntity>;

  @prop({
    required: true,
    type: [Number],
  })
  public locationOffer!: LocationType;

  @prop({required: false})
  public commentCount?: number;
}

export const OfferModel = getModelForClass(OfferEntity);
