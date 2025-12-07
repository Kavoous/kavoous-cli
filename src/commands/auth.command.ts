import { Command } from 'commander';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

export class AuthCommand {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register(program: Command): void {
    const auth = program.command('auth');
    
    auth
      .command('login')
      .description('Login to Kavous CLI')
      .action(() => this.login());
    
    auth
      .command('logout')
      .description('Logout from Kavous CLI')
      .action(() => this.logout());
    
    auth
      .command('status')
      .description('Check authentication status')
      .action(() => this.status());
  }

  private async login(): Promise<void> {
    try {
      await this.authService.login();
    } catch (error) {
      logger.error('Login failed: ' + (error as Error).message);
      process.exit(1);
    }
  }

  private logout(): void {
    this.authService.logout();
  }

  private status(): void {
    const user = this.authService.getUser();
    
    if (user) {
      console.log('\n🔐 Authentication Status: ACTIVE');
      console.log(`👤 User: ${user.name}`);
      console.log(`📧 Email: ${user.email}`);
    } else {
      console.log('\n🔐 Authentication Status: NOT LOGGED IN');
      console.log('Run `kavoous auth login` to authenticate');
    }
  }
}