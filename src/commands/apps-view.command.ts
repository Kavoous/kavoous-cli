import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { AppService } from '../services/app.service';
import { logger } from '../utils/logger';

export class AppsViewCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('view <id>')
      .description('View application details')
      .action((id) => this.view(id));
  }

  private async view(id: string): Promise<void> {
    try {
      const app = await this.appService.getApp(id);
      
      if (!app) {
        logger.error(`Application "${id}" not found`);
        process.exit(1);
      }
      
      this.displayAppDetails(app);
      
    } catch (error) {
      logger.error('Failed to view application: ' + (error as Error).message);
      process.exit(1);
    }
  }

  private displayAppDetails(app: any): void {
    const statusColor = this.getStatusColor(app.status);
    const statusText = statusColor(`● ${app.status.toUpperCase()}`);
    
    const details = boxen(
      chalk.cyan.bold(`📄 ${app.name}\n\n`) +
      chalk.white(`   ID:          ${app.id}\n`) +
      chalk.white(`   Status:      ${statusText}\n`) +
      chalk.white(`   Version:     v${app.version}\n`) +
      chalk.white(`   Last Updated: ${app.lastUpdated.toLocaleDateString()}\n`) +
      chalk.white(`   Created:     ${new Date(app.lastUpdated.getTime() - 86400000).toLocaleDateString()}\n\n`) +
      chalk.yellow('🔧 Available Commands:\n') +
      chalk.gray(`   ${chalk.cyan('kavoous apps start ' + app.id)} - Start application\n`) +
      chalk.gray(`   ${chalk.cyan('kavoous apps stop ' + app.id)} - Stop application\n`) +
      chalk.gray(`   ${chalk.cyan('kavoous apps logs ' + app.id)} - View logs\n`) +
      chalk.gray(`   ${chalk.cyan('kavoous apps delete ' + app.id)} - Delete application`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    );
    
    console.log(details);
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