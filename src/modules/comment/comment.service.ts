import {CommentServiceInterface} from './comment-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>)
  {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userID');
  }

  public async findByOfferId(offerID: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerID})
      .populate('userID')
      .exec();
  }

  public async deleteByOfferId(offerID: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({offerID})
      .exec();

    return result.deletedCount;
  }
}
