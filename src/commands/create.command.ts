import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { 
  AppCreateOptions,
  KavoousConfig 
} from '../types';
import { logger } from '../utils/logger';

export class CreateCommand {
  register(program: Command): void {
    program
      .command('create')
      .description('Create a new application')
      .action(() => this.create());
  }

  private async create(): Promise<void> {
    try {
      this.showCreateHeader();
      
      const options = await this.promptForOptions();
      await this.validateOptions(options);
      
      logger.startSpinner('Creating application...');
      
      // Simulate creation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (options.createConfigFile) {
        await this.createConfigFile(options);
      }
      
      await this.saveApplication();
      
      logger.stopSpinner(true, 'Application created successfully!');
      this.showSuccessMessage(options);
      
    } catch (error) {
      logger.stopSpinner(false, 'Application creation failed');
      logger.error((error as Error).message);
      process.exit(1);
    }
  }

  private showCreateHeader(): void {
    const header = boxen(
      chalk.cyan.bold('🚀 Create New Application\n') +
      chalk.gray('Fill in the details to create your application'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    );
    
    console.log(header);
  }

  private async promptForOptions(): Promise<AppCreateOptions> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter app name:',
        validate: (input: string) => {
          if (!input.trim()) return 'App name is required';
          if (input.length < 3) return 'App name must be at least 3 characters';
          return true;
        }
      },
      {
        type: 'list',
        name: 'platform',
        message: 'Please select a platform:',
        choices: [
          { name: 'Node.js', value: 'node' },
          { name: 'Laravel', value: 'laravel' },
          { name: 'PHP', value: 'php' },
          { name: 'Python', value: 'python' },
          { name: 'Django', value: 'django' },
          { name: 'Flask', value: 'flask' },
          { name: '.NET', value: 'dotnet' },
          { name: 'Go', value: 'go' },
          { name: 'Ruby', value: 'ruby' },
          { name: 'Java', value: 'java' },
          { name: 'JavaScript', value: 'js' },
          { name: 'TypeScript', value: 'ts' },
          { name: 'ASP.NET', value: 'asp' },
          { name: 'WordPress', value: 'wordpress' },
          { name: 'Koyline', value: 'koyline' },
          { name: 'C#', value: 'csharp' }
        ]
      },
      {
        type: 'list',
        name: 'appType',
        message: 'Select application type:',
        choices: [
          { name: 'Private API', value: 'private' },
          { name: 'Public API', value: 'public' }
        ]
      },
      {
        type: 'list',
        name: 'sourceType',
        message: 'Source code handling:',
        choices: [
          { name: 'GitHub repository', value: 'github' },
          { name: 'Upload source code', value: 'upload' },
          { name: 'I will provide later', value: 'none' }
        ]
      },
      {
        type: 'input',
        name: 'githubUrl',
        message: 'GitHub repository URL:',
        when: (answers: any) => answers.sourceType === 'github',
        validate: (input: string) => {
          if (!input.trim()) return 'GitHub URL is required';
          if (!input.includes('github.com')) return 'Please enter a valid GitHub URL';
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email for final source code delivery:',
        when: (answers: any) => answers.sourceType === 'upload',
        validate: (input: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input)) return 'Please enter a valid email address';
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Application description:',
        validate: (input: string) => {
          if (!input.trim()) return 'Description is required';
          if (input.length < 10) return 'Description must be at least 10 characters';
          return true;
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Application version:',
        default: '1.0.0',
        validate: (input: string) => {
          const versionRegex = /^\d+\.\d+\.\d+$/;
          if (!versionRegex.test(input)) return 'Please use semantic versioning (e.g., 1.0.0)';
          return true;
        }
      },
      {
        type: 'list',
        name: 'database',
        message: 'Select database type (optional):',
        choices: [
          { name: 'MySQL', value: 'mysql' },
          { name: 'PostgreSQL', value: 'postgresql' },
          { name: 'MongoDB', value: 'mongodb' },
          { name: 'SQLite', value: 'sqlite' },
          { name: 'Redis', value: 'redis' },
          { name: 'Custom database', value: 'custom' },
          { name: 'Skip database setup', value: 'none' }
        ]
      },
      {
        type: 'confirm',
        name: 'createConfigFile',
        message: 'Create kavoous.json configuration file?',
        default: true
      }
    ]);

    return answers as AppCreateOptions;
  }

  private async validateOptions(options: AppCreateOptions): Promise<void> {
    // Additional validation logic
    if (options.sourceType === 'github' && !options.githubUrl) {
      throw new Error('GitHub URL is required for GitHub source type');
    }
    
    if (options.sourceType === 'upload' && !options.email) {
      throw new Error('Email is required for source code upload');
    }
  }

  private async createConfigFile(options: AppCreateOptions): Promise<void> {
    const config: KavoousConfig = {
      platform: options.platform,
      name: options.name,
      version: options.version,
      type: options.appType,
      database: options.database === 'none' ? undefined : options.database,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      configVersion: '1.0.0'
    };

    const configPath = path.join(process.cwd(), 'kavoous.json');
    const configJson = JSON.stringify(config, null, 2);
    
    await fs.writeFile(configPath, configJson, 'utf8');
    
    console.log(chalk.green(`\n📁 Created kavoous.json at ${configPath}`));
    console.log(chalk.gray(configJson));
  }

  private async saveApplication(): Promise<void> {
    // Simulate API call to save application
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would call an API
    console.log(chalk.gray('\n📡 Saving application configuration...'));
  }

  private showSuccessMessage(options: AppCreateOptions): void {
    const message = boxen(
      chalk.green.bold('✅ Application Created Successfully!\n\n') +
      chalk.cyan('📝 Application Details:\n') +
      chalk.white(`   Name: ${options.name}\n`) +
      chalk.white(`   Platform: ${options.platform}\n`) +
      chalk.white(`   Type: ${options.appType}\n`) +
      chalk.white(`   Version: ${options.version}\n`) +
      (options.database && options.database !== 'none' 
        ? chalk.white(`   Database: ${options.database}\n`) 
        : '') +
      chalk.white(`   Source: ${options.sourceType}\n\n`) +
      chalk.yellow('🚀 Next Steps:\n') +
      chalk.gray('   1. Run ') + chalk.cyan('kavoous apps list') + chalk.gray(' to see your app\n') +
      chalk.gray('   2. Run ') + chalk.cyan('kavoous apps start <id>') + chalk.gray(' to start\n') +
      chalk.gray('   3. Run ') + chalk.cyan('kavoous apps logs <id>') + chalk.gray(' to view logs'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    );
    
    console.log(message);
  }
}