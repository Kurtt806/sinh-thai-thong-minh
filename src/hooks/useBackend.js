import { useState, useEffect, useCallback } from 'react';
import { 
  authService, 
  tankService, 
  animalService, 
  sensorService, 
  scheduleService,
  healthService 
} from '../services/backendServices.js';
import webSocketService from '../services/webSocketService.js';

// Auth Hook
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize auth service and check if user is authenticated
    authService.init();
    
    if (authService.isAuthenticated()) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setError(error.message);
      // If profile load fails, clear auth
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.data.user);
        return response;
      }
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setError(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await authService.updateProfile(profileData);
      if (response.success) {
        setUser(response.data);
        return response;
      }
      throw new Error(response.message || 'Update failed');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};

// Tank Management Hook
export const useTanks = () => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTanks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tankService.getTanks();
      if (response.success) {
        setTanks(response.data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Failed to load tanks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTank = async (tankData) => {
    try {
      const response = await tankService.createTank(tankData);
      if (response.success) {
        await loadTanks(); // Reload tanks
        return response;
      }
      throw new Error(response.message || 'Create failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateTank = async (id, tankData) => {
    try {
      const response = await tankService.updateTank(id, tankData);
      if (response.success) {
        await loadTanks(); // Reload tanks
        return response;
      }
      throw new Error(response.message || 'Update failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteTank = async (id) => {
    try {
      const response = await tankService.deleteTank(id);
      if (response.success) {
        await loadTanks(); // Reload tanks
        return response;
      }
      throw new Error(response.message || 'Delete failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    loadTanks();
  }, [loadTanks]);

  return {
    tanks,
    loading,
    error,
    loadTanks,
    createTank,
    updateTank,
    deleteTank
  };
};

// Animals Management Hook
export const useAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAnimals = useCallback(async (tankId = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = tankId 
        ? await animalService.getAnimalsByTank(tankId)
        : await animalService.getAnimals();
      
      if (response.success) {
        setAnimals(response.data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Failed to load animals:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAnimal = async (animalData) => {
    try {
      const response = await animalService.createAnimal(animalData);
      if (response.success) {
        await loadAnimals(); // Reload animals
        return response;
      }
      throw new Error(response.message || 'Create failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateAnimal = async (id, animalData) => {
    try {
      const response = await animalService.updateAnimal(id, animalData);
      if (response.success) {
        await loadAnimals(); // Reload animals
        return response;
      }
      throw new Error(response.message || 'Update failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteAnimal = async (id) => {
    try {
      const response = await animalService.deleteAnimal(id);
      if (response.success) {
        await loadAnimals(); // Reload animals
        return response;
      }
      throw new Error(response.message || 'Delete failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    animals,
    loading,
    error,
    loadAnimals,
    createAnimal,
    updateAnimal,
    deleteAnimal
  };
};

// Sensor Data Hook
export const useSensorData = (tankId) => {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSensorData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sensorService.getSensorData(params);
      if (response.success) {
        setSensorData(response.data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Failed to load sensor data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLatestData = useCallback(async (tankId) => {
    if (!tankId) return;
    
    try {
      const response = await sensorService.getLatestData(tankId);
      if (response.success) {
        setLatestData(response.data);
      }
    } catch (error) {
      console.error('Failed to load latest sensor data:', error);
    }
  }, []);

  const sendSensorData = async (data) => {
    try {
      const response = await sensorService.sendSensorData(data);
      if (response.success) {
        await loadLatestData(data.tankId);
        return response;
      }
      throw new Error(response.message || 'Send failed');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (tankId) {
      loadLatestData(tankId);
    }
  }, [tankId, loadLatestData]);

  return {
    sensorData,
    latestData,
    loading,
    error,
    loadSensorData,
    loadLatestData,
    sendSensorData
  };
};

// WebSocket Hook
export const useWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    webSocketService.connect();

    // Listen for connection status changes
    const handleConnectionStatus = (status) => {
      setConnected(status.connected);
      if (!status.connected && status.reason) {
        setError(`Connection lost: ${status.reason}`);
      } else {
        setError(null);
      }
    };

    const handleConnectionError = (errorData) => {
      setError(errorData.error);
    };

    webSocketService.on('connection_status', handleConnectionStatus);
    webSocketService.on('connection_error', handleConnectionError);

    return () => {
      webSocketService.off('connection_status', handleConnectionStatus);
      webSocketService.off('connection_error', handleConnectionError);
      webSocketService.disconnect();
    };
  }, []);

  const subscribe = useCallback((event, callback) => {
    webSocketService.on(event, callback);
    return () => webSocketService.off(event, callback);
  }, []);

  const send = useCallback((event, data) => {
    webSocketService.send(event, data);
  }, []);

  const joinRoom = useCallback((roomName) => {
    webSocketService.joinRoom(roomName);
  }, []);

  const leaveRoom = useCallback((roomName) => {
    webSocketService.leaveRoom(roomName);
  }, []);

  return {
    connected,
    error,
    subscribe,
    send,
    joinRoom,
    leaveRoom,
    webSocketService
  };
};

// Server Health Hook
export const useServerHealth = () => {
  const [health, setHealth] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const healthData = await healthService.checkHealth();
      const apiData = await healthService.getApiInfo();
      setHealth(healthData);
      setApiInfo(apiData);
    } catch (error) {
      console.error('Health check failed:', error);
      setHealth({ status: 'ERROR', error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    health,
    apiInfo,
    loading,
    checkHealth,
    isOnline: health?.status === 'OK'
  };
};
