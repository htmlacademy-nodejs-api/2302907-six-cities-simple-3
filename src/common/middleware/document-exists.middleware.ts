import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import {NextFunction, Request, Response} from 'express';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../error/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} с id ${documentId} не найден`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
