import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SensorChart } from '@/components/sensors/SensorChart';
import { SensorCard } from '@/components/sensors/SensorCard';
import { SensorHistory } from '@/components/sensors/SensorHistory';

export function SensorsPage() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data cho các cảm biến
  const [sensorData, setSensorData] = useState({
    o2: {
      id: 'o2',
      name: 'Oxy (O₂)',
      value: 8.2,
      unit: 'mg/L',
      min: 6.0,
      max: 10.0,
      optimal: [7.0, 9.0],
      icon: 'Wind',
      color: 'blue',
      history: generateMockData(24, 6, 10)
    },
    ph: {
      id: 'ph',
      name: 'Độ pH',
      value: 7.1,
      unit: 'pH',
      min: 6.0,
      max: 8.5,
      optimal: [6.8, 7.4],
      icon: 'Droplets',
      color: 'green',
      history: generateMockData(24, 6.5, 7.8)
    },
    voltage: {
      id: 'voltage',
      name: 'Điện áp Hub',
      value: 12.3,
      unit: 'V',
      min: 11.0,
      max: 13.0,
      optimal: [12.0, 12.5],
      icon: 'Zap',
      color: 'yellow',
      history: generateMockData(24, 11.8, 12.6)
    },
    temperature: {
      id: 'temperature',
      name: 'Nhiệt độ',
      value: 26.5,
      unit: '°C',
      min: 20.0,
      max: 30.0,
      optimal: [24.0, 28.0],
      icon: 'Thermometer',
      color: 'red',
      history: generateMockData(24, 24, 28)
    },
    humidity: {
      id: 'humidity',
      name: 'Độ ẩm',
      value: 68.2,
      unit: '%',
      min: 40.0,
      max: 80.0,
      optimal: [60.0, 75.0],
      icon: 'CloudRain',
      color: 'cyan',
      history: generateMockData(24, 55, 75)
    },
    tds: {
      id: 'tds',
      name: 'TDS (Chất rắn hòa tan)',
      value: 320,
      unit: 'ppm',
      min: 200,
      max: 500,
      optimal: [250, 400],
      icon: 'Beaker',
      color: 'purple',
      history: generateMockData(24, 250, 400)
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const sensor = updated[key];
          const variation = (Math.random() - 0.5) * 0.2;
          let newValue = sensor.value + variation;
          
          // Keep within reasonable bounds
          newValue = Math.max(sensor.min, Math.min(sensor.max, newValue));
          
          updated[key] = {
            ...sensor,
            value: Number(newValue.toFixed(1))
          };
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (sensor) => {
    const { value, optimal } = sensor;
    if (value >= optimal[0] && value <= optimal[1]) {
      return { status: 'good', color: 'green', text: 'Tốt' };
    } else if (value < optimal[0] * 0.9 || value > optimal[1] * 1.1) {
      return { status: 'warning', color: 'red', text: 'Cảnh báo' };
    } else {
      return { status: 'caution', color: 'yellow', text: 'Chú ý' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Giám sát Cảm biến
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Theo dõi các thông số môi trường thời gian thực
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="1h">1 giờ</option>
            <option value="6h">6 giờ</option>
            <option value="24h">24 giờ</option>
            <option value="7d">7 ngày</option>
          </select>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 dark:text-green-300 font-medium">
              Đang cập nhật
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(sensorData).map((sensor) => {
          const status = getSensorStatus(sensor);
          return (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
              status={status}
              onClick={() => setSelectedSensor(sensor)}
              isSelected={selectedSensor?.id === sensor.id}
            />
          );
        })}
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Biểu đồ theo dõi
              </h2>
              {selectedSensor && (
                <Badge variant="outline" className="px-3 py-1">
                  <Icon name={selectedSensor.icon} size={16} className="mr-2" />
                  {selectedSensor.name}
                </Badge>
              )}
            </div>
            
            {selectedSensor ? (
              <SensorChart 
                sensor={selectedSensor} 
                timeRange={timeRange}
              />
            ) : (
              <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Icon name="LineChart" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Chọn một cảm biến để xem biểu đồ chi tiết</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sensor History & Stats */}
        <div className="space-y-6">
          {selectedSensor && (
            <>
              <SensorHistory 
                sensor={selectedSensor}
                timeRange={timeRange}
              />
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thống kê
                </h3>
                <div className="space-y-3">
                  <StatItem 
                    label="Giá trị hiện tại"
                    value={`${selectedSensor.value} ${selectedSensor.unit}`}
                    status={getSensorStatus(selectedSensor).status}
                  />
                  <StatItem 
                    label="Khoảng tối ưu"
                    value={`${selectedSensor.optimal[0]} - ${selectedSensor.optimal[1]} ${selectedSensor.unit}`}
                    status="neutral"
                  />
                  <StatItem 
                    label="Giới hạn"
                    value={`${selectedSensor.min} - ${selectedSensor.max} ${selectedSensor.unit}`}
                    status="neutral"
                  />
                </div>
              </Card>
            </>
          )}
          
          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tình trạng hệ thống
            </h3>
            <div className="space-y-3">
              <SystemStatusItem 
                label="Tổng số cảm biến"
                value="6"
                status="good"
              />
              <SystemStatusItem 
                label="Hoạt động bình thường"
                value={Object.values(sensorData).filter(s => 
                  getSensorStatus(s).status === 'good'
                ).length.toString()}
                status="good"
              />
              <SystemStatusItem 
                label="Cần chú ý"
                value={Object.values(sensorData).filter(s => 
                  getSensorStatus(s).status !== 'good'
                ).length.toString()}
                status={Object.values(sensorData).some(s => 
                  getSensorStatus(s).status === 'warning'
                ) ? 'warning' : 'good'}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatItem({ label, value, status }) {
  const statusColors = {
    good: 'text-green-600 dark:text-green-400',
    warning: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${statusColors[status]}`}>
        {value}
      </span>
    </div>
  );
}

function SystemStatusItem({ label, value, status }) {
  const statusColors = {
    good: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>
        {value}
      </span>
    </div>
  );
}

// Helper function to generate mock data
function generateMockData(hours, min, max) {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const value = min + Math.random() * (max - min);
    data.push({
      time: time.toISOString(),
      value: Number(value.toFixed(1))
    });
  }
  
  return data;
}
