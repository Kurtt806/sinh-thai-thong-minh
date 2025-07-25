import React, { useState } from 'react';
import { useServerHealth, useAuth, useTanks, useWebSocket } from '@/hooks/useBackend';

const BackendTestPage = () => {
  const { health, apiInfo, loading: healthLoading, checkHealth, isOnline } = useServerHealth();
  const { user, login, register, logout, loading: authLoading } = useAuth();
  const { tanks, loading: tanksLoading, createTank } = useTanks();
  const { connected: wsConnected, subscribe, send } = useWebSocket();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [newTank, setNewTank] = useState({
    name: '',
    type: 'freshwater',
    capacity: 100
  });

  // WebSocket real-time data
  const [realtimeData, setRealtimeData] = useState([]);

  React.useEffect(() => {
    // Subscribe to real-time sensor data
    const unsubscribe = subscribe('sensor_data', (data) => {
      setRealtimeData(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 items
    });

    return unsubscribe;
  }, [subscribe]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm);
      alert('Đăng nhập thành công!');
    } catch (error) {
      alert('Đăng nhập thất bại: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(registerForm);
      alert('Đăng ký thành công!');
    } catch (error) {
      alert('Đăng ký thất bại: ' + error.message);
    }
  };

  const handleCreateTank = async (e) => {
    e.preventDefault();
    try {
      await createTank(newTank);
      alert('Tạo tank thành công!');
      setNewTank({ name: '', type: 'freshwater', capacity: 100 });
    } catch (error) {
      alert('Tạo tank thất bại: ' + error.message);
    }
  };

  const simulateSensorData = () => {
    const tankId = tanks[0]?.id || 'demo-tank';
    const sensorData = {
      tankId,
      temperature: (25 + Math.random() * 5).toFixed(1),
      ph: (7 + Math.random() * 2).toFixed(1),
      oxygen: (80 + Math.random() * 20).toFixed(1),
      timestamp: new Date().toISOString()
    };
    
    send('sensor_data', sensorData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔧 Backend Integration Test
        </h1>

        {/* Server Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              🌐 Server Health
              <span className={`ml-2 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </h2>
            {healthLoading ? (
              <p>Checking...</p>
            ) : health ? (
              <div className="space-y-2">
                <p><strong>Status:</strong> {health.status}</p>
                <p><strong>Uptime:</strong> {health.uptime ? Math.floor(health.uptime) + 's' : 'N/A'}</p>
                <p><strong>Version:</strong> {health.version}</p>
                <button 
                  onClick={checkHealth}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <p className="text-red-500">Server offline</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              🔌 WebSocket
              <span className={`ml-2 w-3 h-3 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </h2>
            <p><strong>Status:</strong> {wsConnected ? 'Connected' : 'Disconnected'}</p>
            <button 
              onClick={simulateSensorData}
              disabled={!wsConnected}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-400"
            >
              Send Test Data
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">📊 API Info</h2>
            {apiInfo ? (
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {apiInfo.name || 'Pet Management API'}</p>
                <p><strong>Version:</strong> {apiInfo.version}</p>
                <p><strong>Endpoints:</strong> {Object.keys(apiInfo.endpoints || {}).length}</p>
              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>
        </div>

        {/* Authentication Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">🔐 Authentication</h2>
            
            {user ? (
              <div className="space-y-3">
                <p className="text-green-600">✅ Đã đăng nhập: {user.username || user.email}</p>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-3">
                  <h3 className="font-medium">Đăng nhập</h3>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={authLoading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {authLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </form>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium">Đăng ký</h3>
                  <input
                    type="text"
                    placeholder="Username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={authLoading}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                  >
                    {authLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Tank Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">🐠 Tank Management</h2>
            
            {/* Tank List */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Danh sách Tank ({tanks.length})</h3>
              {tanksLoading ? (
                <p>Đang tải...</p>
              ) : tanks.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {tanks.map((tank, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                      <strong>{tank.name}</strong> - {tank.type} ({tank.capacity}L)
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa có tank nào</p>
              )}
            </div>

            {/* Create Tank Form */}
            <form onSubmit={handleCreateTank} className="space-y-3 pt-4 border-t">
              <h3 className="font-medium">Tạo Tank mới</h3>
              <input
                type="text"
                placeholder="Tên tank"
                value={newTank.name}
                onChange={(e) => setNewTank({...newTank, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={newTank.type}
                onChange={(e) => setNewTank({...newTank, type: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="freshwater">Nước ngọt</option>
                <option value="saltwater">Nước mặn</option>
                <option value="brackish">Nước lợ</option>
              </select>
              <input
                type="number"
                placeholder="Dung tích (lít)"
                value={newTank.capacity}
                onChange={(e) => setNewTank({...newTank, capacity: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
                required
              />
              <button 
                type="submit"
                disabled={tanksLoading || !user}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                Tạo Tank
              </button>
              {!user && <p className="text-sm text-gray-500">Cần đăng nhập để tạo tank</p>}
            </form>
          </div>
        </div>

        {/* Real-time Data */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📊 Real-time Sensor Data</h2>
          {realtimeData.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {realtimeData.map((data, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong>Tank: {data.tankId}</strong>
                      <div className="mt-1 space-x-4">
                        <span>🌡️ {data.temperature}°C</span>
                        <span>⚗️ pH {data.ph}</span>
                        <span>💨 O2 {data.oxygen}%</span>
                      </div>
                    </div>
                    <span className="text-gray-500">
                      {new Date(data.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Chưa có dữ liệu real-time</p>
              <p className="text-sm">Nhấn "Send Test Data" để mô phỏng dữ liệu cảm biến</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackendTestPage;
