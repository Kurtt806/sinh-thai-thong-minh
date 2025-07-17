export const MENU_ITEMS = [
  {
    id: 'dashboard',
    title: 'Tổng quan',
    icon: 'LayoutDashboard',
    path: '/',
  },
  {
    id: 'fish',
    title: 'Cá',
    icon: 'Fish',
    path: '/fish',
  },
  {
    id: 'dogs',
    title: 'Chó',
    icon: 'Dog',
    path: '/dogs',
  },
  {
    id: 'cats',
    title: 'Mèo',
    icon: 'Cat',
    path: '/cats',
  },
  {
    id: 'devices',
    title: 'Thiết bị',
    icon: 'Settings',
    path: '/devices',
  },
  {
    id: 'sensors',
    title: 'Cảm biến',
    icon: 'Activity',
    path: '/sensors',
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
    icon: 'Settings',
    path: '/settings',
  },
];

export const STATS_CARDS = [
  {
    id: 'total-fish',
    title: 'Tổng số cá',
    value: '48',
    icon: 'Fish',
    trend: '+12%',
    trendUp: true,
  },
  {
    id: 'total-dogs',
    title: 'Tổng số chó',
    value: '3',
    icon: 'Dog',
    trend: '+1',
    trendUp: true,
  },
  {
    id: 'total-cats',
    title: 'Tổng số mèo',
    value: '2',
    icon: 'Cat',
    trend: 'Ổn định',
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
];

export const AQUARIUM_DEVICES = [
  {
    id: 'feeder',
    name: 'Máy cho ăn',
    icon: 'Fish',
    status: 'active',
    lastFeed: '2 giờ trước',
  },
  {
    id: 'light',
    name: 'Đèn LED',
    icon: 'Sun',
    status: 'on',
    brightness: 80,
  },
  {
    id: 'filter',
    name: 'Lọc nước',
    icon: 'Filter',
    status: 'running',
    flow: '1200L/h',
  },
  {
    id: 'heater',
    name: 'Máy sưởi',
    icon: 'Thermometer',
    status: 'auto',
    temperature: 26,
  },
  {
    id: 'pump',
    name: 'Bơm oxy',
    icon: 'Wind',
    status: 'running',
    flow: '800L/h',
  },
];

export const SENSOR_DATA = [
  {
    id: 'temperature',
    name: 'Nhiệt độ',
    value: '26.5°C',
    icon: 'Thermometer',
    status: 'normal',
    range: '24-28°C',
  },
  {
    id: 'ph',
    name: 'Độ pH',
    value: '7.2',
    icon: 'Droplets',
    status: 'normal',
    range: '6.5-8.0',
  },
  {
    id: 'oxygen',
    name: 'Oxy',
    value: '8.5mg/L',
    icon: 'Wind',
    status: 'good',
    range: '6-10mg/L',
  },
  {
    id: 'salinity',
    name: 'Độ mặn',
    value: '35‰',
    icon: 'Waves',
    status: 'normal',
    range: '30-36‰',
  },
];
