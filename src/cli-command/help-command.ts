import {CliCommandInterface} from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.bgCyan('Программа для подготовки данных для REST API сервера.')}

      ${chalk.bgWhite('Пример')}: cli.js --<command> [--arguments]

      ${chalk.bgCyan('Команды:')}

      ${chalk.bgWhite('--version')}:                   # выводит номер версии
      ${chalk.bgWhite('--help')}:                      # печатает этот текст
      ${chalk.bgWhite('--import <path>')}:             # импортирует данные из TSV
      ${chalk.bgWhite('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных
    `);
  }
}
