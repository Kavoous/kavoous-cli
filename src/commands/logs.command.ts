import { Command } from 'commander';
import chalk from 'chalk';
import { logger } from '../utils/logger';
import { AppService } from '../services/app.service';

export class LogsCommand {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  register(program: Command): void {
    program
      .command('logs <id>')
      .description('View application logs')
      .option('-f, --follow', 'Follow log output')
      .option('-n, --lines <number>', 'Number of lines to show', '50')
      .option('--error', 'Show only error logs')
      .option('--info', 'Show only info logs')
      .action((id, options) => this.logs(id, options));
  }

  private async logs(id: string, options: any): Promise<void> {
    try {
      const app = await this.appService.getApp(id);
      if (!app) {
        throw new Error(`Application "${id}" not found`);
      }

      console.log(chalk.cyan(`📋 Logs for ${app.name}\n`));
      
      if (options.follow) {
        this.showLiveLogs();
      } else {
        await this.showHistoricalLogs(options);
      }
      
    } catch (error) {
      logger.error((error as Error).message);
      process.exit(1);
    }
  }

  private showLiveLogs(): void {
    console.log(chalk.gray('Starting live log stream...\n'));
    console.log(chalk.gray('Press Ctrl+C to stop\n'));
    
    // Simulate live logs
    const logTypes = [
      { type: 'INFO', color: chalk.blue },
      { type: 'WARN', color: chalk.yellow },
      { type: 'ERROR', color: chalk.red },
      { type: 'DEBUG', color: chalk.gray }
    ];
    
    const messages = [
      'Server started on port 3000',
      'Database connection established',
      'User authenticated successfully',
      'API request received: GET /api/users',
      'Cache cleared successfully',
      'New user registered: john@example.com',
      'Error processing payment: Insufficient funds',
      'Background job completed',
      'Memory usage: 45%',
      'Request completed in 120ms'
    ];
    
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 20) {
        clearInterval(interval);
        console.log(chalk.gray('\nLog stream ended'));
        return;
      }
      
      const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
      
      console.log(
        chalk.gray(`[${timestamp}] `) +
        logType.color(`[${logType.type}] `) +
        chalk.white(message)
      );
      
      count++;
    }, 800);
  }

  private async showHistoricalLogs(options: any): Promise<void> {
    const lines = parseInt(options.lines) || 50;
    
    console.log(chalk.gray(`Showing last ${lines} lines:\n`));
    
    // Generate mock logs
    const logs = this.generateMockLogs(lines, options);
    
    logs.forEach(log => {
      const color = this.getLogColor(log.type);
      console.log(
        chalk.gray(`[${log.timestamp}] `) +
        color(`[${log.type}] `) +
        chalk.white(log.message)
      );
    });
    
    console.log(chalk.gray(`\nEnd of logs (${lines} lines shown)`));
  }

  private generateMockLogs(count: number, options: any): Array<{timestamp: string, type: string, message: string}> {
    const logs = [];
    const types = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    const messages = [
      'Application initialized',
      'Database migration completed',
      'User session created',
      'API endpoint called',
      'Cache miss detected',
      'File uploaded successfully',
      'Email sent to user',
      'Security scan completed',
      'Performance metrics collected',
      'Backup created successfully'
    ];
    
    const now = Date.now();
    
    for (let i = 0; i < count; i++) {
      let type = types[Math.floor(Math.random() * types.length)];
      
      // Filter by type if specified
      if (options.error && type !== 'ERROR') continue;
      if (options.info && type !== 'INFO') continue;
      
      const timestamp = new Date(now - (count - i) * 1000).toISOString().split('T')[1].split('.')[0];
      const message = messages[Math.floor(Math.random() * messages.length)];
      
      logs.push({ timestamp, type, message });
    }
    
    return logs;
  }

  private getLogColor(type: string) {
    switch (type) {
      case 'ERROR': return chalk.red;
      case 'WARN': return chalk.yellow;
      case 'INFO': return chalk.blue;
      case 'DEBUG': return chalk.gray;
      default: return chalk.white;
    }
  }
}