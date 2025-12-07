export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Application {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'rejected' | 'draft';
  lastUpdated: Date;
  version: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface CommandOptions {
  debug?: boolean;
  json?: boolean;
  quiet?: boolean;
}

export interface Config {
  theme: 'light' | 'dark' | 'auto';
  apiEndpoint: string;
  defaultFormat: 'table' | 'json' | 'yaml';
}