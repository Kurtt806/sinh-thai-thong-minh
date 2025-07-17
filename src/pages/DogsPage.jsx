import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function DogsPage() {
  const [dogs] = useState([
    {
      id: 1,
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      weight: 25,
      lastFed: '2 giờ trước',
      lastWalk: '1 giờ trước',
      health: 'Khỏe mạnh',
      vaccinated: true,
      microchipped: true,
    },
    {
      id: 2,
      name: 'Max',
      breed: 'German Shepherd',
      age: 5,
      weight: 35,
      lastFed: '3 giờ trước',
      lastWalk: '30 phút trước',
      health: 'Khỏe mạnh',
      vaccinated: true,
      microchipped: true,
    },
    {
      id: 3,
      name: 'Luna',
      breed: 'Labrador',
      age: 2,
      weight: 20,
      lastFed: '1 giờ trước',
      lastWalk: '2 giờ trước',
      health: 'Khỏe mạnh',
      vaccinated: true,
      microchipped: false,
    },
  ]);

  const handleFeedDog = (dogId) => {
    console.log(`Cho chó ${dogId} ăn`);
  };

  const handleWalkDog = (dogId) => {
    console.log(`Dắt chó ${dogId} đi dạo`);
  };

  const handleHealthCheck = (dogId) => {
    console.log(`Kiểm tra sức khỏe chó ${dogId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quản lý Chó
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Theo dõi và chăm sóc những người bạn bốn chân
          </p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Thêm Chó
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số chó</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Dog" size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Đã tiêm vaccine</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3/3</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Cần đi dạo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-blue-600 dark:text-blue-400" />
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

      {/* Dogs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <Card key={dog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Dog" size={20} className="mr-2 text-amber-600" />
                {dog.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Giống:</span>
                  <p className="font-medium">{dog.breed}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Tuổi:</span>
                  <p className="font-medium">{dog.age} tuổi</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Cân nặng:</span>
                  <p className="font-medium">{dog.weight}kg</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Sức khỏe:</span>
                  <p className="font-medium text-green-600">{dog.health}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Lần ăn cuối:</span>
                  <span>{dog.lastFed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Lần dạo cuối:</span>
                  <span>{dog.lastWalk}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  {dog.vaccinated && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                      Đã tiêm
                    </span>
                  )}
                  {dog.microchipped && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                      Chip
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleFeedDog(dog.id)}
                  className="flex-1"
                >
                  <Icon name="Cookie" size={16} className="mr-1" />
                  Cho Ăn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleWalkDog(dog.id)}
                >
                  <Icon name="MapPin" size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleHealthCheck(dog.id)}
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
