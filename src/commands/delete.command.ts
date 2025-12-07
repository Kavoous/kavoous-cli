import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { logger } from '../utils/logger';
import { AppService } from '../services/app.service';

export class DeleteCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('delete [id]')
      .description('Delete an application')
      .option('-f, --force', 'Force delete without confirmation')
      .action((id, options) => this.delete(id, options));
  }

  private async delete(id?: string, options?: any): Promise<void> {
    try {
      if (!id) {
        id = await this.promptForAppId();
      }

      const app = await this.appService.getApp(id);
      if (!app) {
        throw new Error(`Application "${id}" not found`);
      }

      if (!options?.force) {
        const confirmed = await this.confirmDeletion(app.name);
        if (!confirmed) {
          console.log(chalk.yellow('Deletion cancelled'));
          return;
        }
      }

      logger.startSpinner(`Deleting application ${app.name}...`);
      
      // Simulate deletion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      logger.stopSpinner(true, 'Application deleted successfully');
      
    } catch (error) {
      logger.error((error as Error).message);
      process.exit(1);
    }
  }

  private async promptForAppId(): Promise<string> {
    const apps = await this.appService.listApps();
    
    if (apps.length === 0) {
      throw new Error('No applications found');
    }

    const choices = apps.map(app => ({
      name: `${app.name} (${app.id}) - ${app.status}`,
      value: app.id
    }));

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select application to delete:',
        choices
      }
    ]);

    return answer.id;
  }

  private async confirmDeletion(appName: string): Promise<boolean> {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete "${appName}"?`,
        default: false
      }
    ]);

    return answer.confirm;
  }
}