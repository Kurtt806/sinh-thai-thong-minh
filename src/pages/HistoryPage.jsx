import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

export function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'feeding',
      action: 'Cho ăn tự động',
      location: 'Hồ cá chính',
      details: 'Cho ăn 5g thức ăn viên cao cấp',
      timestamp: '2025-07-25 08:00:00',
      status: 'success',
      user: 'Hệ thống',
      icon: 'Coffee'
    },
    {
      id: 2,
      type: 'device',
      action: 'Bật đèn LED',
      location: 'Hồ cá cảnh',
      details: 'Độ sáng: 80%, Chế độ: Tự động',
      timestamp: '2025-07-25 06:00:00',
      status: 'success',
      user: 'Hệ thống',
      icon: 'Lightbulb'
    },
    {
      id: 3,
      type: 'alert',
      action: 'Cảnh báo nhiệt độ',
      location: 'Hồ cá nhỏ',
      details: 'Nhiệt độ: 28.5°C (Vượt ngưỡng)',
      timestamp: '2025-07-25 02:15:00',
      status: 'warning',
      user: 'Cảm biến',
      icon: 'AlertTriangle'
    },
    {
      id: 4,
      type: 'maintenance',
      action: 'Thay nước định kỳ',
      location: 'Hồ cá chính',
      details: 'Thay 25% nước, kiểm tra độ pH',
      timestamp: '2025-07-24 18:30:00',
      status: 'success',
      user: 'Admin',
      icon: 'Droplets'
    },
    {
      id: 5,
      type: 'device',
      action: 'Lỗi máy lọc',
      location: 'Hồ cá cảnh',
      details: 'Máy lọc ngừng hoạt động - Cần kiểm tra',
      timestamp: '2025-07-24 15:45:00',
      status: 'error',
      user: 'Hệ thống',
      icon: 'Filter'
    },
    {
      id: 6,
      type: 'feeding',
      action: 'Cho ăn thủ công',
      location: 'Hồ cá nhỏ',
      details: 'Cho ăn 3g thức ăn khô',
      timestamp: '2025-07-24 12:00:00',
      status: 'success',
      user: 'Admin',
      icon: 'Coffee'
    },
    {
      id: 7,
      type: 'system',
      action: 'Khởi động hệ thống',
      location: 'Tất cả',
      details: 'Hệ thống khởi động thành công',
      timestamp: '2025-07-24 07:00:00',
      status: 'info',
      user: 'Hệ thống',
      icon: 'Power'
    },
    {
      id: 8,
      type: 'sensor',
      action: 'Cập nhật dữ liệu cảm biến',
      location: 'Hồ cá chính',
      details: 'pH: 7.2, Nhiệt độ: 26.5°C, O2: 8.5mg/L',
      timestamp: '2025-07-24 06:30:00',
      status: 'success',
      user: 'Cảm biến',
      icon: 'Activity'
    },
    {
      id: 9,
      type: 'device',
      action: 'Bảo trì máy sưởi',
      location: 'Hồ cá chính',
      details: 'Kiểm tra và làm sạch máy sưởi',
      timestamp: '2025-07-23 20:00:00',
      status: 'success',
      user: 'Admin',
      icon: 'Thermometer'
    },
    {
      id: 10,
      type: 'alert',
      action: 'Cảnh báo mức nước thấp',
      location: 'Hồ cá cảnh',
      details: 'Mức nước giảm 15% so với bình thường',
      timestamp: '2025-07-23 14:20:00',
      status: 'warning',
      user: 'Cảm biến',
      icon: 'Waves'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'Tất cả', icon: 'List' },
    { value: 'feeding', label: 'Cho ăn', icon: 'Coffee' },
    { value: 'device', label: 'Thiết bị', icon: 'Settings' },
    { value: 'alert', label: 'Cảnh báo', icon: 'AlertTriangle' },
    { value: 'maintenance', label: 'Bảo trì', icon: 'Tool' },
    { value: 'system', label: 'Hệ thống', icon: 'Monitor' },
    { value: 'sensor', label: 'Cảm biến', icon: 'Activity' }
  ];

  const dateRangeOptions = [
    { value: '24hours', label: '24 giờ qua' },
    { value: '7days', label: '7 ngày qua' },
    { value: '30days', label: '30 ngày qua' },
    { value: 'custom', label: 'Tùy chỉnh' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return 'Thành công';
      case 'warning': return 'Cảnh báo';
      case 'error': return 'Lỗi';
      case 'info': return 'Thông tin';
      default: return 'Không xác định';
    }
  };

  const getActivityIcon = (type, icon) => {
    return icon || 'Circle';
  };

  const filteredActivities = activities.filter(activity => 
    selectedFilter === 'all' || activity.type === selectedFilter
  );

  const activityStats = {
    total: activities.length,
    success: activities.filter(a => a.status === 'success').length,
    warnings: activities.filter(a => a.status === 'warning').length,
    errors: activities.filter(a => a.status === 'error').length
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Icon name="History" size={32} className="text-moss-600" />
            Lịch sử Hoạt động
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Theo dõi tất cả hoạt động và sự kiện trong hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Xuất dữ liệu
          </Button>
          <Button variant="outline">
            <Icon name="Search" size={16} className="mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tổng hoạt động
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activityStats.total}
              </p>
            </div>
            <Icon name="Activity" size={24} className="text-moss-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Thành công
              </p>
              <p className="text-2xl font-bold text-green-600">
                {activityStats.success}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Cảnh báo
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {activityStats.warnings}
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Lỗi
              </p>
              <p className="text-2xl font-bold text-red-600">
                {activityStats.errors}
              </p>
            </div>
            <Icon name="XCircle" size={24} className="text-red-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Activity Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Loại hoạt động</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className="flex items-center gap-1"
                >
                  <Icon name={option.icon} size={14} />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium mb-2">Khoảng thời gian</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={20} className="text-moss-600" />
            Dòng thời gian hoạt động
            <Badge variant="outline" className="ml-2">
              {filteredActivities.length} hoạt động
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' :
                    activity.status === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                  }`}>
                    <Icon name={getActivityIcon(activity.type, activity.icon)} size={16} />
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  )}
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </h4>
                      <Badge className={getStatusColor(activity.status)}>
                        {getStatusText(activity.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(activity.timestamp)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-medium">📍 {activity.location}</span>
                    <span className="mx-2">•</span>
                    <span>👤 {activity.user}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {activity.details}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <Button variant="outline">
              <Icon name="MoreVertical" size={16} className="mr-2" />
              Tải thêm hoạt động
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats by Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Hồ cá chính
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Hoạt động hôm nay:</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span>Lần cho ăn:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span>Cảnh báo:</span>
              <span className="font-medium text-yellow-600">1</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Hồ cá cảnh
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Hoạt động hôm nay:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Lần cho ăn:</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span>Lỗi thiết bị:</span>
              <span className="font-medium text-red-600">1</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Hồ cá nhỏ
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Hoạt động hôm nay:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span>Lần cho ăn:</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span>Cảnh báo nhiệt độ:</span>
              <span className="font-medium text-yellow-600">1</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
