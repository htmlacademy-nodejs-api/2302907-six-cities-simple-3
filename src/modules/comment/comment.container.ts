import {Container} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import {Component} from '../../types/component.types.js';
import CommentService from './comment.service.js';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import CommentController from './comment.controller.js';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
commentContainer.bind<ControllerInterface>(Component.CommentController).to(CommentController).inSingletonScope();
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer};
