import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';
import {COMMENT_RESTRICTIONS} from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: COMMENT_RESTRICTIONS.text.message.string})
  @Length(COMMENT_RESTRICTIONS.text.minLength, COMMENT_RESTRICTIONS.text.maxLength, {message: COMMENT_RESTRICTIONS.text.message.length})
  public text!: string;

  @IsMongoId({message: COMMENT_RESTRICTIONS.offerID.message})
  public offerID!: string;

  @IsInt({message: COMMENT_RESTRICTIONS.rating.message.int})
  @Min(COMMENT_RESTRICTIONS.rating.min, {message: COMMENT_RESTRICTIONS.rating.message.minMax})
  @Max(COMMENT_RESTRICTIONS.rating.max, {message: COMMENT_RESTRICTIONS.rating.message.minMax})
  public rating!: number;

  public userID!: string;
}
