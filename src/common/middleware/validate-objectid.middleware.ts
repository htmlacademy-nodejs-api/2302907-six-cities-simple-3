import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import HttpError from '../error/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private paramTitle: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.paramTitle];

    if (mongoose.Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} не корректный формат. Нужен формат ObjectID`,
      'ValidateObjectIdMiddleware'
    );

  }
}
