import React, { useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';

export function SensorChart({ sensor, timeRange }) {
  const chartData = useMemo(() => {
    if (!sensor?.history) return [];
    
    // Filter data based on time range
    const now = new Date();
    let cutoffTime;
    
    switch (timeRange) {
      case '1h':
        cutoffTime = new Date(now.getTime() - 1 * 60 * 60 * 1000);
        break;
      case '6h':
        cutoffTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    return sensor.history.filter(point => 
      new Date(point.time) >= cutoffTime
    );
  }, [sensor, timeRange]);

  const { minValue, maxValue, avgValue } = useMemo(() => {
    if (chartData.length === 0) return { minValue: 0, maxValue: 0, avgValue: 0 };
    
    const values = chartData.map(d => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
      avgValue: values.reduce((a, b) => a + b, 0) / values.length
    };
  }, [chartData]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    if (timeRange === '7d') {
      return date.toLocaleDateString('vi-VN');
    } else {
      return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const getPathData = () => {
    if (chartData.length < 2) return '';
    
    const width = 800;
    const height = 300;
    const padding = 40;
    
    const xStep = (width - 2 * padding) / (chartData.length - 1);
    const yRange = maxValue - minValue || 1;
    
    const points = chartData.map((point, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((point.value - minValue) / yRange) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const getOptimalZonePath = () => {
    if (chartData.length < 2) return '';
    
    const width = 800;
    const height = 300;
    const padding = 40;
    
    const yRange = maxValue - minValue || 1;
    const topY = height - padding - ((sensor.optimal[1] - minValue) / yRange) * (height - 2 * padding);
    const bottomY = height - padding - ((sensor.optimal[0] - minValue) / yRange) * (height - 2 * padding);
    
    return `M ${padding},${topY} L ${width - padding},${topY} L ${width - padding},${bottomY} L ${padding},${bottomY} Z`;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Icon name="TrendingUp" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Không có dữ liệu cho khoảng thời gian này</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {avgValue.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Trung bình</div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {minValue.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Thấp nhất</div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {maxValue.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cao nhất</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg 
          viewBox="0 0 800 300" 
          className="w-full h-80 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
        >
          <defs>
            <linearGradient id={`gradient-${sensor.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={`var(--color-${sensor.color}-500)`} stopOpacity="0.3" />
              <stop offset="100%" stopColor={`var(--color-${sensor.color}-500)`} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <g stroke="#e5e7eb" strokeWidth="1" opacity="0.3">
            {[0, 1, 2, 3, 4].map(i => (
              <line 
                key={`h-${i}`}
                x1="40" 
                y1={40 + i * 55} 
                x2="760" 
                y2={40 + i * 55} 
              />
            ))}
            {chartData.map((_, i) => (
              i % Math.ceil(chartData.length / 8) === 0 && (
                <line 
                  key={`v-${i}`}
                  x1={40 + i * (720 / (chartData.length - 1))} 
                  y1="40" 
                  x2={40 + i * (720 / (chartData.length - 1))} 
                  y2="260" 
                />
              )
            ))}
          </g>
          
          {/* Optimal zone */}
          <path
            d={getOptimalZonePath()}
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Area under curve */}
          <path
            d={`${getPathData()} L 760,260 L 40,260 Z`}
            fill={`url(#gradient-${sensor.id})`}
          />
          
          {/* Main line */}
          <path
            d={getPathData()}
            fill="none"
            stroke={`var(--color-${sensor.color}-500)`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const x = 40 + index * (720 / (chartData.length - 1));
            const y = 260 - ((point.value - minValue) / (maxValue - minValue || 1)) * 220;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="white"
                  stroke={`var(--color-${sensor.color}-500)`}
                  strokeWidth="2"
                  className="hover:r-6 transition-all cursor-pointer"
                >
                  <title>{`${point.value} ${sensor.unit} - ${formatTime(point.time)}`}</title>
                </circle>
              </g>
            );
          })}
          
          {/* Y-axis labels */}
          <g fill="#6b7280" fontSize="12" textAnchor="end">
            {[0, 1, 2, 3, 4].map(i => {
              const value = minValue + (maxValue - minValue) * (4 - i) / 4;
              return (
                <text key={i} x="35" y={40 + i * 55 + 4}>
                  {value.toFixed(1)}
                </text>
              );
            })}
          </g>
          
          {/* X-axis labels */}
          <g fill="#6b7280" fontSize="12" textAnchor="middle">
            {chartData.map((point, index) => (
              index % Math.ceil(chartData.length / 6) === 0 && (
                <text 
                  key={index} 
                  x={40 + index * (720 / (chartData.length - 1))} 
                  y="280"
                >
                  {formatTime(point.time)}
                </text>
              )
            ))}
          </g>
        </svg>
        
        {/* Legend */}
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-${sensor.color}-500`}></div>
            <span className="text-gray-600 dark:text-gray-400">Giá trị thực</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-green-400 opacity-50"></div>
            <span className="text-gray-600 dark:text-gray-400">Vùng tối ưu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
