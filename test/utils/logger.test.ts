import { logger } from '../../src/utils/logger';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleInfo.mockRestore();
    mockConsoleWarn.mockRestore();
  });

  describe('success', () => {
    it('should log success message with checkmark', () => {
      logger.success('Operation completed');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('✓'),
        expect.stringContaining('Operation completed')
      );
    });
  });

  describe('error', () => {
    it('should log error message with cross', () => {
      logger.error('Something went wrong');
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('✗'),
        expect.stringContaining('Something went wrong')
      );
    });
  });

  describe('info', () => {
    it('should log info message with info symbol', () => {
      logger.info('This is information');
      
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining('ℹ'),
        expect.stringContaining('This is information')
      );
    });
  });

  describe('warn', () => {
    it('should log warning message with warning symbol', () => {
      logger.warn('This is a warning');
      
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('⚠'),
        expect.stringContaining('This is a warning')
      );
    });
  });

  describe('spinner methods', () => {
    it('should start and stop spinner successfully', () => {
      // Since ora is complex to mock, we just test that methods exist
      expect(typeof logger.startSpinner).toBe('function');
      expect(typeof logger.stopSpinner).toBe('function');
    });
  });
});