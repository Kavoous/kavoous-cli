import { Command } from 'commander';
import { AppsCommand } from '../../src/commands/apps.command';
import { AppService } from '../../src/services/app.service';

// Mock dependencies
jest.mock('../../src/services/app.service');
jest.mock('../../src/utils/logger');
jest.mock('chalk', () => ({
  green: jest.fn((text) => `green(${text})`),
  red: jest.fn((text) => `red(${text})`),
  yellow: jest.fn((text) => `yellow(${text})`),
  gray: jest.fn((text) => `gray(${text})`),
  cyan: jest.fn((text) => `cyan(${text})`)
}));

const MockAppService = AppService as jest.MockedClass<typeof AppService>;

describe('AppsCommand', () => {
  let appsCommand: AppsCommand;
  let mockAppService: jest.Mocked<AppService>;
  let program: Command;

  beforeEach(() => {
    mockAppService = {
      listApps: jest.fn().mockResolvedValue([
        {
          id: 'app-001',
          name: 'Test App',
          status: 'active',
          lastUpdated: new Date('2024-01-15'),
          version: '1.0.0'
        }
      ]),
      getApp: jest.fn().mockResolvedValue({
        id: 'app-001',
        name: 'Test App',
        status: 'active',
        lastUpdated: new Date('2024-01-15'),
        version: '1.0.0'
      })
    } as any;
    
    MockAppService.mockImplementation(() => mockAppService);
    
    appsCommand = new AppsCommand();
    program = new Command();
    
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('register', () => {
    it('should register apps commands', () => {
      appsCommand.register(program);
      
      const commands = program.commands[0].commands;
      expect(commands).toHaveLength(2);
      
      const commandNames = commands.map(cmd => cmd.name());
      expect(commandNames).toContain('list');
      expect(commandNames).toContain('view');
    });
  });

  describe('list action', () => {
    it('should call appService.listApps and display results', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await appsCommand.list({});
      
      jest.advanceTimersByTime(1000);
      
      expect(mockAppService.listApps).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Your Applications')
      );
      
      consoleSpy.mockRestore();
    });

    it('should output JSON when json option is true', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await appsCommand.list({ json: true });
      
      jest.advanceTimersByTime(1000);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('app-001')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Test App')
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('view action', () => {
    it('should call appService.getApp and display details', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await appsCommand.view('app-001');
      
      jest.advanceTimersByTime(500);
      
      expect(mockAppService.getApp).toHaveBeenCalledWith('app-001');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Application Details')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ID:')
      );
      
      consoleSpy.mockRestore();
    });
  });
});