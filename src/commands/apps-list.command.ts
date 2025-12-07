import { Command } from 'commander';
import chalk from 'chalk';
import { AppService } from '../services/app.service';
import { logger } from '../utils/logger';

export class AppsListCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('list')
      .description('List all applications')
      .option('-j, --json', 'Output as JSON')
      .option('-s, --status <status>', 'Filter by status')
      .action((options) => this.list(options));
  }

  private async list(options: any): Promise<void> {
    try {
      const applications = await this.appService.listApps();
      
      if (options.json) {
        console.log(JSON.stringify(applications, null, 2));
        return;
      }
      
      this.displayTable(applications, options);
      
    } catch (error) {
      logger.error('Failed to list applications: ' + (error as Error).message);
      process.exit(1);
    }
  }

  private displayTable(applications: any[], options: any): void {
    console.log('\n📋 Your Applications:\n');
    
    const filteredApps = options.status 
      ? applications.filter(app => app.status === options.status)
      : applications;
    
    filteredApps.forEach(app => {
      const statusColor = this.getStatusColor(app.status);
      console.log(
        chalk.cyan(`  ${app.id.padEnd(10)}`) +
        chalk.white(` ${app.name.padEnd(25)} `) +
        `${statusColor(app.status.toUpperCase().padEnd(10))} ` +
        chalk.gray(`v${app.version}`) +
        chalk.gray(` | ${app.lastUpdated.toLocaleDateString()}`)
      );
    });
    
    console.log(`\nTotal: ${filteredApps.length} applications`);
  }

  private getStatusColor(status: string) {
    switch (status) {
      case 'active': return chalk.green;
      case 'pending': return chalk.yellow;
      case 'rejected': return chalk.red;
      case 'draft': return chalk.gray;
      default: return chalk.white;
    }
  }
}