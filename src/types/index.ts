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

export interface AppCreateOptions {
  name: string;
  platform: PlatformType;
  appType: AppType;
  sourceType: SourceType;
  githubUrl?: string;
  email?: string;
  description: string;
  version: string;
  database?: DatabaseType;
  createConfigFile: boolean;
}

export type PlatformType = 
  | 'node' | 'laravel' | 'php' | 'python' | 'django' | 'flask' 
  | 'dotnet' | 'go' | 'ruby' | 'java' | 'js' | 'ts' 
  | 'asp' | 'wordpress' | 'koyline' | 'csharp';

export type AppType = 'private' | 'public';
export type SourceType = 'github' | 'upload' | 'none';
export type DatabaseType = 
  | 'mysql' | 'postgresql' | 'mongodb' | 'sqlite' 
  | 'redis' | 'none' | 'custom';

export interface KavoousConfig {
  platform: PlatformType;
  name: string;
  version: string;
  type: AppType;
  database?: DatabaseType;
  createdAt: string;
  updatedAt: string;
  configVersion: string;
}