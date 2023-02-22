import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {OfferEntity} from '../offer/offer.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
  })
  public text!: string;

  @prop({
    required: true,
    ref: OfferEntity
  })
  public offerID!: Ref<OfferEntity>;

  @prop({required: true})
  public rating!: number;

  @prop({required: true, ref: UserEntity})
  public userID!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
