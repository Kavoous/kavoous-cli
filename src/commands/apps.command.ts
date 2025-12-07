import { Command } from 'commander';
import { AppsListCommand } from './apps-list.command';
import { AppsViewCommand } from './apps-view.command';
import { CreateCommand } from './create.command';
import { DeleteCommand } from './delete.command';
import { StartCommand } from './start.command';
import { StopCommand } from './stop.command';
import { LogsCommand } from './logs.command';

export class AppsCommand {
  private appsListCommand: AppsListCommand;
  private appsViewCommand: AppsViewCommand;
  private createCommand: CreateCommand;
  private deleteCommand: DeleteCommand;
  private startCommand: StartCommand;
  private stopCommand: StopCommand;
  private logsCommand: LogsCommand;

  constructor() {
    this.appsListCommand = new AppsListCommand();
    this.appsViewCommand = new AppsViewCommand();
    this.createCommand = new CreateCommand();
    this.deleteCommand = new DeleteCommand();
    this.startCommand = new StartCommand();
    this.stopCommand = new StopCommand();
    this.logsCommand = new LogsCommand();
  }

  register(program: Command): void {
    const apps = program.command('apps');
    
    // Register all subcommands
    this.appsListCommand.register(apps);
    this.appsViewCommand.register(apps);
    this.createCommand.register(apps);
    this.deleteCommand.register(apps);
    this.startCommand.register(apps);
    this.stopCommand.register(apps);
    this.logsCommand.register(apps);
  }
}