import { Command } from 'commander';
import { AppService } from '../services/app.service';
import chalk from 'chalk';
import { logger } from '../utils/logger';

export class AppsCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    const apps = program.command('apps');
    
    apps
      .command('list')
      .description('List all applications')
      .option('-j, --json', 'Output as JSON')
      .action((options) => this.list(options));
    
    apps
      .command('view <id>')
      .description('View application details')
      .action((id) => this.view(id));
  }

  private async list(options: any): Promise<void> {
    try {
      const applications = await this.appService.listApps();
      
      if (options.json) {
        console.log(JSON.stringify(applications, null, 2));
        return;
      }
      
      console.log('\n📋 Your Applications:\n');
      
      applications.forEach(app => {
        const statusColor = this.getStatusColor(app.status);
        console.log(
          `  ${app.id.padEnd(10)} ${app.name.padEnd(25)} ` +
          `${statusColor(app.status.toUpperCase().padEnd(10))} ` +
          `${chalk.gray(app.version)}`
        );
      });
      
      console.log(`\nTotal: ${applications.length} applications`);
    } catch (error) {
      logger.error('Failed to list applications: ' + (error as Error).message);
      process.exit(1);
    }
  }

  private async view(id: string): Promise<void> {
    try {
      const app = await this.appService.getApp(id);
      
      if (!app) {
        logger.error(`Application "${id}" not found`);
        process.exit(1);
      }
      
      const statusColor = this.getStatusColor(app.status);
      
      console.log('\n📄 Application Details:\n');
      console.log(`  ID:          ${app.id}`);
      console.log(`  Name:        ${app.name}`);
      console.log(`  Status:      ${statusColor(app.status.toUpperCase())}`);
      console.log(`  Version:     ${app.version}`);
      console.log(`  Last Updated: ${app.lastUpdated.toLocaleDateString()}`);
    } catch (error) {
      logger.error('Failed to view application: ' + (error as Error).message);
      process.exit(1);
    }
  }

  private getStatusColor(status: string) {
    switch (status) {
      case 'active': return chalk.green;
      case 'pending': return chalk.yellow;
      case 'rejected': return chalk.red;
      default: return chalk.gray;
    }
  }
}