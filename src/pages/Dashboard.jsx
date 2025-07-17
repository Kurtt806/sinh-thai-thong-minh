import { STATS_CARDS } from '@/constants/dashboard';
import { StatCard } from '@/components/dashboard/StatCard';
import { AquariumCard } from '@/components/dashboard/AquariumCard';
import { DeviceControlCard } from '@/components/dashboard/DeviceControlCard';
import { SensorMonitorCard } from '@/components/dashboard/SensorMonitorCard';
import { FeedingScheduleCard } from '@/components/dashboard/FeedingScheduleCard';

export function Dashboard() {
  const aquariums = [
    {
      id: 1,
      name: 'Hồ Cá Chính',
      dimensions: '120x60x50cm',
      volume: 360,
      fishCount: 25,
      temperature: 26.5,
      ph: 7.2,
      status: 'healthy',
    },
    {
      id: 2,
      name: 'Hồ Cá Cảnh',
      dimensions: '80x40x40cm',
      volume: 128,
      fishCount: 15,
      temperature: 25.8,
      ph: 7.0,
      status: 'healthy',
    },
    {
      id: 3,
      name: 'Hồ Cá Nhỏ',
      dimensions: '60x30x30cm',
      volume: 54,
      fishCount: 8,
      temperature: 26.0,
      ph: 7.3,
      status: 'healthy',
    },
  ];

  const handleDeviceControl = (aquariumId, deviceId) => {
    console.log(`Điều khiển thiết bị ${deviceId} cho hồ cá ${aquariumId}`);
    // Implement device control logic here
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-moss-600 to-moss-700 rounded-xl p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold font-vietnamese">Chào mừng đến với Sinh Thái Thông Minh!</h1>
            <p className="text-moss-100 mt-1 text-sm sm:text-base">
              Hệ thống quản lý và điều khiển sinh thái thông minh của bạn.
            </p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <div className="text-right">
              <p className="text-sm text-moss-100">Trạng thái hệ thống</p>
              <p className="text-lg xl:text-xl font-semibold">Sinh thái hoạt động tốt</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS_CARDS.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendUp={stat.trendUp}
          />
        ))}
      </div>
      
      {/* Aquarium Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {aquariums.map((aquarium) => (
          <AquariumCard
            key={aquarium.id}
            aquarium={aquarium}
            onDeviceControl={handleDeviceControl}
          />
        ))}
      </div>
      
      {/* Main Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Device Control */}
        <DeviceControlCard aquarium={aquariums[0]} />
        
        {/* Feeding Schedule */}
        <FeedingScheduleCard />
      </div>
      
      {/* Sensor Monitoring */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <SensorMonitorCard />
      </div>
    </div>
  );
}
