import { jest } from '@jest/globals';

// Mock console methods
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn()
} as any;

// Mock process.exit
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process.exit(${code})`);
});

// Cleanup after tests
afterAll(() => {
  mockExit.mockRestore();
});