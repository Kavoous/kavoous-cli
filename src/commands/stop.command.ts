import { Command } from 'commander';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { logger } from '../utils/logger';
import { AppService } from '../services/app.service';

export class StopCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('stop <id>')
      .description('Stop an application')
      .option('-f, --force', 'Force stop')
      .action((id) => this.stop(id));
  }

  private async stop(id: string): Promise<void> {
    try {
      const app = await this.appService.getApp(id);
      if (!app) {
        throw new Error(`Application "${id}" not found`);
      }

      console.log(chalk.yellow(`🛑 Stopping ${app.name}...\n`));
      
      const spinner = ora({
        text: 'Initiating shutdown...',
        color: 'yellow'
      }).start();

      // Simulate shutdown process
      await this.simulateShutdown(spinner);
      
      spinner.succeed(chalk.green(`✅ ${app.name} stopped successfully`));
      
    } catch (error) {
      logger.error((error as Error).message);
      process.exit(1);
    }
  }

  private async simulateShutdown(spinner: Ora): Promise<void> {
    const steps = [
      { text: 'Closing connections...', delay: 800 },
      { text: 'Saving session data...', delay: 600 },
      { text: 'Stopping services...', delay: 1000 },
      { text: 'Cleaning up resources...', delay: 700 },
      { text: 'Shutdown complete', delay: 500 }
    ];

    for (const step of steps) {
      spinner.text = step.text;
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }
  }
}