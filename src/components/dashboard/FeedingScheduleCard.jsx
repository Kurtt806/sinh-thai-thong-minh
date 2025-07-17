import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function FeedingScheduleCard() {
  const feedingSchedule = [
    {
      id: 1,
      time: '08:00',
      aquarium: 'Hồ Cá Chính',
      amount: '5g',
      type: 'Thức ăn viên',
      status: 'completed',
      nextFeed: false,
    },
    {
      id: 2,
      time: '12:00',
      aquarium: 'Hồ Cá Nhỏ',
      amount: '3g',
      type: 'Thức ăn khô',
      status: 'pending',
      nextFeed: true,
    },
    {
      id: 3,
      time: '18:00',
      aquarium: 'Hồ Cá Chính',
      amount: '5g',
      type: 'Thức ăn viên',
      status: 'scheduled',
      nextFeed: false,
    },
    {
      id: 4,
      time: '20:00',
      aquarium: 'Hồ Cá Cảnh',
      amount: '2g',
      type: 'Thức ăn tươi',
      status: 'scheduled',
      nextFeed: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'scheduled':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Sắp tới';
      case 'scheduled':
        return 'Đã lên lịch';
      default:
        return 'Chưa rõ';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Icon name="Fish" size={20} className="mr-2 text-moss-600 dark:text-moss-400" />
            <span className="text-gray-900 dark:text-gray-100">Lịch cho ăn</span>
          </CardTitle>
          <Button size="sm" variant="outline">
            <Icon name="Plus" size={16} className="mr-1" />
            Thêm lịch
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {feedingSchedule.map((schedule) => (
            <div 
              key={schedule.id} 
              className={`p-3 border rounded-lg transition-all duration-200 ${
                schedule.nextFeed 
                  ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {schedule.nextFeed && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {schedule.time}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {schedule.aquarium}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{schedule.amount}</span>
                      <span>•</span>
                      <span>{schedule.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(schedule.status)}`}>
                    {getStatusText(schedule.status)}
                  </div>
                  {schedule.status === 'pending' && (
                    <Button size="sm" variant="outline">
                      <Icon name="Play" size={14} className="mr-1" />
                      Cho ăn ngay
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Lần cho ăn tiếp theo trong: <span className="font-medium text-yellow-600">25 phút</span>
            </span>
            <Button size="sm" variant="ghost">
              <Icon name="Settings" size={14} className="mr-1" />
              Cài đặt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
