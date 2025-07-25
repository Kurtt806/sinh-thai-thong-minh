import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export function FishTankCard({ tank, onFeedFish, onControlDevice, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getDeviceStatusIcon = (device, status) => {
    const baseClasses = "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors";
    
    if (status === 'on') {
      return `${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`;
    } else if (status === 'off') {
      return `${baseClasses} bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400`;
    } else if (status === 'auto') {
      return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400`;
    }
  };

  const formatDimensions = (dimensions) => {
    return `${dimensions.length}×${dimensions.width}×${dimensions.height}cm`;
  };

  const totalFish = tank.fishTypes.reduce((sum, fish) => sum + fish.count, 0);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Icon name="Waves" size={20} className="mr-2 text-blue-600" />
            {tank.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusColor(tank.status)}>
              {tank.status === 'healthy' ? 'Khỏe mạnh' : 
               tank.status === 'warning' ? 'Cảnh báo' : 'Nghiêm trọng'}
            </Badge>
            {tank.alerts.length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <span className="text-gray-600 dark:text-gray-400 text-xs">Kích thước</span>
            <p className="font-medium">{formatDimensions(tank.dimensions)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-600 dark:text-gray-400 text-xs">Thể tích</span>
            <p className="font-medium">{tank.volume}L</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-600 dark:text-gray-400 text-xs">Số cá</span>
            <p className="font-medium">{totalFish} con</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-600 dark:text-gray-400 text-xs">Nhiệt độ</span>
            <p className="font-medium">{tank.temperature}°C</p>
          </div>
        </div>

        {/* Water Parameters */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">pH</div>
              <div className="font-semibold text-sm">{tank.ph}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">O₂</div>
              <div className="font-semibold text-sm">{tank.oxygen} mg/L</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">Temp</div>
              <div className="font-semibold text-sm">{tank.temperature}°C</div>
            </div>
          </div>
        </div>

        {/* Fish Types */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Loại cá ({tank.fishTypes.length} loại)</p>
          <div className="flex flex-wrap gap-1">
            {tank.fishTypes.slice(0, 3).map((fish, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
              >
                {fish.name} ({fish.count})
              </span>
            ))}
            {tank.fishTypes.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                +{tank.fishTypes.length - 3} khác
              </span>
            )}
          </div>
        </div>

        {/* Device Status */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Thiết bị</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div 
                className={getDeviceStatusIcon('filter', tank.devices.filter.status)}
                title={`Lọc nước: ${tank.devices.filter.status}`}
              >
                <Icon name="Filter" size={12} />
              </div>
              <div 
                className={getDeviceStatusIcon('heater', tank.devices.heater.status)}
                title={`Máy sưởi: ${tank.devices.heater.status}`}
              >
                <Icon name="Thermometer" size={12} />
              </div>
              <div 
                className={getDeviceStatusIcon('light', tank.devices.light.status)}
                title={`Đèn: ${tank.devices.light.status}`}
              >
                <Icon name="Sun" size={12} />
              </div>
              <div 
                className={getDeviceStatusIcon('aerator', tank.devices.aerator.status)}
                title={`Máy sục khí: ${tank.devices.aerator.status}`}
              >
                <Icon name="Wind" size={12} />
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {tank.feeding.lastFed && (
                <span>Ăn: {new Date(tank.feeding.lastFed).toLocaleTimeString('vi-VN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            size="sm"
            onClick={() => onFeedFish(tank.id)}
            className="flex-1"
          >
            <Icon name="Fish" size={14} className="mr-1" />
            Cho Ăn
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onControlDevice(tank.id, 'light')}
          >
            <Icon name="Sun" size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onControlDevice(tank.id, 'filter')}
          >
            <Icon name="Filter" size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(tank)}
          >
            <Icon name="Settings" size={14} />
          </Button>
        </div>

        {/* Alerts */}
        {tank.alerts.length > 0 && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            {tank.alerts.slice(0, 2).map((alert, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <Icon name="AlertTriangle" size={12} className="text-orange-500" />
                <span className="text-gray-600 dark:text-gray-400">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
