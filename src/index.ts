#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import { ASCII_ART, COLORS } from './constants';
import { AuthCommand } from './commands/auth.command';
import { AppsCommand } from './commands/apps.command';
import { FilesCommand } from './commands/files.command';

class KavousCLI {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupProgram();
    this.registerCommands();
  }

  private setupProgram(): void {
    this.program
      .name('kavoous')
      .description('Beautiful CLI for managing applications with Kavous')
      .version('1.0.0')
      .hook('preAction', () => this.showBanner());
  }

  private showBanner(): void {
    console.log(chalk.hex(COLORS.primary)(ASCII_ART));
    
    // Optional: Show ASCII art with figlet
    if (Math.random() > 0.5) {
      console.log(
        chalk.hex(COLORS.secondary)(
          figlet.textSync('KAVOOUS', {
            font: 'Small',
            horizontalLayout: 'default'
          })
        )
      );
    }
    
    console.log();
  }

  private registerCommands(): void {
    // Register all commands
    new AuthCommand().register(this.program);
    new AppsCommand().register(this.program);
    new FilesCommand().register(this.program);
    
    // Default command (show help)
    this.program.action(() => {
      this.program.help();
    });
  }

  async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}

// Run the CLI
const cli = new KavousCLI();
cli.run().catch(error => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});