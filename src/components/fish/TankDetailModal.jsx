import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function TankDetailModal({ isOpen, tank, onClose, onSave, onDelete }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({ ...tank });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: 'Eye' },
    { id: 'devices', label: 'Thiết bị', icon: 'Settings' },
    { id: 'fish', label: 'Cá', icon: 'Fish' },
    { id: 'feeding', label: 'Cho ăn', icon: 'Clock' },
    { id: 'maintenance', label: 'Bảo trì', icon: 'Wrench' }
  ];

  const handleSave = () => {
    onSave(formData);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(tank.id);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const updateDevice = (deviceType, field, value) => {
    setFormData({
      ...formData,
      devices: {
        ...formData.devices,
        [deviceType]: {
          ...formData.devices[deviceType],
          [field]: value
        }
      }
    });
  };

  const addFishType = () => {
    setFormData({
      ...formData,
      fishTypes: [...formData.fishTypes, { name: '', count: 0, health: 'good' }]
    });
  };

  const updateFishType = (index, field, value) => {
    const newFishTypes = [...formData.fishTypes];
    newFishTypes[index] = { ...newFishTypes[index], [field]: value };
    setFormData({ ...formData, fishTypes: newFishTypes });
  };

  const removeFishType = (index) => {
    const newFishTypes = formData.fishTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, fishTypes: newFishTypes });
  };

  const addWaterChange = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      ...formData,
      waterChanges: [
        { date: today, percentage: 25, notes: '' },
        ...formData.waterChanges
      ]
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên hồ cá
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dài (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.length}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, length: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rộng (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.width}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, width: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cao (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.height}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, height: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thể tích (L)
              </label>
              <input
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trạng thái
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              >
                <option value="healthy">Khỏe mạnh</option>
                <option value="warning">Cảnh báo</option>
                <option value="critical">Nghiêm trọng</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Thông số nước</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nhiệt độ (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Độ pH
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Oxy (mg/L)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.oxygen}
                onChange={(e) => setFormData({ ...formData, oxygen: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDevicesTab = () => (
    <div className="space-y-4">
      {Object.entries(formData.devices).map(([deviceType, device]) => (
        <Card key={deviceType}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon 
                name={
                  deviceType === 'filter' ? 'Filter' :
                  deviceType === 'heater' ? 'Thermometer' :
                  deviceType === 'light' ? 'Sun' : 'Wind'
                } 
                size={20} 
                className="mr-2" 
              />
              {
                deviceType === 'filter' ? 'Máy lọc' :
                deviceType === 'heater' ? 'Máy sưởi' :
                deviceType === 'light' ? 'Đèn LED' : 'Máy sục khí'
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trạng thái
              </label>
              <select
                value={device.status}
                onChange={(e) => updateDevice(deviceType, 'status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              >
                <option value="on">Bật</option>
                <option value="off">Tắt</option>
                <option value="auto">Tự động</option>
                <option value="scheduled">Theo lịch</option>
              </select>
            </div>
            
            {deviceType === 'heater' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nhiệt độ mục tiêu (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={device.targetTemp}
                  onChange={(e) => updateDevice(deviceType, 'targetTemp', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
            )}
            
            {deviceType === 'aerator' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cường độ (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={device.intensity}
                  onChange={(e) => updateDevice(deviceType, 'intensity', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {device.intensity}%
                </div>
              </div>
            )}
            
            {(deviceType === 'light' || deviceType === 'filter') && device.schedule && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lịch hoạt động
                </label>
                <input
                  type="text"
                  value={device.schedule}
                  onChange={(e) => updateDevice(deviceType, 'schedule', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="VD: 06:00-20:00"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFishTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quản lý cá ({formData.fishTypes.length} loại)
        </h3>
        <Button onClick={addFishType}>
          <Icon name="Plus" size={16} className="mr-2" />
          Thêm loại cá
        </Button>
      </div>
      
      {formData.fishTypes.map((fish, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên loại cá
                </label>
                <input
                  type="text"
                  value={fish.name}
                  onChange={(e) => updateFishType(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số lượng
                </label>
                <input
                  type="number"
                  value={fish.count}
                  onChange={(e) => updateFishType(index, 'count', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sức khỏe
                </label>
                <select
                  value={fish.health}
                  onChange={(e) => updateFishType(index, 'health', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                >
                  <option value="excellent">Tuyệt vời</option>
                  <option value="good">Tốt</option>
                  <option value="fair">Bình thường</option>
                  <option value="poor">Kém</option>
                </select>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => removeFishType(index)}
                  disabled={formData.fishTypes.length === 1}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFeedingTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Lịch cho ăn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Loại thức ăn
          </label>
          <input
            type="text"
            value={formData.feeding.foodType}
            onChange={(e) => setFormData({
              ...formData,
              feeding: { ...formData.feeding, foodType: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Giờ cho ăn (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            value={formData.feeding.schedule.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              feeding: { 
                ...formData.feeding, 
                schedule: e.target.value.split(',').map(time => time.trim()) 
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
            placeholder="08:00, 18:00"
          />
        </div>
        
        {formData.feeding.lastFed && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Lần cho ăn cuối: {new Date(formData.feeding.lastFed).toLocaleString('vi-VN')}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lịch sử thay nước
        </h3>
        <Button onClick={addWaterChange}>
          <Icon name="Plus" size={16} className="mr-2" />
          Thêm lần thay nước
        </Button>
      </div>
      
      {formData.waterChanges.map((change, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ngày thay
                </label>
                <input
                  type="date"
                  value={change.date}
                  onChange={(e) => {
                    const newChanges = [...formData.waterChanges];
                    newChanges[index] = { ...newChanges[index], date: e.target.value };
                    setFormData({ ...formData, waterChanges: newChanges });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tỷ lệ thay (%)
                </label>
                <input
                  type="number"
                  value={change.percentage}
                  onChange={(e) => {
                    const newChanges = [...formData.waterChanges];
                    newChanges[index] = { ...newChanges[index], percentage: parseInt(e.target.value) };
                    setFormData({ ...formData, waterChanges: newChanges });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <input
                  type="text"
                  value={change.notes}
                  onChange={(e) => {
                    const newChanges = [...formData.waterChanges];
                    newChanges[index] = { ...newChanges[index], notes: e.target.value };
                    setFormData({ ...formData, waterChanges: newChanges });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cấu hình ${tank.name}`} size="large">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-moss-100 text-moss-700 dark:bg-moss-900/30 dark:text-moss-400 border-b-2 border-moss-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'devices' && renderDevicesTab()}
          {activeTab === 'fish' && renderFishTab()}
          {activeTab === 'feeding' && renderFeedingTab()}
          {activeTab === 'maintenance' && renderMaintenanceTab()}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="mr-auto"
          >
            {showDeleteConfirm ? 'Xác nhận xóa' : 'Xóa hồ cá'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </Modal>
  );
}
