import api from './api.js';

// Authentication Service
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.success && response.data.token) {
        api.setAuthToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.success && response.data.token) {
        api.setAuthToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
      api.setAuthToken(null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear token anyway
      api.setAuthToken(null);
      throw error;
    }
  },

  // Get user profile
  async getProfile() {
    try {
      return await api.get('/auth/profile');
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      return await api.put('/auth/profile', profileData);
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!api.loadToken();
  },

  // Initialize auth service
  init() {
    api.loadToken();
  }
};

// Tank Management Service
export const tankService = {
  // Get all tanks
  async getTanks() {
    try {
      return await api.get('/tanks');
    } catch (error) {
      console.error('Get tanks failed:', error);
      throw error;
    }
  },

  // Get tank by ID
  async getTank(id) {
    try {
      return await api.get(`/tanks/${id}`);
    } catch (error) {
      console.error('Get tank failed:', error);
      throw error;
    }
  },

  // Create new tank
  async createTank(tankData) {
    try {
      return await api.post('/tanks', tankData);
    } catch (error) {
      console.error('Create tank failed:', error);
      throw error;
    }
  },

  // Update tank
  async updateTank(id, tankData) {
    try {
      return await api.put(`/tanks/${id}`, tankData);
    } catch (error) {
      console.error('Update tank failed:', error);
      throw error;
    }
  },

  // Delete tank
  async deleteTank(id) {
    try {
      return await api.delete(`/tanks/${id}`);
    } catch (error) {
      console.error('Delete tank failed:', error);
      throw error;
    }
  }
};

// Animal Management Service
export const animalService = {
  // Get all animals
  async getAnimals() {
    try {
      return await api.get('/animals');
    } catch (error) {
      console.error('Get animals failed:', error);
      throw error;
    }
  },

  // Get animals by tank
  async getAnimalsByTank(tankId) {
    try {
      return await api.get(`/animals?tankId=${tankId}`);
    } catch (error) {
      console.error('Get animals by tank failed:', error);
      throw error;
    }
  },

  // Get animal by ID
  async getAnimal(id) {
    try {
      return await api.get(`/animals/${id}`);
    } catch (error) {
      console.error('Get animal failed:', error);
      throw error;
    }
  },

  // Create new animal
  async createAnimal(animalData) {
    try {
      return await api.post('/animals', animalData);
    } catch (error) {
      console.error('Create animal failed:', error);
      throw error;
    }
  },

  // Update animal
  async updateAnimal(id, animalData) {
    try {
      return await api.put(`/animals/${id}`, animalData);
    } catch (error) {
      console.error('Update animal failed:', error);
      throw error;
    }
  },

  // Delete animal
  async deleteAnimal(id) {
    try {
      return await api.delete(`/animals/${id}`);
    } catch (error) {
      console.error('Delete animal failed:', error);
      throw error;
    }
  }
};

// Sensor Data Service
export const sensorService = {
  // Get sensor data
  async getSensorData(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/sensors/data?${queryString}`);
    } catch (error) {
      console.error('Get sensor data failed:', error);
      throw error;
    }
  },

  // Get latest sensor data for tank
  async getLatestData(tankId) {
    try {
      return await api.get(`/sensors/latest/${tankId}`);
    } catch (error) {
      console.error('Get latest sensor data failed:', error);
      throw error;
    }
  },

  // Get sensor data in range
  async getDataInRange(tankId, startDate, endDate) {
    try {
      return await api.get(`/sensors/range?tankId=${tankId}&startDate=${startDate}&endDate=${endDate}`);
    } catch (error) {
      console.error('Get sensor data range failed:', error);
      throw error;
    }
  },

  // Send sensor data (for simulation)
  async sendSensorData(sensorData) {
    try {
      return await api.post('/sensors/data', sensorData);
    } catch (error) {
      console.error('Send sensor data failed:', error);
      throw error;
    }
  }
};

// Schedule Management Service
export const scheduleService = {
  // Get all schedules
  async getSchedules() {
    try {
      return await api.get('/schedules');
    } catch (error) {
      console.error('Get schedules failed:', error);
      throw error;
    }
  },

  // Get schedule by ID
  async getSchedule(id) {
    try {
      return await api.get(`/schedules/${id}`);
    } catch (error) {
      console.error('Get schedule failed:', error);
      throw error;
    }
  },

  // Create new schedule
  async createSchedule(scheduleData) {
    try {
      return await api.post('/schedules', scheduleData);
    } catch (error) {
      console.error('Create schedule failed:', error);
      throw error;
    }
  },

  // Update schedule
  async updateSchedule(id, scheduleData) {
    try {
      return await api.put(`/schedules/${id}`, scheduleData);
    } catch (error) {
      console.error('Update schedule failed:', error);
      throw error;
    }
  },

  // Delete schedule
  async deleteSchedule(id) {
    try {
      return await api.delete(`/schedules/${id}`);
    } catch (error) {
      console.error('Delete schedule failed:', error);
      throw error;
    }
  }
};

// Health Check Service
export const healthService = {
  // Check server health
  async checkHealth() {
    try {
      const response = await fetch('http://localhost:5000/health');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Get API info
  async getApiInfo() {
    try {
      const response = await fetch('http://localhost:5000/api');
      return await response.json();
    } catch (error) {
      console.error('Get API info failed:', error);
      throw error;
    }
  }
};
