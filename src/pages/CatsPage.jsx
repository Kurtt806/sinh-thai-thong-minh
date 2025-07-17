import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function CatsPage() {
  const [cats] = useState([
    {
      id: 1,
      name: 'Whiskers',
      breed: 'Persian',
      age: 2,
      weight: 4.5,
      lastFed: '1 giờ trước',
      lastLitter: '30 phút trước',
      health: 'Khỏe mạnh',
      vaccinated: true,
      spayed: true,
      indoor: true,
    },
    {
      id: 2,
      name: 'Shadow',
      breed: 'British Shorthair',
      age: 4,
      weight: 5.2,
      lastFed: '2 giờ trước',
      lastLitter: '1 giờ trước',
      health: 'Khỏe mạnh',
      vaccinated: true,
      spayed: false,
      indoor: false,
    },
  ]);

  const handleFeedCat = (catId) => {
    console.log(`Cho mèo ${catId} ăn`);
  };

  const handleCleanLitter = (catId) => {
    console.log(`Dọn cát cho mèo ${catId}`);
  };

  const handleHealthCheck = (catId) => {
    console.log(`Kiểm tra sức khỏe mèo ${catId}`);
  };

  const handlePlay = (catId) => {
    console.log(`Chơi với mèo ${catId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quản lý Mèo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Theo dõi và chăm sóc những người bạn mèo cưng
          </p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Thêm Mèo
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số mèo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Cat" size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Đã tiêm vaccine</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2/2</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mèo nhà</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1/2</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Home" size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sức khỏe</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">Tốt</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cats List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {cats.map((cat) => (
          <Card key={cat.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Cat" size={20} className="mr-2 text-purple-600" />
                {cat.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Giống:</span>
                  <p className="font-medium">{cat.breed}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Tuổi:</span>
                  <p className="font-medium">{cat.age} tuổi</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Cân nặng:</span>
                  <p className="font-medium">{cat.weight}kg</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Sức khỏe:</span>
                  <p className="font-medium text-green-600">{cat.health}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Lần ăn cuối:</span>
                  <span>{cat.lastFed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Dọn cát cuối:</span>
                  <span>{cat.lastLitter}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {cat.vaccinated && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                    Đã tiêm
                  </span>
                )}
                {cat.spayed && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    Đã triệt sản
                  </span>
                )}
                {cat.indoor && (
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                    Mèo nhà
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleFeedCat(cat.id)}
                  className="flex-1"
                >
                  <Icon name="Cookie" size={16} className="mr-1" />
                  Cho Ăn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCleanLitter(cat.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePlay(cat.id)}
                >
                  <Icon name="Zap" size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleHealthCheck(cat.id)}
                >
                  <Icon name="Heart" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
