import {HttpMethod} from './http-method.enum.js';
import {Request, Response, NextFunction} from 'express';
import {MiddlewareInterface} from './middleware.interface.js';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middleware?: MiddlewareInterface[];
}
