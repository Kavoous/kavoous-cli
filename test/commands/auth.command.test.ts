import { Command } from 'commander';
import { AuthCommand } from '../../src/commands/auth.command';
import { AuthService } from '../../src/services/auth.service';

// Mock dependencies
jest.mock('../../src/services/auth.service');
jest.mock('../../src/utils/logger');

const MockAuthService = AuthService as jest.MockedClass<typeof AuthService>;

describe('AuthCommand', () => {
  let authCommand: AuthCommand;
  let mockAuthService: jest.Mocked<AuthService>;
  let program: Command;

  beforeEach(() => {
    mockAuthService = {
      login: jest.fn().mockResolvedValue(undefined),
      logout: jest.fn(),
      getUser: jest.fn(),
      getToken: jest.fn(),
      isAuthenticated: jest.fn()
    } as any;
    
    MockAuthService.mockImplementation(() => mockAuthService);
    
    authCommand = new AuthCommand();
    program = new Command();
    
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register auth commands', () => {
      authCommand.register(program);
      
      const commands = program.commands[0].commands;
      expect(commands).toHaveLength(3);
      
      const commandNames = commands.map(cmd => cmd.name());
      expect(commandNames).toContain('login');
      expect(commandNames).toContain('logout');
      expect(commandNames).toContain('status');
    });
  });

  describe('login action', () => {
    it('should call authService.login', async () => {
      await authCommand.login();
      
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout action', () => {
    it('should call authService.logout', () => {
      authCommand.logout();
      
      expect(mockAuthService.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('status action', () => {
    it('should show user info when authenticated', () => {
      const mockUser = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com'
      };
      
      mockAuthService.getUser.mockReturnValue(mockUser);
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      authCommand.status();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Authentication Status: ACTIVE')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('User: Test User')
      );
      
      consoleSpy.mockRestore();
    });

    it('should show not logged in message', () => {
      mockAuthService.getUser.mockReturnValue(null);
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      authCommand.status();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('NOT LOGGED IN')
      );
      
      consoleSpy.mockRestore();
    });
  });
});