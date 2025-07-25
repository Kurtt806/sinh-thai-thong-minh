import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function AddTankModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    dimensions: { length: '', width: '', height: '' },
    volume: '',
    fishTypes: [{ name: '', count: '', health: 'good' }],
    devices: {
      filter: { status: 'on', lastMaintenance: '' },
      heater: { status: 'auto', targetTemp: 26 },
      light: { status: 'scheduled', schedule: '06:00-20:00' },
      aerator: { status: 'on', intensity: 75 }
    },
    feeding: {
      schedule: ['08:00', '18:00'],
      foodType: 'Thức ăn tổng hợp'
    },
    temperature: 26,
    ph: 7.0,
    oxygen: 8.0
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên hồ cá là bắt buộc';
    }
    
    if (!formData.dimensions.length || !formData.dimensions.width || !formData.dimensions.height) {
      newErrors.dimensions = 'Kích thước là bắt buộc';
    }
    
    if (!formData.volume) {
      newErrors.volume = 'Thể tích là bắt buộc';
    }
    
    if (formData.fishTypes.some(fish => !fish.name.trim() || !fish.count)) {
      newErrors.fishTypes = 'Thông tin cá là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Calculate fish count
    const fishCount = formData.fishTypes.reduce((sum, fish) => sum + parseInt(fish.count || 0), 0);
    
    // Calculate volume if not provided
    let volume = parseInt(formData.volume);
    if (!volume) {
      const { length, width, height } = formData.dimensions;
      volume = (parseInt(length) * parseInt(width) * parseInt(height)) / 1000; // Convert to liters
    }

    const newTank = {
      ...formData,
      volume,
      fishCount,
      temperature: parseFloat(formData.temperature),
      ph: parseFloat(formData.ph),
      oxygen: parseFloat(formData.oxygen),
      devices: {
        ...formData.devices,
        heater: {
          ...formData.devices.heater,
          targetTemp: parseFloat(formData.devices.heater.targetTemp)
        },
        aerator: {
          ...formData.devices.aerator,
          intensity: parseInt(formData.devices.aerator.intensity)
        }
      },
      fishTypes: formData.fishTypes.map(fish => ({
        ...fish,
        count: parseInt(fish.count)
      })),
      feeding: {
        ...formData.feeding,
        lastFed: null
      }
    };

    onSave(newTank);
  };

  const addFishType = () => {
    setFormData({
      ...formData,
      fishTypes: [...formData.fishTypes, { name: '', count: '', health: 'good' }]
    });
  };

  const removeFishType = (index) => {
    const newFishTypes = formData.fishTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, fishTypes: newFishTypes });
  };

  const updateFishType = (index, field, value) => {
    const newFishTypes = [...formData.fishTypes];
    newFishTypes[index] = { ...newFishTypes[index], [field]: value };
    setFormData({ ...formData, fishTypes: newFishTypes });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm Hồ Cá Mới">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin cơ bản</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên hồ cá *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              placeholder="VD: Hồ Cá Chính"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dài (cm) *
              </label>
              <input
                type="number"
                value={formData.dimensions.length}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, length: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rộng (cm) *
              </label>
              <input
                type="number"
                value={formData.dimensions.width}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, width: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cao (cm) *
              </label>
              <input
                type="number"
                value={formData.dimensions.height}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, height: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                placeholder="50"
              />
            </div>
          </div>
          {errors.dimensions && <p className="text-red-500 text-xs mt-1">{errors.dimensions}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thể tích (Lít)
            </label>
            <input
              type="number"
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              placeholder="Tự động tính từ kích thước"
            />
            {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
          </div>
        </div>

        {/* Water Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thông số nước</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nhiệt độ (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, oxygen: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
              />
            </div>
          </div>
        </div>

        {/* Fish Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin cá</h3>
            <Button type="button" variant="outline" size="sm" onClick={addFishType}>
              <Icon name="Plus" size={16} className="mr-1" />
              Thêm loại cá
            </Button>
          </div>
          
          {formData.fishTypes.map((fish, index) => (
            <div key={index} className="flex space-x-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên loại cá
                </label>
                <input
                  type="text"
                  value={fish.name}
                  onChange={(e) => updateFishType(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="VD: Cá Vàng"
                />
              </div>
              <div className="w-20">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số lượng
                </label>
                <input
                  type="number"
                  value={fish.count}
                  onChange={(e) => updateFishType(index, 'count', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="5"
                />
              </div>
              <div className="w-24">
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
              {formData.fishTypes.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFishType(index)}
                  className="mb-0"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              )}
            </div>
          ))}
          {errors.fishTypes && <p className="text-red-500 text-xs mt-1">{errors.fishTypes}</p>}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Hủy
          </Button>
          <Button type="submit" className="flex-1">
            Tạo hồ cá
          </Button>
        </div>
      </form>
    </Modal>
  );
}
