import chalk from 'chalk';
import ora, { Ora } from 'ora';

class Logger {
  private spinner: Ora | null = null;

  success(message: string): void {
    console.log(chalk.green('✓') + ' ' + message);
  }

  error(message: string): void {
    console.log(chalk.red('✗') + ' ' + message);
  }

  info(message: string): void {
    console.log(chalk.cyan('ℹ') + ' ' + message);
  }

  warn(message: string): void {
    console.log(chalk.yellow('⚠') + ' ' + message);
  }

  startSpinner(text: string): void {
    this.spinner = ora(text).start();
  }

  stopSpinner(success: boolean = true, text?: string): void {
    if (this.spinner) {
      if (success) {
        this.spinner.succeed(text);
      } else {
        this.spinner.fail(text);
      }
      this.spinner = null;
    }
  }
}

export const logger = new Logger();