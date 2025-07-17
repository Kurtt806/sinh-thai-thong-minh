import ApiService from './api';

export class DashboardService {
  // Get dashboard stats
  static async getDashboardStats() {
    try {
      return await ApiService.get('/dashboard/stats');
    } catch (error) {
      // Mock data for development
      return {
        success: true,
        data: {
          totalServers: 12,
          activeConnections: 1234,
          cpuUsage: 68,
          memoryUsage: 45,
          trends: {
            servers: '+2.5%',
            connections: '+12.3%',
            cpu: '-3.2%',
            memory: '+5.1%'
          }
        }
      };
    }
  }

  // Get recent activities
  static async getRecentActivities() {
    try {
      return await ApiService.get('/dashboard/activities');
    } catch (error) {
      // Mock data for development
      return {
        success: true,
        data: [
          {
            id: 1,
            type: 'server_restart',
            message: 'Web Server 01 restarted',
            timestamp: '2 minutes ago',
            severity: 'info',
          },
          {
            id: 2,
            type: 'high_cpu',
            message: 'API Server CPU usage exceeded 80%',
            timestamp: '15 minutes ago',
            severity: 'warning',
          },
          {
            id: 3,
            type: 'server_offline',
            message: 'Cache Server went offline',
            timestamp: '1 hour ago',
            severity: 'error',
          },
          {
            id: 4,
            type: 'backup_complete',
            message: 'Database backup completed successfully',
            timestamp: '3 hours ago',
            severity: 'success',
          },
        ]
      };
    }
  }

  // Execute quick action
  static async executeQuickAction(actionId) {
    try {
      return await ApiService.post(`/dashboard/actions/${actionId}`);
    } catch (error) {
      console.error('Error executing action:', error);
      throw error;
    }
  }
}
