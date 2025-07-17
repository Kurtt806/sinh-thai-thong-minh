import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { SENSOR_DATA } from '@/constants/dashboard';

export function SensorMonitorCard() {
  const getSensorStatus = (value, range) => {
    // Simplified logic for demo
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Thermometer" size={20} className="mr-2 text-moss-600 dark:text-moss-400" />
          <span className="text-gray-900 dark:text-gray-100">Cảm biến môi trường</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SENSOR_DATA.map((sensor) => (
            <div key={sensor.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={sensor.icon} size={16} className="text-moss-600 dark:text-moss-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{sensor.name}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                  {sensor.status === 'normal' ? 'Bình thường' : 
                   sensor.status === 'good' ? 'Tốt' : 
                   sensor.status === 'warning' ? 'Cảnh báo' : 'Nguy hiểm'}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Giá trị:</span>
                  <span className="text-lg font-bold text-moss-600 dark:text-moss-400">{sensor.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Khoảng an toàn:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{sensor.range}</span>
                </div>
              </div>
              
              {/* Progress bar for visual representation */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-moss-600 dark:bg-moss-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
