import ApiService from './api';

export class ServerService {
  // Get all servers
  static async getServers() {
    try {
      return await ApiService.get('/servers');
    } catch (error) {
      // Mock data for development
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Web Server 01',
            ip: '192.168.1.10',
            status: 'online',
            cpu: 45,
            memory: 62,
            disk: 78,
            uptime: '15d 4h 23m',
            location: 'Data Center A',
          },
          {
            id: 2,
            name: 'Database Server',
            ip: '192.168.1.11',
            status: 'online',
            cpu: 32,
            memory: 78,
            disk: 45,
            uptime: '23d 12h 45m',
            location: 'Data Center A',
          },
          {
            id: 3,
            name: 'API Server',
            ip: '192.168.1.12',
            status: 'warning',
            cpu: 78,
            memory: 85,
            disk: 92,
            uptime: '8d 2h 15m',
            location: 'Data Center B',
          },
          {
            id: 4,
            name: 'Cache Server',
            ip: '192.168.1.13',
            status: 'offline',
            cpu: 0,
            memory: 0,
            disk: 0,
            uptime: '0d 0h 0m',
            location: 'Data Center B',
          },
        ]
      };
    }
  }

  // Get server by ID
  static async getServerById(id) {
    try {
      return await ApiService.get(`/servers/${id}`);
    } catch (error) {
      console.error('Error fetching server:', error);
      throw error;
    }
  }

  // Restart server
  static async restartServer(id) {
    try {
      return await ApiService.post(`/servers/${id}/restart`);
    } catch (error) {
      console.error('Error restarting server:', error);
      throw error;
    }
  }

  // Update server
  static async updateServer(id, data) {
    try {
      return await ApiService.put(`/servers/${id}`, data);
    } catch (error) {
      console.error('Error updating server:', error);
      throw error;
    }
  }

  // Delete server
  static async deleteServer(id) {
    try {
      return await ApiService.delete(`/servers/${id}`);
    } catch (error) {
      console.error('Error deleting server:', error);
      throw error;
    }
  }
}
