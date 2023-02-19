import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import HttpError from '../../common/error/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import {ValidateDtoMiddleware} from '../../common/middleware/validate-dto.middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middleware: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.exists(body.offerID);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${body.offerID}» not found`
      );
    }

    const result = await this.commentService.create(body);
    this.send(res, StatusCodes.CREATED, fillDTO(CommentResponse, result));
  }
}
