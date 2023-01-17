import {ConfigInterface} from './config.interface.js';
import {config} from 'dotenv';
import {LoggerInterface} from '../logger/logger.interface.js';
import {configSchema, ConfigSchema} from './config.schema.js';

export default class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;

  constructor(private logger: LoggerInterface) {
    const parsedOut = config();

    if (parsedOut.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
