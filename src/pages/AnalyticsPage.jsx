import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Icon name="BarChart3" size={32} className="text-moss-600" />
          Phân tích
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Theo dõi và phân tích dữ liệu hệ thống
        </p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Hiệu suất hệ thống
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                94.2%
              </p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Thời gian hoạt động
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                99.8%
              </p>
            </div>
            <Icon name="Clock" size={24} className="text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tiêu thụ năng lượng
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1.2kW
              </p>
            </div>
            <Icon name="Zap" size={24} className="text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Cảnh báo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-red-500" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="Activity" size={20} className="text-moss-600" />
            Hoạt động theo thời gian
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Biểu đồ hoạt động - Đang phát triển</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="PieChart" size={20} className="text-moss-600" />
            Phân bổ tài nguyên
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Icon name="PieChart" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Biểu đồ phân bổ - Đang phát triển</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Analytics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-moss-600" />
          Báo cáo gần đây
        </h3>
        <div className="space-y-4">
          {[
            { time: '10:30', event: 'Hệ thống hoạt động ổn định', status: 'success' },
            { time: '09:15', event: 'Cập nhật cấu hình thành công', status: 'success' },
            { time: '08:45', event: 'Phát hiện nhiệt độ cao bất thường', status: 'warning' },
            { time: '07:20', event: 'Khởi động hệ thống', status: 'info' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'success' ? 'bg-green-500' :
                  item.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <span className="text-gray-900 dark:text-white">{item.event}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
