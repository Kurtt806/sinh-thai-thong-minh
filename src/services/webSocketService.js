import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.serverUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    this.listeners = new Map();
  }

  // Initialize WebSocket connection
  connect() {
    if (this.socket && this.isConnected) {
      console.log('🔌 WebSocket already connected');
      return;
    }

    console.log(`🔌 Connecting to WebSocket server: ${this.serverUrl}`);
    
    this.socket = io(this.serverUrl, {
      transports: ['websocket'],
      timeout: 20000,
    });

    this.setupEventListeners();
  }

  // Setup default event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected');
      this.isConnected = true;
      this.emit('connection_status', { connected: true });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ WebSocket disconnected:', reason);
      this.isConnected = false;
      this.emit('connection_status', { connected: false, reason });
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔥 WebSocket connection error:', error);
      this.isConnected = false;
      this.emit('connection_error', { error: error.message });
    });

    // Listen for sensor data updates
    this.socket.on('sensor_data', (data) => {
      console.log('📊 Received sensor data:', data);
      this.emit('sensor_data', data);
    });

    // Listen for tank status updates
    this.socket.on('tank_status', (data) => {
      console.log('🐠 Tank status update:', data);
      this.emit('tank_status', data);
    });

    // Listen for animal activity
    this.socket.on('animal_activity', (data) => {
      console.log('🎯 Animal activity:', data);
      this.emit('animal_activity', data);
    });

    // Listen for schedule notifications
    this.socket.on('schedule_notification', (data) => {
      console.log('⏰ Schedule notification:', data);
      this.emit('schedule_notification', data);
    });

    // Listen for system alerts
    this.socket.on('system_alert', (data) => {
      console.log('🚨 System alert:', data);
      this.emit('system_alert', data);
    });
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting WebSocket');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
    }
  }

  // Join a room (for tank-specific updates)
  joinRoom(roomName) {
    if (this.socket && this.isConnected) {
      console.log(`🏠 Joining room: ${roomName}`);
      this.socket.emit('join_room', roomName);
    }
  }

  // Leave a room
  leaveRoom(roomName) {
    if (this.socket && this.isConnected) {
      console.log(`🚪 Leaving room: ${roomName}`);
      this.socket.emit('leave_room', roomName);
    }
  }

  // Send data to server
  send(event, data) {
    if (this.socket && this.isConnected) {
      console.log(`📤 Sending ${event}:`, data);
      this.socket.emit(event, data);
    } else {
      console.warn('⚠️ WebSocket not connected, cannot send data');
    }
  }

  // Subscribe to an event
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Unsubscribe from an event
  off(event, callback) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Emit event to subscribers
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      socket: !!this.socket
    };
  }

  // Simulate sensor data (for development)
  simulateSensorData(tankId) {
    const sensorData = {
      tankId,
      temperature: (25 + Math.random() * 5).toFixed(1),
      ph: (7 + Math.random() * 2).toFixed(1),
      oxygen: (80 + Math.random() * 20).toFixed(1),
      timestamp: new Date().toISOString()
    };

    this.send('sensor_data', sensorData);
    return sensorData;
  }

  // Send feeding notification
  sendFeedingNotification(tankId, animalIds) {
    const notification = {
      type: 'feeding',
      tankId,
      animalIds,
      timestamp: new Date().toISOString(),
      message: 'Feeding time!'
    };

    this.send('feeding_notification', notification);
    return notification;
  }

  // Send cleaning reminder
  sendCleaningReminder(tankId) {
    const reminder = {
      type: 'cleaning',
      tankId,
      timestamp: new Date().toISOString(),
      message: 'Tank cleaning required'
    };

    this.send('cleaning_reminder', reminder);
    return reminder;
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;
