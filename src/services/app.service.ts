import { Application } from '../types';
import { logger } from '../utils/logger';

export class AppService {
  private mockApplications: Application[] = [
    {
      id: 'app-001',
      name: 'E-commerce Platform',
      status: 'active',
      lastUpdated: new Date('2024-01-15'),
      version: '2.5.1'
    },
    {
      id: 'app-002',
      name: 'Mobile Banking App',
      status: 'pending',
      lastUpdated: new Date('2024-01-14'),
      version: '1.0.0'
    },
    {
      id: 'app-003',
      name: 'Analytics Dashboard',
      status: 'rejected',
      lastUpdated: new Date('2024-01-13'),
      version: '3.2.0'
    },
    {
      id: 'app-004',
      name: 'Social Media Tool',
      status: 'draft',
      lastUpdated: new Date('2024-01-12'),
      version: '0.9.0'
    }
  ];

  async listApps(): Promise<Application[]> {
    logger.startSpinner('Fetching applications...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logger.stopSpinner(true, 'Applications loaded');
    return this.mockApplications;
  }

  async getApp(id: string): Promise<Application | null> {
    logger.startSpinner(`Fetching application ${id}...`);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const app = this.mockApplications.find(a => a.id === id);
    
    if (app) {
      logger.stopSpinner(true, 'Application found');
    } else {
      logger.stopSpinner(false, 'Application not found');
    }
    
    return app || null;
  }
}