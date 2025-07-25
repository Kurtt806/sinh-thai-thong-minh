import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

export function DevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Máy cho ăn tự động #1',
      type: 'feeder',
      location: 'Hồ cá chính',
      status: 'online',
      batteryLevel: 85,
      lastActivity: '2 phút trước',
      settings: {
        schedule: ['08:00', '12:00', '18:00'],
        amount: '5g',
        foodType: 'Thức ăn viên'
      }
    },
    {
      id: 2,
      name: 'Hệ thống đèn LED #1',
      type: 'lighting',
      location: 'Hồ cá chính',
      status: 'online',
      brightness: 80,
      lastActivity: '5 phút trước',
      settings: {
        schedule: '06:00-20:00',
        autoMode: true,
        colors: ['Trắng', 'Xanh dương']
      }
    },
    {
      id: 3,
      name: 'Bộ lọc nước #1',
      type: 'filter',
      location: 'Hồ cá chính',
      status: 'online',
      flowRate: '1200L/h',
      lastActivity: 'Đang hoạt động',
      settings: {
        mode: 'auto',
        maintenanceDate: '2025-08-15',
        filterLife: 78
      }
    },
    {
      id: 4,
      name: 'Máy sưởi thông minh #1',
      type: 'heater',
      location: 'Hồ cá cảnh',
      status: 'online',
      temperature: 26.5,
      lastActivity: '1 phút trước',
      settings: {
        targetTemp: 26.5,
        mode: 'auto',
        safetyRange: [24, 28]
      }
    },
    {
      id: 5,
      name: 'Máy sục khí #2',
      type: 'aerator',
      location: 'Hồ cá nhỏ',
      status: 'offline',
      flowRate: 0,
      lastActivity: '1 giờ trước',
      settings: {
        intensity: 0,
        schedule: '24/7',
        mode: 'manual'
      }
    },
    {
      id: 6,
      name: 'Cảm biến pH thông minh',
      type: 'sensor',
      location: 'Hồ cá chính',
      status: 'online',
      value: 7.2,
      lastActivity: '30 giây trước',
      settings: {
        alertRange: [6.5, 8.0],
        calibrationDate: '2025-07-20',
        accuracy: '±0.1'
      }
    }
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'feeder': return 'Coffee';
      case 'lighting': return 'Lightbulb';
      case 'filter': return 'Filter';
      case 'heater': return 'Thermometer';
      case 'aerator': return 'Wind';
      case 'sensor': return 'Activity';
      default: return 'Settings';
    }
  };

  const getDeviceTypeName = (type) => {
    switch (type) {
      case 'feeder': return 'Máy cho ăn';
      case 'lighting': return 'Hệ thống đèn';
      case 'filter': return 'Bộ lọc nước';
      case 'heater': return 'Máy sưởi';
      case 'aerator': return 'Máy sục khí';
      case 'sensor': return 'Cảm biến';
      default: return 'Thiết bị';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Hoạt động';
      case 'offline': return 'Ngoại tuyến';
      case 'warning': return 'Cảnh báo';
      default: return 'Không xác định';
    }
  };

  const handleDeviceControl = (deviceId, action) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        let newStatus = device.status;
        if (action === 'toggle') {
          newStatus = device.status === 'online' ? 'offline' : 'online';
        }
        return { ...device, status: newStatus, lastActivity: 'Vừa xong' };
      }
      return device;
    }));
  };

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Icon name="Settings" size={32} className="text-moss-600" />
            Quản lý Thiết bị
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Điều khiển và giám sát tất cả thiết bị trong hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Search" size={16} className="mr-2" />
            Tìm kiếm
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Thêm thiết bị
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tổng thiết bị
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {devices.length}
              </p>
            </div>
            <Icon name="Settings" size={24} className="text-moss-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Đang hoạt động
              </p>
              <p className="text-2xl font-bold text-green-600">
                {onlineDevices}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ngoại tuyến
              </p>
              <p className="text-2xl font-bold text-red-600">
                {offlineDevices}
              </p>
            </div>
            <Icon name="XCircle" size={24} className="text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Cảnh báo
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {warningDevices}
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-moss-100 dark:bg-moss-900/30 rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(device.type)} size={20} className="text-moss-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getDeviceTypeName(device.type)}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(device.status)}>
                  {getStatusText(device.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Location */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Vị trí:</span>
                <span className="font-medium">{device.location}</span>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Hoạt động cuối:</span>
                <span className="font-medium">{device.lastActivity}</span>
              </div>

              {/* Device-specific info */}
              {device.type === 'feeder' && device.batteryLevel && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pin:</span>
                  <span className="font-medium">{device.batteryLevel}%</span>
                </div>
              )}

              {device.type === 'lighting' && device.brightness && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Độ sáng:</span>
                  <span className="font-medium">{device.brightness}%</span>
                </div>
              )}

              {device.type === 'filter' && device.flowRate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Lưu lượng:</span>
                  <span className="font-medium">{device.flowRate}</span>
                </div>
              )}

              {device.type === 'heater' && device.temperature && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Nhiệt độ:</span>
                  <span className="font-medium">{device.temperature}°C</span>
                </div>
              )}

              {device.type === 'sensor' && device.value && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Giá trị:</span>
                  <span className="font-medium">{device.value}</span>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleDeviceControl(device.id, 'toggle')}
                >
                  <Icon name="Power" size={14} className="mr-1" />
                  {device.status === 'online' ? 'Tắt' : 'Bật'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedDevice(device);
                    setShowSettings(true);
                  }}
                >
                  <Icon name="Settings" size={14} />
                </Button>
                <Button size="sm" variant="outline">
                  <Icon name="BarChart3" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Device Button */}
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-moss-400 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-moss-100 dark:bg-moss-900/30 rounded-full flex items-center justify-center mb-4">
            <Icon name="Plus" size={32} className="text-moss-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Thêm thiết bị mới
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            Kết nối và cấu hình thiết bị mới cho hệ thống của bạn
          </p>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Thêm thiết bị
          </Button>
        </CardContent>
      </Card>

      {/* Device Settings Modal */}
      {showSettings && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cài đặt {selectedDevice.name}</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên thiết bị</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg" 
                  defaultValue={selectedDevice.name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Vị trí</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Hồ cá chính</option>
                  <option>Hồ cá cảnh</option>
                  <option>Hồ cá nhỏ</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowSettings(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={() => setShowSettings(false)}>
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
