import { Application } from '../types';
import { logger } from '../utils/logger';

export class AppService {
  private mockApplications: Application[] = [
    {
      id: 'app-005',
      name: 'E-commerce API',
      status: 'active',
      lastUpdated: new Date('2024-01-16'),
      version: '2.1.0'
    },
    {
      id: 'app-006',
      name: 'Auth Service',
      status: 'active',
      lastUpdated: new Date('2024-01-15'),
      version: '1.5.2'
    },
    {
      id: 'app-007',
      name: 'Notification System',
      status: 'pending',
      lastUpdated: new Date('2024-01-14'),
      version: '0.8.0'
    },
    {
      id: 'app-008',
      name: 'Payment Gateway',
      status: 'active',
      lastUpdated: new Date('2024-01-12'),
      version: '3.0.1'
    },
    {
      id: 'app-010',
      name: 'Analytics Dashboard',
      status: 'active',
      lastUpdated: new Date('2024-01-10'),
      version: '4.4.3'
    },
    {
      id: 'app-011',
      name: 'Search Engine Service',
      status: 'pending',
      lastUpdated: new Date('2024-01-09'),
      version: '0.9.5'
    },
    {
      id: 'app-012',
      name: 'CRM Core',
      status: 'active',
      lastUpdated: new Date('2024-01-08'),
      version: '2.7.0'
    },
    {
      id: 'app-013',
      name: 'File Storage Service',
      status: 'active',
      lastUpdated: new Date('2024-01-07'),
      version: '1.3.9'
    },
    {
      id: 'app-015',
      name: 'Chat Support System',
      status: 'active',
      lastUpdated: new Date('2024-01-06'),
      version: '1.9.4'
    },
    {
      id: 'app-016',
      name: 'Inventory Manager',
      status: 'pending',
      lastUpdated: new Date('2024-01-05'),
      version: '0.7.2'
    },
    {
      id: 'app-017',
      name: 'Subscription Billing',
      status: 'active',
      lastUpdated: new Date('2024-01-04'),
      version: '3.2.1'
    },
    {
      id: 'app-018',
      name: 'Monitoring Service',
      status: 'active',
      lastUpdated: new Date('2024-01-03'),
      version: '5.0.0'
    },
    {
      id: 'app-020',
      name: 'Recommendation System',
      status: 'pending',
      lastUpdated: new Date('2024-01-02'),
      version: '0.6.8'
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