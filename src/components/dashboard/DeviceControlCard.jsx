import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function DeviceControlCard({ aquarium }) {
  const devices = [
    {
      id: 'feeder',
      name: 'Máy Cho Ăn',
      icon: 'Fish',
      status: 'active',
      lastAction: 'Cho ăn lúc 14:30',
      controls: ['Cho ăn ngay', 'Lên lịch'],
    },
    {
      id: 'light',
      name: 'Đèn LED',
      icon: 'Lightbulb',
      status: 'on',
      brightness: 80,
      controls: ['Bật/Tắt', 'Điều chỉnh'],
    },
    {
      id: 'filter',
      name: 'Lọc Nước',
      icon: 'Filter',
      status: 'running',
      flow: '1200L/h',
      controls: ['Bật/Tắt', 'Tốc độ'],
    },
    {
      id: 'heater',
      name: 'Máy Sưởi',
      icon: 'Flame',
      status: 'auto',
      temperature: 26,
      controls: ['Auto/Manual', 'Nhiệt độ'],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'on':
      case 'running':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'auto':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'off':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-moss-600 dark:text-moss-400" />
          <span className="text-gray-900 dark:text-gray-100">Điều khiển thiết bị - {aquarium?.name || 'Hồ cá 1'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-moss-100 dark:bg-moss-900/30 rounded-lg flex items-center justify-center">
                    <Icon name={device.icon} size={20} className="text-moss-600 dark:text-moss-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{device.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {device.lastAction || `${device.flow || device.brightness || device.temperature || 'Hoạt động'}`}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(device.status)}`}>
                  {device.status === 'on' ? 'Bật' : 
                   device.status === 'off' ? 'Tắt' : 
                   device.status === 'running' ? 'Chạy' : 
                   device.status === 'auto' ? 'Tự động' : 'Hoạt động'}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {device.controls.map((control, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? 'default' : 'outline'}
                    size="sm"
                  >
                    {control}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
