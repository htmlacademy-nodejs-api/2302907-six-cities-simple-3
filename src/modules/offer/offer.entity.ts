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
    minlength: [10, 'Название слишком короткое. Должно содержать от 10 до 100 символов'],
    maxlength: [100, 'Название слишком длинное. Должно содержать от 10 до 100 символов'],
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: [20, 'Описание слишком короткое. Должно содержать от 20 до 1024 символов'],
    maxlength: [1024, 'Описание слишком длинное. Должно содержать от 20 до 1024 символов'],
  })
  public description!: string;

  @prop({
    required: true,
    ref: CityEntity,
  })
  public cityName!: Ref<CityEntity>;

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
    min: 1,
    max: 8,
  })
  public roomsCount!: number;


  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public guestsCount!: number;


  @prop({
    required: true,
    min: 100,
    max: 100000,
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
}

export const OfferModel = getModelForClass(OfferEntity);
