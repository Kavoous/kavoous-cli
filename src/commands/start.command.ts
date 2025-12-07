import { Command } from 'commander';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { logger } from '../utils/logger';
import { AppService } from '../services/app.service';

export class StartCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('start <id>')
      .description('Start an application')
      .option('-p, --port <port>', 'Port to start on')
      .option('-e, --env <environment>', 'Environment (dev/staging/prod)')
      .action((id, options) => this.start(id, options));
  }

  private async start(id: string, options: any): Promise<void> {
    try {
      const app = await this.appService.getApp(id);
      if (!app) {
        throw new Error(`Application "${id}" not found`);
      }

      console.log(chalk.cyan(`🚀 Starting ${app.name}...\n`));
      
      const spinner = ora({
        text: 'Initializing application...',
        color: 'cyan'
      }).start();

      // Simulate startup process
      await this.simulateStartup(spinner);
      
      spinner.succeed(chalk.green(`✅ ${app.name} started successfully!`));
      
      this.showStartupInfo(app, options);
      
    } catch (error) {
      logger.error((error as Error).message);
      process.exit(1);
    }
  }

  private async simulateStartup(spinner: Ora): Promise<void> {
    const steps = [
      { text: 'Loading dependencies...', delay: 1000 },
      { text: 'Configuring environment...', delay: 800 },
      { text: 'Starting database connection...', delay: 1200 },
      { text: 'Initializing server...', delay: 900 },
      { text: 'Setting up routes...', delay: 700 }
    ];

    for (const step of steps) {
      spinner.text = step.text;
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }
  }

  private showStartupInfo(app: any, options: any): void {
    const port = options.port || 3000;
    const env = options.env || 'development';
    
    console.log(chalk.gray('\n📊 Application Status:'));
    console.log(chalk.white(`   Name: ${app.name}`));
    console.log(chalk.white(`   ID: ${app.id}`));
    console.log(chalk.white(`   Port: ${port}`));
    console.log(chalk.white(`   Environment: ${env}`));
    console.log(chalk.white(`   Status: ${chalk.green('RUNNING')}`));
    console.log(chalk.gray('\n🌐 Access URLs:'));
    console.log(chalk.cyan(`   Local: http://localhost:${port}`));
    console.log(chalk.cyan(`   Network: http://192.168.1.100:${port}`));
    console.log(chalk.gray('\n📋 Next:'));
    console.log(chalk.gray(`   Run ${chalk.cyan('kavoous apps logs ' + app.id)} to view logs`));
    console.log(chalk.gray(`   Run ${chalk.cyan('kavoous apps stop ' + app.id)} to stop`));
  }
}