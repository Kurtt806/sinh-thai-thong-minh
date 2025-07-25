import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

export function FeedingPage() {
  const [feedingSchedules, setFeedingSchedules] = useState([
    {
      id: 1,
      name: 'Lịch cho ăn buổi sáng',
      time: '08:00',
      location: 'Hồ cá chính',
      amount: '5g',
      foodType: 'Thức ăn viên cao cấp',
      status: 'completed',
      lastFed: '2025-07-25 08:00',
      nextFeed: '2025-07-26 08:00',
      isActive: true,
      repeatDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      id: 2,
      name: 'Lịch cho ăn buổi trưa',
      time: '12:00',
      location: 'Hồ cá cảnh',
      amount: '3g',
      foodType: 'Thức ăn nổi',
      status: 'pending',
      lastFed: '2025-07-24 12:00',
      nextFeed: '2025-07-25 12:00',
      isActive: true,
      repeatDays: ['Mon', 'Wed', 'Fri', 'Sun']
    },
    {
      id: 3,
      name: 'Lịch cho ăn buổi tối',
      time: '18:00',
      location: 'Hồ cá chính',
      amount: '5g',
      foodType: 'Thức ăn viên cao cấp',
      status: 'scheduled',
      lastFed: '2025-07-24 18:00',
      nextFeed: '2025-07-25 18:00',
      isActive: true,
      repeatDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      id: 4,
      name: 'Lịch cho ăn đặc biệt',
      time: '20:00',
      location: 'Hồ cá nhỏ',
      amount: '2g',
      foodType: 'Thức ăn khô',
      status: 'scheduled',
      lastFed: '2025-07-24 20:00',
      nextFeed: '2025-07-25 20:00',
      isActive: false,
      repeatDays: ['Sat', 'Sun']
    }
  ]);

  const [feedingHistory, setFeedingHistory] = useState([
    {
      id: 1,
      time: '2025-07-25 08:00',
      location: 'Hồ cá chính',
      amount: '5g',
      foodType: 'Thức ăn viên cao cấp',
      method: 'Tự động',
      status: 'success',
      notes: 'Cho ăn thành công'
    },
    {
      id: 2,
      time: '2025-07-24 18:00',
      location: 'Hồ cá chính',
      amount: '5g',
      foodType: 'Thức ăn viên cao cấp',
      method: 'Thủ công',
      status: 'success',
      notes: 'Cho ăn bằng tay'
    },
    {
      id: 3,
      time: '2025-07-24 12:00',
      location: 'Hồ cá cảnh',
      amount: '3g',
      foodType: 'Thức ăn nổi',
      method: 'Tự động',
      status: 'failed',
      notes: 'Lỗi máy cho ăn - đã xử lý thủ công'
    }
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Đang chờ';
      case 'scheduled': return 'Đã lên lịch';
      case 'failed': return 'Thất bại';
      default: return 'Không xác định';
    }
  };

  const handleFeedNow = (scheduleId) => {
    const schedule = feedingSchedules.find(s => s.id === scheduleId);
    if (schedule) {
      const now = new Date().toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
      const newHistoryEntry = {
        id: Date.now(),
        time: now,
        location: schedule.location,
        amount: schedule.amount,
        foodType: schedule.foodType,
        method: 'Thủ công',
        status: 'success',
        notes: 'Cho ăn ngay lập tức'
      };
      
      setFeedingHistory([newHistoryEntry, ...feedingHistory]);
      
      // Update schedule status
      setFeedingSchedules(feedingSchedules.map(s => 
        s.id === scheduleId ? { ...s, status: 'completed', lastFed: now } : s
      ));
    }
  };

  const toggleSchedule = (scheduleId) => {
    setFeedingSchedules(feedingSchedules.map(s => 
      s.id === scheduleId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const completedToday = feedingSchedules.filter(s => s.status === 'completed').length;
  const pendingToday = feedingSchedules.filter(s => s.status === 'pending').length;
  const totalFeedings = feedingHistory.length;
  const successRate = Math.round((feedingHistory.filter(h => h.status === 'success').length / totalFeedings) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Icon name="Coffee" size={32} className="text-moss-600" />
            Quản lý Cho ăn
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Lên lịch và theo dõi việc cho ăn cho tất cả hồ cá
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Calendar" size={16} className="mr-2" />
            Xem lịch
          </Button>
          <Button onClick={() => setShowScheduleModal(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Thêm lịch
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Hoàn thành hôm nay
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedToday}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Đang chờ
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingToday}
              </p>
            </div>
            <Icon name="Clock" size={24} className="text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tổng lần cho ăn
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {totalFeedings}
              </p>
            </div>
            <Icon name="BarChart3" size={24} className="text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tỷ lệ thành công
              </p>
              <p className="text-2xl font-bold text-moss-600">
                {successRate}%
              </p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-moss-500" />
          </div>
        </Card>
      </div>

      {/* Current Schedules & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feeding Schedules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calendar" size={20} className="text-moss-600" />
              Lịch cho ăn hôm nay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedingSchedules.map((schedule) => (
              <div 
                key={schedule.id} 
                className={`p-4 rounded-lg border ${
                  schedule.status === 'pending' 
                    ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-moss-600">
                      {schedule.time}
                    </div>
                    <Badge className={getStatusColor(schedule.status)}>
                      {getStatusText(schedule.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleSchedule(schedule.id)}
                    >
                      <Icon 
                        name={schedule.isActive ? "Pause" : "Play"} 
                        size={14} 
                      />
                    </Button>
                    {schedule.status === 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => handleFeedNow(schedule.id)}
                      >
                        <Icon name="Play" size={14} className="mr-1" />
                        Cho ăn ngay
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>📍 {schedule.location}</span>
                    <span>🥄 {schedule.amount}</span>
                    <span>🍽️ {schedule.foodType}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Zap" size={20} className="text-moss-600" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 flex-col">
                <Icon name="Coffee" size={24} className="mb-1" />
                <span className="text-sm">Cho ăn tất cả</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Icon name="Pause" size={24} className="mb-1" />
                <span className="text-sm">Tạm dừng</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Icon name="Settings" size={24} className="mb-1" />
                <span className="text-sm">Cài đặt</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Icon name="BarChart3" size={24} className="mb-1" />
                <span className="text-sm">Thống kê</span>
              </Button>
            </div>

            {/* Next Feeding Info */}
            <div className="p-4 bg-moss-50 dark:bg-moss-900/20 rounded-lg">
              <h4 className="font-medium text-moss-900 dark:text-moss-100 mb-2">
                Lần cho ăn tiếp theo
              </h4>
              <div className="text-sm text-moss-700 dark:text-moss-300">
                <div className="flex items-center justify-between">
                  <span>Thời gian:</span>
                  <span className="font-medium">12:00 - Hồ cá cảnh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Còn lại:</span>
                  <span className="font-medium">2 giờ 15 phút</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feeding History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={20} className="text-moss-600" />
            Lịch sử cho ăn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feedingHistory.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    entry.status === 'success' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                  }`}>
                    <Icon 
                      name={entry.status === 'success' ? 'Check' : 'X'} 
                      size={16} 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {entry.location} - {entry.amount}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {entry.foodType} • {entry.method}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(entry.time).toLocaleString('vi-VN')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline">
              <Icon name="MoreHorizontal" size={16} className="mr-2" />
              Xem thêm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Thêm lịch cho ăn</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowScheduleModal(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên lịch</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg" 
                  placeholder="Nhập tên lịch cho ăn"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Thời gian</label>
                <input 
                  type="time" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Vị trí</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Hồ cá chính</option>
                  <option>Hồ cá cảnh</option>
                  <option>Hồ cá nhỏ</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Lượng thức ăn</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg" 
                  placeholder="Ví dụ: 5g"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Loại thức ăn</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Thức ăn viên cao cấp</option>
                  <option>Thức ăn nổi</option>
                  <option>Thức ăn khô</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowScheduleModal(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={() => setShowScheduleModal(false)}>
                  Thêm lịch
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
