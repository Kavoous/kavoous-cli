import { User, Application, AuthResponse } from '../../src/types';

export const mockUser: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://example.com/avatar.jpg'
};

export const mockAuthResponse: AuthResponse = {
  token: 'mock-jwt-token',
  user: mockUser,
  expiresIn: 3600
};

export const mockApplications: Application[] = [
  {
    id: 'app-001',
    name: 'Test App 1',
    status: 'active',
    lastUpdated: new Date('2024-01-15'),
    version: '1.0.0'
  },
  {
    id: 'app-002',
    name: 'Test App 2',
    status: 'pending',
    lastUpdated: new Date('2024-01-14'),
    version: '2.0.0'
  }
];