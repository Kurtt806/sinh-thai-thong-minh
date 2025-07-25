import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Card';

export function SensorHistory({ sensor, timeRange }) {
  const getRecentEvents = () => {
    if (!sensor?.history) return [];
    
    const events = [];
    const history = sensor.history.slice(-10); // Last 10 readings
    
    history.forEach((point, index) => {
      if (index === 0) return;
      
      const prev = history[index - 1];
      const change = point.value - prev.value;
      const changePercent = Math.abs((change / prev.value) * 100);
      
      // Significant changes
      if (changePercent > 5) {
        events.push({
          time: point.time,
          type: change > 0 ? 'increase' : 'decrease',
          value: point.value,
          change: Math.abs(change),
          changePercent: changePercent.toFixed(1)
        });
      }
      
      // Check if out of optimal range
      const isOutOfRange = point.value < sensor.optimal[0] || point.value > sensor.optimal[1];
      const wasInRange = prev.value >= sensor.optimal[0] && prev.value <= sensor.optimal[1];
      
      if (isOutOfRange && wasInRange) {
        events.push({
          time: point.time,
          type: 'warning',
          value: point.value,
          message: point.value < sensor.optimal[0] ? 'Dưới mức tối ưu' : 'Vượt mức tối ưu'
        });
      } else if (!isOutOfRange && !wasInRange) {
        events.push({
          time: point.time,
          type: 'recovery',
          value: point.value,
          message: 'Trở lại mức tối ưu'
        });
      }
    });
    
    return events.slice(-5).reverse(); // Latest 5 events
  };

  const events = getRecentEvents();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} giờ trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'warning': return 'AlertTriangle';
      case 'recovery': return 'CheckCircle';
      default: return 'Activity';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'increase': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'decrease': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'warning': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'recovery': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lịch sử gần đây
        </h3>
        <Icon name="Clock" size={20} className="text-gray-400" />
      </div>
      
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getEventColor(event.type)}`}>
                <Icon name={getEventIcon(event.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.value} {sensor.unit}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(event.time)}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {event.message || (
                    event.type === 'increase' ? `Tăng ${event.changePercent}%` :
                    event.type === 'decrease' ? `Giảm ${event.changePercent}%` :
                    'Thay đổi'
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Icon name="Activity" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Chưa có sự kiện nào được ghi nhận</p>
        </div>
      )}
      
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {sensor.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Hiện tại</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {sensor.history ? sensor.history[sensor.history.length - 2]?.value.toFixed(1) || '--' : '--'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Trước đó</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
