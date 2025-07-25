import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Sinh Thái Thông Minh',
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh',
      theme: 'system',
      autoBackup: true,
      notifications: true
    },
    devices: {
      autoDiscovery: true,
      connectionTimeout: 30,
      retryAttempts: 3,
      maintenanceReminder: true,
      deviceAlerts: true
    },
    feeding: {
      defaultAmount: '5g',
      defaultFoodType: 'Thức ăn viên cao cấp',
      autoScheduling: true,
      missedFeedingAlert: true,
      feedingHistory: 30
    },
    alerts: {
      temperatureMin: 24,
      temperatureMax: 28,
      phMin: 6.5,
      phMax: 8.0,
      oxygenMin: 6.0,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      backupLocation: 'local',
      lastBackup: '2025-07-25 02:00:00'
    }
  });

  const tabs = [
    { id: 'general', name: 'Tổng quan', icon: 'Settings' },
    { id: 'devices', name: 'Thiết bị', icon: 'Cpu' },
    { id: 'feeding', name: 'Cho ăn', icon: 'Coffee' },
    { id: 'alerts', name: 'Cảnh báo', icon: 'Bell' },
    { id: 'backup', name: 'Sao lưu', icon: 'Database' },
    { id: 'security', name: 'Bảo mật', icon: 'Shield' }
  ];

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt hệ thống</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên hệ thống</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg"
              value={settings.general.systemName}
              onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={settings.general.language}
                onChange={(e) => updateSetting('general', 'language', e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Múi giờ</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={settings.general.timezone}
                onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
              >
                <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
                <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
                <option value="Asia/Singapore">Singapore (UTC+8)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Giao diện</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={settings.general.theme}
              onChange={(e) => updateSetting('general', 'theme', e.target.value)}
            >
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
              <option value="system">Theo hệ thống</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tự động sao lưu</div>
              <div className="text-sm text-gray-600">Sao lưu dữ liệu định kỳ</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.general.autoBackup}
                onChange={(e) => updateSetting('general', 'autoBackup', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDeviceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thiết bị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tự động khám phá thiết bị</div>
              <div className="text-sm text-gray-600">Tìm kiếm thiết bị mới tự động</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.devices.autoDiscovery}
                onChange={(e) => updateSetting('devices', 'autoDiscovery', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Timeout kết nối (giây)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={settings.devices.connectionTimeout}
                onChange={(e) => updateSetting('devices', 'connectionTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Số lần thử lại</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={settings.devices.retryAttempts}
                onChange={(e) => updateSetting('devices', 'retryAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Nhắc nhở bảo trì</div>
              <div className="text-sm text-gray-600">Thông báo khi thiết bị cần bảo trì</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.devices.maintenanceReminder}
                onChange={(e) => updateSetting('devices', 'maintenanceReminder', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedingSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt cho ăn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Lượng thức ăn mặc định</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg"
                value={settings.feeding.defaultAmount}
                onChange={(e) => updateSetting('feeding', 'defaultAmount', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Loại thức ăn mặc định</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={settings.feeding.defaultFoodType}
                onChange={(e) => updateSetting('feeding', 'defaultFoodType', e.target.value)}
              >
                <option value="Thức ăn viên cao cấp">Thức ăn viên cao cấp</option>
                <option value="Thức ăn nổi">Thức ăn nổi</option>
                <option value="Thức ăn khô">Thức ăn khô</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Lưu lịch sử (ngày)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={settings.feeding.feedingHistory}
              onChange={(e) => updateSetting('feeding', 'feedingHistory', parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tự động lên lịch</div>
              <div className="text-sm text-gray-600">Tự động tạo lịch cho ăn dựa trên quy tắc</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.feeding.autoScheduling}
                onChange={(e) => updateSetting('feeding', 'autoScheduling', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ngưỡng cảnh báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nhiệt độ tối thiểu (°C)</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full p-2 border rounded-lg"
                value={settings.alerts.temperatureMin}
                onChange={(e) => updateSetting('alerts', 'temperatureMin', parseFloat(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Nhiệt độ tối đa (°C)</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full p-2 border rounded-lg"
                value={settings.alerts.temperatureMax}
                onChange={(e) => updateSetting('alerts', 'temperatureMax', parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">pH tối thiểu</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full p-2 border rounded-lg"
                value={settings.alerts.phMin}
                onChange={(e) => updateSetting('alerts', 'phMin', parseFloat(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">pH tối đa</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full p-2 border rounded-lg"
                value={settings.alerts.phMax}
                onChange={(e) => updateSetting('alerts', 'phMax', parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Oxy tối thiểu (mg/L)</label>
            <input 
              type="number" 
              step="0.1"
              className="w-full p-2 border rounded-lg"
              value={settings.alerts.oxygenMin}
              onChange={(e) => updateSetting('alerts', 'oxygenMin', parseFloat(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Phương thức thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email</div>
              <div className="text-sm text-gray-600">Gửi cảnh báo qua email</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.alerts.emailNotifications}
                onChange={(e) => updateSetting('alerts', 'emailNotifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-gray-600">Thông báo đẩy trên trình duyệt</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.alerts.pushNotifications}
                onChange={(e) => updateSetting('alerts', 'pushNotifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt sao lưu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tự động sao lưu</div>
              <div className="text-sm text-gray-600">Sao lưu dữ liệu tự động theo lịch</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.backup.autoBackup}
                onChange={(e) => updateSetting('backup', 'autoBackup', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-moss-300 dark:peer-focus:ring-moss-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-moss-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tần suất sao lưu</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={settings.backup.backupFrequency}
                onChange={(e) => updateSetting('backup', 'backupFrequency', e.target.value)}
              >
                <option value="hourly">Mỗi giờ</option>
                <option value="daily">Hàng ngày</option>
                <option value="weekly">Hàng tuần</option>
                <option value="monthly">Hàng tháng</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Lưu trữ (ngày)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={settings.backup.retentionDays}
                onChange={(e) => updateSetting('backup', 'retentionDays', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Lần sao lưu cuối:</span>
              <span className="text-sm text-gray-600">
                {new Date(settings.backup.lastBackup).toLocaleString('vi-VN')}
              </span>
            </div>
            <Button className="w-full">
              <Icon name="Download" size={16} className="mr-2" />
              Sao lưu ngay
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bảo mật hệ thống</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button variant="outline" className="w-full mb-2">
              <Icon name="Key" size={16} className="mr-2" />
              Đổi mật khẩu
            </Button>
          </div>
          
          <div>
            <Button variant="outline" className="w-full mb-2">
              <Icon name="Shield" size={16} className="mr-2" />
              Xác thực 2 bước
            </Button>
          </div>
          
          <div>
            <Button variant="outline" className="w-full mb-2">
              <Icon name="Lock" size={16} className="mr-2" />
              Quản lý phiên đăng nhập
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Nhật ký bảo mật</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Đăng nhập cuối:</span>
                <span>25/07/2025 09:30</span>
              </div>
              <div className="flex justify-between">
                <span>IP address:</span>
                <span>192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span>Thiết bị:</span>
                <span>Chrome on Windows</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'devices': return renderDeviceSettings();
      case 'feeding': return renderFeedingSettings();
      case 'alerts': return renderAlertSettings();
      case 'backup': return renderBackupSettings();
      case 'security': return renderSecuritySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Icon name="Settings" size={32} className="text-moss-600" />
            Cài đặt Hệ thống
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Quản lý và tùy chỉnh các cài đặt hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Khôi phục mặc định
          </Button>
          <Button>
            <Icon name="Save" size={16} className="mr-2" />
            Lưu cài đặt
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-moss-500 text-moss-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <Icon name={tab.icon} size={16} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Save Notification */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-moss-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 opacity-0 pointer-events-none transition-opacity">
          <Icon name="Check" size={16} />
          Đã lưu cài đặt
        </div>
      </div>
    </div>
  );
}
