import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function FishPage() {
  const [fishTanks] = useState([
    {
      id: 1,
      name: 'Hồ Cá Chính',
      dimensions: '120x60x50cm',
      volume: 360,
      fishCount: 25,
      temperature: 26.5,
      ph: 7.2,
      status: 'healthy',
      fishTypes: ['Cá Vàng', 'Cá Neon', 'Cá Betta'],
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
      fishTypes: ['Cá Thiên Thần', 'Cá Rồng'],
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
      fishTypes: ['Cá Molly', 'Cá Guppy'],
    },
  ]);

  const handleFeedFish = (tankId) => {
    console.log(`Cho cá ăn trong hồ ${tankId}`);
  };

  const handleControlDevice = (tankId, device) => {
    console.log(`Điều khiển ${device} trong hồ ${tankId}`);
  };

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
        <Button>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">48</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">26°C</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Độ pH TB</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">7.2</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Droplets" size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fish Tanks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fishTanks.map((tank) => (
          <Card key={tank.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Waves" size={20} className="mr-2 text-blue-600" />
                {tank.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Kích thước:</span>
                  <p className="font-medium">{tank.dimensions}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Thể tích:</span>
                  <p className="font-medium">{tank.volume}L</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Số cá:</span>
                  <p className="font-medium">{tank.fishCount}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Nhiệt độ:</span>
                  <p className="font-medium">{tank.temperature}°C</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loại cá:</p>
                <div className="flex flex-wrap gap-1">
                  {tank.fishTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleFeedFish(tank.id)}
                  className="flex-1"
                >
                  <Icon name="Fish" size={16} className="mr-1" />
                  Cho Ăn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleControlDevice(tank.id, 'light')}
                >
                  <Icon name="Sun" size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleControlDevice(tank.id, 'filter')}
                >
                  <Icon name="Filter" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
