import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { AddTankModal } from '@/components/fish/AddTankModal';
import { TankDetailModal } from '@/components/fish/TankDetailModal';
import { FishTankCard } from '@/components/fish/FishTankCard';

export function FishPage() {
  const [fishTanks, setFishTanks] = useState([
    {
      id: 1,
      name: 'Hồ Cá Chính',
      dimensions: { length: 120, width: 60, height: 50 },
      volume: 360,
      fishCount: 25,
      temperature: 26.5,
      ph: 7.2,
      oxygen: 8.5,
      status: 'healthy',
      fishTypes: [
        { name: 'Cá Vàng', count: 10, health: 'good' },
        { name: 'Cá Neon', count: 12, health: 'good' },
        { name: 'Cá Betta', count: 3, health: 'excellent' }
      ],
      devices: {
        filter: { status: 'on', lastMaintenance: '2025-07-20' },
        heater: { status: 'auto', targetTemp: 26.5 },
        light: { status: 'scheduled', schedule: '06:00-20:00' },
        aerator: { status: 'on', intensity: 75 }
      },
      feeding: {
        lastFed: '2025-07-24 08:00',
        schedule: ['08:00', '18:00'],
        foodType: 'Thức ăn tổng hợp'
      },
      waterChanges: [
        { date: '2025-07-20', percentage: 25, notes: 'Thay nước định kỳ' },
        { date: '2025-07-13', percentage: 30, notes: 'Vệ sinh filter' }
      ],
      alerts: []
    },
    {
      id: 2,
      name: 'Hồ Cá Cảnh',
      dimensions: { length: 80, width: 40, height: 40 },
      volume: 128,
      fishCount: 15,
      temperature: 25.8,
      ph: 7.0,
      oxygen: 8.2,
      status: 'healthy',
      fishTypes: [
        { name: 'Cá Thiên Thần', count: 8, health: 'good' },
        { name: 'Cá Rồng', count: 7, health: 'excellent' }
      ],
      devices: {
        filter: { status: 'on', lastMaintenance: '2025-07-18' },
        heater: { status: 'auto', targetTemp: 26.0 },
        light: { status: 'on', schedule: '07:00-19:00' },
        aerator: { status: 'on', intensity: 80 }
      },
      feeding: {
        lastFed: '2025-07-24 07:30',
        schedule: ['07:30', '17:30'],
        foodType: 'Thức ăn cao cấp'
      },
      waterChanges: [
        { date: '2025-07-22', percentage: 20, notes: 'Thay nước hàng tuần' }
      ],
      alerts: [
        { type: 'info', message: 'Sắp đến hạn thay nước', date: '2025-07-24' }
      ]
    },
    {
      id: 3,
      name: 'Hồ Cá Nhỏ',
      dimensions: { length: 60, width: 30, height: 30 },
      volume: 54,
      fishCount: 8,
      temperature: 26.0,
      ph: 7.3,
      oxygen: 8.0,
      status: 'healthy',
      fishTypes: [
        { name: 'Cá Molly', count: 4, health: 'good' },
        { name: 'Cá Guppy', count: 4, health: 'good' }
      ],
      devices: {
        filter: { status: 'on', lastMaintenance: '2025-07-15' },
        heater: { status: 'auto', targetTemp: 26.0 },
        light: { status: 'manual', schedule: '08:00-18:00' },
        aerator: { status: 'off', intensity: 0 }
      },
      feeding: {
        lastFed: '2025-07-24 08:15',
        schedule: ['08:00', '20:00'],
        foodType: 'Thức ăn nhỏ'
      },
      waterChanges: [
        { date: '2025-07-21', percentage: 30, notes: 'Vệ sinh toàn bộ' }
      ],
      alerts: []
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTank, setSelectedTank] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAddTank = (newTank) => {
    const tank = {
      ...newTank,
      id: Math.max(...fishTanks.map(t => t.id)) + 1,
      status: 'healthy',
      alerts: [],
      waterChanges: []
    };
    setFishTanks([...fishTanks, tank]);
    setShowAddModal(false);
  };

  const handleUpdateTank = (updatedTank) => {
    setFishTanks(fishTanks.map(tank => 
      tank.id === updatedTank.id ? updatedTank : tank
    ));
    setShowDetailModal(false);
    setSelectedTank(null);
  };

  const handleDeleteTank = (tankId) => {
    setFishTanks(fishTanks.filter(tank => tank.id !== tankId));
    setShowDetailModal(false);
    setSelectedTank(null);
  };

  const handleFeedFish = (tankId) => {
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN');
    
    setFishTanks(fishTanks.map(tank => 
      tank.id === tankId 
        ? { ...tank, feeding: { ...tank.feeding, lastFed: timeString } }
        : tank
    ));
    
    console.log(`Đã cho cá ăn trong hồ ${tankId} lúc ${timeString}`);
  };

  const handleControlDevice = (tankId, device) => {
    setFishTanks(fishTanks.map(tank => {
      if (tank.id === tankId) {
        const currentStatus = tank.devices[device].status;
        const newStatus = currentStatus === 'on' ? 'off' : 'on';
        
        return {
          ...tank,
          devices: {
            ...tank.devices,
            [device]: { ...tank.devices[device], status: newStatus }
          }
        };
      }
      return tank;
    }));
    
    console.log(`Điều khiển ${device} trong hồ ${tankId}`);
  };

  const handleViewDetails = (tank) => {
    setSelectedTank(tank);
    setShowDetailModal(true);
  };

  // Calculate stats
  const totalFish = fishTanks.reduce((sum, tank) => sum + tank.fishCount, 0);
  const avgTemperature = (fishTanks.reduce((sum, tank) => sum + tank.temperature, 0) / fishTanks.length).toFixed(1);
  const avgPH = (fishTanks.reduce((sum, tank) => sum + tank.ph, 0) / fishTanks.length).toFixed(1);
  const totalAlerts = fishTanks.reduce((sum, tank) => sum + tank.alerts.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quản lý Cá
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Theo dõi và chăm sóc các hồ cá của bạn
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Thêm Hồ Cá
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số cá</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalFish}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Fish" size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Số hồ cá</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{fishTanks.length}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Waves" size={20} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nhiệt độ TB</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgTemperature}°C</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Thermometer" size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cảnh báo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalAlerts}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fish Tanks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fishTanks.map((tank) => (
          <FishTankCard
            key={tank.id}
            tank={tank}
            onFeedFish={handleFeedFish}
            onControlDevice={handleControlDevice}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Add Tank Modal */}
      {showAddModal && (
        <AddTankModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTank}
        />
      )}

      {/* Tank Detail Modal */}
      {showDetailModal && selectedTank && (
        <TankDetailModal
          isOpen={showDetailModal}
          tank={selectedTank}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTank(null);
          }}
          onSave={handleUpdateTank}
          onDelete={handleDeleteTank}
        />
      )}
    </div>
  );
}
