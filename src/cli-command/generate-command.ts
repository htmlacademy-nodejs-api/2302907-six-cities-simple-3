import {CliCommandInterface} from './cli-command.interface.js';
import {MockDataType} from '../types/mock-data.type.js';
import got from 'got';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import {appendFile} from 'fs/promises';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockDataType;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      const row = offerGeneratorString.generate();
      await appendFile(filepath, `${row}\n`, 'utf-8');
    }

    console.log(`File ${filepath} was created`);
  }
}
