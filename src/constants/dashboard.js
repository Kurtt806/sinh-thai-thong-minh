export const MENU_ITEMS = [
  {
    id: 'dashboard',
    title: 'Tổng quan',
    icon: 'LayoutDashboard',
    path: '/',
  },
  {
    id: 'devices',
    title: 'Thiết bị',
    icon: 'Settings',
    path: '/devices',
  },
  {
    id: 'analytics',
    title: 'Phân tích',
    icon: 'BarChart3',
    path: '/analytics',
  },
  {
    id: 'feeding',
    title: 'Cho ăn',
    icon: 'Coffee',
    path: '/feeding',
  },
  {
    id: 'history',
    title: 'Lịch sử',
    icon: 'Clock',
    path: '/history',
  },
  {
    id: 'settings',
    title: 'Cài đặt',
    icon: 'Settings2',
    path: '/settings',
  },
];

export const STATS_CARDS = [
  {
    id: 'system-status',
    title: 'Trạng thái hệ thống',
    value: 'Hoạt động',
    icon: 'Activity',
    trend: '99.8%',
    trendUp: true,
  },
  {
    id: 'total-devices',
    title: 'Thiết bị hoạt động',
    value: '15',
    icon: 'Settings',
    trend: '+3',
    trendUp: true,
  },
  {
    id: 'energy-usage',
    title: 'Tiêu thụ năng lượng',
    value: '1.2kW',
    icon: 'Zap',
    trend: '-5%',
    trendUp: false,
  },
  {
    id: 'alerts',
    title: 'Cảnh báo',
    value: '2',
    icon: 'AlertTriangle',
    trend: 'Mới',
    trendUp: false,
  },
];
