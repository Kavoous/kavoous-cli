import open from 'open';
import axios from 'axios';
import Configstore from 'configstore';
import { AuthResponse, User } from '../types';
import { API_CONFIG, CONFIG_KEYS } from '../constants';
import { logger } from '../utils/logger';

export class AuthService {
  private config: Configstore;

  constructor() {
    this.config = new Configstore('kavoous-cli');
  }

  async login(): Promise<void> {
    logger.startSpinner('Opening browser for authentication...');
    
    try {
      // Simulate OAuth flow
      const authUrl = `${API_CONFIG.AUTH_URL}/authorize`;
      await open(authUrl);
      
      // Simulate callback and token exchange
      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'user-123',
          email: 'user@example.com',
          name: 'Test User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test'
        },
        expiresIn: 3600
      };

      this.saveToken(mockResponse);
      logger.stopSpinner(true, 'Login successful!');
      this.printUserInfo(mockResponse.user);
    } catch (error) {
      logger.stopSpinner(false, 'Login failed');
      throw error;
    }
  }

  logout(): void {
    this.config.delete(CONFIG_KEYS.TOKEN);
    this.config.delete(CONFIG_KEYS.USER);
    logger.success('Logged out successfully');
  }

  getToken(): string | null {
    return this.config.get(CONFIG_KEYS.TOKEN);
  }

  getUser(): User | null {
    return this.config.get(CONFIG_KEYS.USER);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveToken(auth: AuthResponse): void {
    this.config.set(CONFIG_KEYS.TOKEN, auth.token);
    this.config.set(CONFIG_KEYS.USER, auth.user);
  }

  private printUserInfo(user: User): void {
    console.log(`\nWelcome, ${user.name}!`);
    console.log(`Email: ${user.email}`);
  }
}