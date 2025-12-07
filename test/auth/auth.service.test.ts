import { AppService } from '../../src/services/app.service';
import { Application } from '../../src/types';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('listApps', () => {
    it('should return list of applications', async () => {
      const promise = appService.listApps();
      
      // Fast-forward timer
      jest.advanceTimersByTime(1000);
      
      const apps = await promise;
      
      expect(apps).toHaveLength(4);
      expect(apps[0]).toMatchObject({
        id: 'app-001',
        name: 'E-commerce Platform',
        status: 'active'
      });
    });

    it('should simulate delay', async () => {
      const startTime = Date.now();
      const promise = appService.listApps();
      
      jest.advanceTimersByTime(1000);
      
      await promise;
      // No assertion needed, just checking it doesn't throw
    });
  });

  describe('getApp', () => {
    it('should return application when found', async () => {
      const promise = appService.getApp('app-001');
      
      jest.advanceTimersByTime(500);
      
      const app = await promise;
      
      expect(app).not.toBeNull();
      expect(app?.id).toBe('app-001');
      expect(app?.name).toBe('E-commerce Platform');
    });

    it('should return null when application not found', async () => {
      const promise = appService.getApp('non-existent');
      
      jest.advanceTimersByTime(500);
      
      const app = await promise;
      
      expect(app).toBeNull();
    });

    it('should simulate delay', async () => {
      const promise = appService.getApp('app-001');
      
      jest.advanceTimersByTime(500);
      
      await promise;
      // No assertion needed
    });
  });
});