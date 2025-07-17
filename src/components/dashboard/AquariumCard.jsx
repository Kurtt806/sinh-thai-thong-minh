import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { AQUARIUM_DEVICES } from '@/constants/dashboard';

export function AquariumCard({ aquarium, onDeviceControl }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'on':
      case 'running':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'auto':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'off':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      default:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl flex items-center min-w-0">
            <Icon name="Waves" size={20} className="mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 sm:w-6 sm:h-6" />
            <span className="text-gray-900 dark:text-gray-100 truncate">{aquarium.name}</span>
          </CardTitle>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">Hoạt động</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex-wrap">
          <span>📏 {aquarium.dimensions}</span>
          <span>🌊 {aquarium.volume}L</span>
          <span>🐟 {aquarium.fishCount} cá</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thông tin môi trường */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">Nhiệt độ</span>
            </div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{aquarium.temperature}°C</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">pH</span>
            </div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{aquarium.ph}</p>
          </div>
        </div>

        {/* Thiết bị điều khiển */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">Thiết bị</h4>
          <div className="grid grid-cols-2 gap-2">
            {AQUARIUM_DEVICES.map((device) => (
              <Button
                key={device.id}
                variant="outline"
                size="sm"
                className={`justify-start text-xs sm:text-sm ${getStatusColor(device.status)}`}
                onClick={() => onDeviceControl(aquarium.id, device.id)}
              >
                <Icon name={device.icon} size={18} className="mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{device.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Cho ăn nhanh */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button 
            className="w-full text-sm sm:text-base"
            onClick={() => onDeviceControl(aquarium.id, 'quick-feed')}
          >
            <Icon name="Fish" size={18} className="mr-2 flex-shrink-0" />
            Cho Ăn Ngay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
