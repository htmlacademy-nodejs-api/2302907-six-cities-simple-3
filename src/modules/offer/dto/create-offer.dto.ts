import {ObjectType} from '../../../types/object.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {LocationType} from '../../../types/location.type.js';
import {
  ArrayMaxSize, ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString, Length, Max,
  Min,
} from 'class-validator';
import {OFFER_RESTRICTIONS} from '../offer.constant.js';

export default class CreateOfferDto {
  @Length(OFFER_RESTRICTIONS.title.minLength, OFFER_RESTRICTIONS.title.maxLength, {message: OFFER_RESTRICTIONS.title.message})
  public title!: string;

  @Length(OFFER_RESTRICTIONS.description.minLength, OFFER_RESTRICTIONS.description.maxLength, {message: OFFER_RESTRICTIONS.description.message})
  public description!: string;

  @IsMongoId({message: OFFER_RESTRICTIONS.cityID.message})
  public cityID!: string;

  @IsString({message:  OFFER_RESTRICTIONS.imgPreview.message})
  public imgPreview!: string;

  @IsArray({message: OFFER_RESTRICTIONS.images.message})
  @IsString({each: true, message: OFFER_RESTRICTIONS.images.message})
  public images!: string[];

  @IsBoolean({message: OFFER_RESTRICTIONS.isPremium.message})
  public isPremium!: boolean;

  @IsEnum(ObjectType, {message: OFFER_RESTRICTIONS.type.message})
  public type!: ObjectType;

  @IsInt({message: OFFER_RESTRICTIONS.roomsCount.message.int})
  @Min(OFFER_RESTRICTIONS.roomsCount.min, {message: OFFER_RESTRICTIONS.roomsCount.message.min})
  @Max(OFFER_RESTRICTIONS.roomsCount.max, {message:  OFFER_RESTRICTIONS.roomsCount.message.max})
  public roomsCount!: number;

  @IsInt({message: OFFER_RESTRICTIONS.guestsCount.message.int})
  @Min(OFFER_RESTRICTIONS.guestsCount.min, {message: OFFER_RESTRICTIONS.guestsCount.message.min})
  @Max(OFFER_RESTRICTIONS.guestsCount.max, {message:  OFFER_RESTRICTIONS.guestsCount.message.max})
  public guestsCount!: number;

  @IsInt({message: OFFER_RESTRICTIONS.price.message.int})
  @Min(OFFER_RESTRICTIONS.price.min, {message: OFFER_RESTRICTIONS.price.message.min})
  @Max(OFFER_RESTRICTIONS.price.max, {message:  OFFER_RESTRICTIONS.price.message.max})
  public price!: number;

  @IsArray({message: OFFER_RESTRICTIONS.goods.message.array})
  @IsEnum(GoodsType, {each: true, message: OFFER_RESTRICTIONS.goods.message.enum})
  public goods!: GoodsType[];

  public hostID!: string;

  @IsArray({message: OFFER_RESTRICTIONS.locationOffer.message})
  @ArrayMinSize(OFFER_RESTRICTIONS.locationOffer.length, {message: OFFER_RESTRICTIONS.locationOffer.message})
  @ArrayMaxSize(OFFER_RESTRICTIONS.locationOffer.length, {message: OFFER_RESTRICTIONS.locationOffer.message})
  public locationOffer!: LocationType;
}
