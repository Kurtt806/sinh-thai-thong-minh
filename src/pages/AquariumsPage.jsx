import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function AquariumsPage() {
  const [selectedAquarium, setSelectedAquarium] = useState(null);
  
  const aquariums = [
    {
      id: 1,
      name: 'Hồ Cá Chính',
      dimensions: '120x60x50cm',
      volume: 360,
      fishCount: 25,
      temperature: 26.5,
      ph: 7.2,
      oxygen: 8.5,
      salinity: 35,
      status: 'healthy',
      fishTypes: ['Cá vàng', 'Cá bảy màu', 'Cá thiên thần'],
      lastCleaned: '3 ngày trước',
      nextFeeding: '2 giờ nữa',
    },
    {
      id: 2,
      name: 'Hồ Cá Cảnh',
      dimensions: '80x40x40cm',
      volume: 128,
      fishCount: 15,
      temperature: 25.8,
      ph: 7.0,
      oxygen: 8.2,
      salinity: 34,
      status: 'healthy',
      fishTypes: ['Cá neon', 'Cá guppy'],
      lastCleaned: '1 ngày trước',
      nextFeeding: '1 giờ nữa',
    },
    {
      id: 3,
      name: 'Hồ Cá Nhỏ',
      dimensions: '60x30x30cm',
      volume: 54,
      fishCount: 8,
      temperature: 26.0,
      ph: 7.3,
      oxygen: 8.8,
      salinity: 36,
      status: 'warning',
      fishTypes: ['Cá beta'],
      lastCleaned: '5 ngày trước',
      nextFeeding: '30 phút nữa',
    },
    {
      id: 4,
      name: 'Hồ Cá Mới',
      dimensions: '100x50x45cm',
      volume: 225,
      fishCount: 0,
      temperature: 24.5,
      ph: 6.8,
      oxygen: 9.0,
      salinity: 0,
      status: 'setting_up',
      fishTypes: [],
      lastCleaned: 'Hôm nay',
      nextFeeding: 'Chưa cần',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'setting_up':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
        return 'Khỏe mạnh';
      case 'warning':
        return 'Cần chú ý';
      case 'critical':
        return 'Nguy hiểm';
      case 'setting_up':
        return 'Đang thiết lập';
      default:
        return 'Không rõ';
    }
  };

  const getParameterColor = (param, value) => {
    // Simplified logic for demo
    if (param === 'ph' && (value < 6.5 || value > 8.0)) return 'text-red-600';
    if (param === 'temperature' && (value < 24 || value > 28)) return 'text-red-600';
    if (param === 'oxygen' && value < 6) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">🐟 Quản Lý Hồ Cá</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Theo dõi và quản lý tất cả hồ cá của bạn
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Icon name="Settings" size={18} className="mr-2" />
            Cài đặt chung
          </Button>
          <Button>
            <Icon name="Plus" size={18} className="mr-2" />
            Thêm hồ cá
          </Button>
        </div>
      </div>

      {/* Aquarium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aquariums.map((aquarium) => (
          <Card 
            key={aquarium.id} 
            className={`hover:shadow-lg transition-all cursor-pointer ${
              selectedAquarium?.id === aquarium.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedAquarium(aquarium)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Icon name="Waves" size={20} className="mr-2 text-blue-600" />
                  {aquarium.name}
                </CardTitle>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(aquarium.status)}`}>
                  {getStatusText(aquarium.status)}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>📏 {aquarium.dimensions}</span>
                <span>🌊 {aquarium.volume}L</span>
                <span>🐟 {aquarium.fishCount} cá</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Thông số môi trường */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Thermometer" size={14} className="text-blue-600" />
                    <span className="text-sm">Nhiệt độ</span>
                  </div>
                  <p className={`font-bold ${getParameterColor('temperature', aquarium.temperature)}`}>
                    {aquarium.temperature}°C
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Droplets" size={14} className="text-green-600" />
                    <span className="text-sm">pH</span>
                  </div>
                  <p className={`font-bold ${getParameterColor('ph', aquarium.ph)}`}>
                    {aquarium.ph}
                  </p>
                </div>
                
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Wind" size={14} className="text-cyan-600" />
                    <span className="text-sm">Oxy</span>
                  </div>
                  <p className={`font-bold ${getParameterColor('oxygen', aquarium.oxygen)}`}>
                    {aquarium.oxygen}mg/L
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Waves" size={14} className="text-purple-600" />
                    <span className="text-sm">Độ mặn</span>
                  </div>
                  <p className="font-bold text-purple-600">
                    {aquarium.salinity}‰
                  </p>
                </div>
              </div>

              {/* Thông tin cá */}
              {aquarium.fishTypes.length > 0 && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Icon name="Fish" size={16} className="mr-2 text-orange-600" />
                    Loại cá
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aquarium.fishTypes.map((fishType, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs"
                      >
                        {fishType}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Thông tin bảo dưỡng */}
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Làm sạch cuối:</span>
                  <span>{aquarium.lastCleaned}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cho ăn tiếp theo:</span>
                  <span className="text-orange-600">{aquarium.nextFeeding}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" className="flex-1">
                  <Icon name="Fish" size={14} className="mr-1" />
                  Cho ăn
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Icon name="Settings" size={14} className="mr-1" />
                  Thiết bị
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Aquarium Details */}
      {selectedAquarium && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Info" size={20} className="mr-2" />
              Chi tiết {selectedAquarium.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Thông tin chung</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Kích thước:</span>
                    <span>{selectedAquarium.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thể tích:</span>
                    <span>{selectedAquarium.volume}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số lượng cá:</span>
                    <span>{selectedAquarium.fishCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <span className={getStatusColor(selectedAquarium.status)}>
                      {getStatusText(selectedAquarium.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Thông số nước</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nhiệt độ:</span>
                    <span className={getParameterColor('temperature', selectedAquarium.temperature)}>
                      {selectedAquarium.temperature}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>pH:</span>
                    <span className={getParameterColor('ph', selectedAquarium.ph)}>
                      {selectedAquarium.ph}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oxy:</span>
                    <span className={getParameterColor('oxygen', selectedAquarium.oxygen)}>
                      {selectedAquarium.oxygen}mg/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Độ mặn:</span>
                    <span>{selectedAquarium.salinity}‰</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Bảo dưỡng</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Làm sạch cuối:</span>
                    <span>{selectedAquarium.lastCleaned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cho ăn tiếp theo:</span>
                    <span>{selectedAquarium.nextFeeding}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button size="sm" className="w-full">
                    <Icon name="Settings" size={14} className="mr-2" />
                    Cài đặt chi tiết
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Icon name="BarChart3" size={14} className="mr-2" />
                    Xem biểu đồ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
