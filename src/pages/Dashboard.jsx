import React, { useState } from 'react';
import { Plus, Clock, Settings, Zap, Thermometer, Droplets } from 'lucide-react';

export function Dashboard() {
  const [feeders, setFeeders] = useState([
    {
      id: 1,
      name: 'Máy cho ăn #1',
      status: 'online',
      lastFed: '2 giờ trước',
      voltage: '12.4V',
      temperature: 26.5,
      waterLevel: 85,
      schedule: 'Tự động (8:00, 14:00, 19:00)',
      position: 'Bể chính'
    },
    {
      id: 2,
      name: 'Máy cho ăn #2', 
      status: 'online',
      lastFed: '1 giờ trước',
      voltage: '12.1V',
      temperature: 25.8,
      waterLevel: 92,
      schedule: 'Tự động (7:30, 13:30, 18:30)',
      position: 'Bể phụ'
    }
  ]);

  const [showAddFeeder, setShowAddFeeder] = useState(false);
  const [selectedFeeder, setSelectedFeeder] = useState(null);

  const handleFeedNow = (feederId) => {
    console.log(`Cho ăn ngay - Máy ${feederId}`);
    // TODO: Implement feed now logic
  };

  const handleSetSchedule = (feederId) => {
    console.log(`Đặt lịch cho máy ${feederId}`);
    // TODO: Implement schedule setting
  };

  const handleAddFeeder = () => {
    setShowAddFeeder(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-moss-600 to-moss-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hệ thống Máy Cho Ăn Cá</h1>
            <p className="text-moss-100 mt-1">
              Quản lý và điều khiển máy cho ăn tự động
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-moss-100">Máy hoạt động</p>
            <p className="text-xl font-semibold">{feeders.filter(f => f.status === 'online').length}/{feeders.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={handleAddFeeder}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-moss-500 transition-colors"
        >
          <Plus className="h-8 w-8 text-moss-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Thêm máy</p>
        </button>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Lịch hẹn giờ</p>
          <p className="text-xs text-gray-500">Đang hoạt động</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Điện áp TB</p>
          <p className="text-xs text-gray-500">12.3V</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <Thermometer className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Nhiệt độ TB</p>
          <p className="text-xs text-gray-500">26.2°C</p>
        </div>
      </div>

      {/* Feeder Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feeders.map((feeder) => (
          <div key={feeder.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            {/* Feeder Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{feeder.name}</h3>
                <p className="text-sm text-gray-500">{feeder.position}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                feeder.status === 'online' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {feeder.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
              </div>
            </div>

            {/* Sensor Info */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Zap className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Điện áp</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{feeder.voltage}</p>
              </div>
              <div className="text-center">
                <Thermometer className="h-5 w-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Nhiệt độ</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{feeder.temperature}°C</p>
              </div>
              <div className="text-center">
                <Droplets className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Mức nước</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{feeder.waterLevel}%</p>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Lịch cho ăn:</p>
              <p className="text-sm text-gray-900 dark:text-white">{feeder.schedule}</p>
              <p className="text-xs text-gray-500 mt-1">Lần cuối: {feeder.lastFed}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleFeedNow(feeder.id)}
                className="bg-moss-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-moss-700 transition-colors"
              >
                Cho ăn ngay
              </button>
              <button
                onClick={() => handleSetSchedule(feeder.id)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Đặt lịch
              </button>
              <button
                onClick={() => setSelectedFeeder(feeder)}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Feeder Modal */}
      {showAddFeeder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thêm Máy Cho Ăn Mới
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tên máy
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-moss-500"
                  placeholder="Máy cho ăn #3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vị trí
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-moss-500"
                  placeholder="Bể số 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Địa chỉ IP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-moss-500"
                  placeholder="192.168.1.100"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddFeeder(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // TODO: Add feeder logic
                  setShowAddFeeder(false);
                }}
                className="flex-1 px-4 py-2 bg-moss-600 text-white rounded-lg hover:bg-moss-700 transition-colors"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feeder Detail Modal */}
      {selectedFeeder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Chi tiết {selectedFeeder.name}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedFeeder.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vị trí</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedFeeder.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Điện áp</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedFeeder.voltage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nhiệt độ</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedFeeder.temperature}°C</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mức nước</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedFeeder.waterLevel}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lần cho ăn cuối</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedFeeder.lastFed}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Lịch cho ăn hiện tại</p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-900 dark:text-white">{selectedFeeder.schedule}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedFeeder(null)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  handleSetSchedule(selectedFeeder.id);
                  setSelectedFeeder(null);
                }}
                className="flex-1 px-4 py-2 bg-moss-600 text-white rounded-lg hover:bg-moss-700 transition-colors"
              >
                <Settings className="h-4 w-4 inline mr-1" />
                Cài đặt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
