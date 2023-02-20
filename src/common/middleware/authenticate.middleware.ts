import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {jwtVerify} from 'jose';
import {createSecretKey} from 'crypto';
import HttpError from '../error/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers?.authorization?.split(' ');

    if (!authHeader) {
      return next();
    }

    const [, token] = authHeader;

    try {
      const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      req.user = { email: payload.email as string, id: payload.id as string};
      return next();
    } catch {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'AuthenticateMiddleware'
        )
      );
    }
  }
}
