import {LoggerInterface} from './logger.interface.js';
import {Logger, pino} from 'pino';
import {injectable} from 'inversify';

@injectable()
export default class LoggerService implements LoggerInterface {
  private logger!: Logger;

  constructor() {
    this.logger = pino();
    this.logger.info('Logger created…');
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
