import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onRow(row: string) {
    const offer = createOffer(row);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(filename: string): Promise<void> {

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('row', this.onRow);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {

      console.log(chalk.bgRed(`Can't read the file «${getErrorMessage(err)}»`));
    }
  }
}
