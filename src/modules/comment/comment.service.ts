import {CommentServiceInterface} from './comment-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferModel} from '../offer/offer.entity.js';
import OfferService from '../offer/offer.service.js';
import {Types} from 'mongoose';

const DEFAULT_COMMENTS_COUNT = 50;

@injectable()
export default class CommentService implements CommentServiceInterface {
  private offerService!: OfferService;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>)
  {
    this.offerService = new OfferService(this.logger, OfferModel);
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    let offer = await this.offerService.incCommentCount(dto.offerID);

    const rating = await this.calcRating(dto.offerID);
    offer = await this.offerService.updateRating(dto.offerID, rating);

    this.logger.info(`New comment created for offer ${offer?.title}`);
    return comment;
  }

  public async calcRating(offerID: string): Promise<number | null> {
    const offerObjectId = new Types.ObjectId(offerID);
    const result = await this.commentModel
      .aggregate([
        { $match: { offerID: offerObjectId} },
        { $group: {_id: null, rating: {$avg: '$rating'}}},
      ]);

    if (result.length) {
      return (result[0].rating.toFixed(1)) ;
    }

    return null;
  }

  public async findByOfferId(offerID: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerID})
      .sort({createdAt: -1})
      .limit(DEFAULT_COMMENTS_COUNT)
      .populate(['userID'])
      .exec();
  }

  public async deleteByOfferId(offerID: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({offerID})
      .exec();

    return result.deletedCount;
  }
}
