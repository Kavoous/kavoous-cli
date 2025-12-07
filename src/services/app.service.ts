import { Application } from '../types';
import { logger } from '../utils/logger';

export class AppService {
  private mockApplications: Application[] = [
    {
      id: 'app-9a1f3b72-2b4c-4b8e-9d34-1c2e5f7a91d1',
      name: 'Instagram Shop Manager',
      status: 'active',
      lastUpdated: new Date('2024-01-16'),
      version: '2.3.0'
    },
    {
      id: 'app-c4f8d9a1-3e6b-4b52-8e7a-91f4f1a2b8c3',
      name: 'Auto DM Order Bot',
      status: 'active',
      lastUpdated: new Date('2024-01-15'),
      version: '1.8.1'
    },
    {
      id: 'app-f1d27b89-0e12-4e91-a2b6-3b71d5c9a811',
      name: 'Instagram Comment Sales Trigger',
      status: 'pending',
      lastUpdated: new Date('2024-01-14'),
      version: '0.9.0'
    },
    {
      id: 'app-5b8d2f2a-9a4e-41c9-b21a-fad127b6a911',
      name: 'Online Store Core SaaS',
      status: 'active',
      lastUpdated: new Date('2024-01-13'),
      version: '3.1.2'
    },
    {
      id: 'app-71a29fbc-1c9a-4b91-8b21-6d32e1bfa441',
      name: 'Product Inventory SaaS',
      status: 'active',
      lastUpdated: new Date('2024-01-12'),
      version: '2.0.5'
    },
    {
      id: 'app-2c91fba7-12ef-4ab1-91d8-7e1b92c3f112',
      name: 'Instagram Order Sync',
      status: 'pending',
      lastUpdated: new Date('2024-01-11'),
      version: '0.8.4'
    },
    {
      id: 'app-d91a2cb1-cc28-4a52-98f2-7e49b32ad221',
      name: 'Smart Payment Gateway',
      status: 'active',
      lastUpdated: new Date('2024-01-10'),
      version: '4.0.0'
    },
    {
      id: 'app-18f4bc22-cf72-4c01-9c66-3e91c129a113',
      name: 'Customer CRM SaaS',
      status: 'active',
      lastUpdated: new Date('2024-01-09'),
      version: '2.6.3'
    },
    {
      id: 'app-c2b9a0e3-df91-4b0e-9d2a-ef71a312b023',
      name: 'Instagram Sales Analytics',
      status: 'active',
      lastUpdated: new Date('2024-01-08'),
      version: '1.4.7'
    },
    {
      id: 'app-9a23f11e-1b71-44a0-97f2-13cbb21df091',
      name: 'Auto Invoice Generator',
      status: 'draft',
      lastUpdated: new Date('2024-01-07'),
      version: '0.6.1'
    },
    {
      id: 'app-e91fa21b-b812-4f12-85b2-28d91fcb4421',
      name: 'Instagram Shipping Tracker',
      status: 'active',
      lastUpdated: new Date('2024-01-06'),
      version: '1.2.9'
    },
    {
      id: 'app-b91d72fa-3a1d-4bf9-8a7d-1f92b1caa141',
      name: 'Discount & Campaign Manager',
      status: 'pending',
      lastUpdated: new Date('2024-01-05'),
      version: '0.7.8'
    },
    {
      id: 'app-2fa9c31b-22d1-4a10-9d91-81c91abfa119',
      name: 'Multi Store SaaS Panel',
      status: 'active',
      lastUpdated: new Date('2024-01-04'),
      version: '3.4.1'
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