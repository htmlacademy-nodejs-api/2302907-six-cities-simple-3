import {CliCommandInterface} from './cli-command.interface.js';
import {MockDataType} from '../types/mock-data.type.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockDataType;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
  }
}
