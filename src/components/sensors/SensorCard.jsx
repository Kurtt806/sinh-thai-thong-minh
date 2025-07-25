import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export function SensorCard({ sensor, status, onClick, isSelected }) {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800',
    green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800',
    yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800',
    red: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800',
    cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-cyan-200 dark:border-cyan-800',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800'
  };

  const iconColors = {
    blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50',
    green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50',
    yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50',
    red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50',
    cyan: 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/50',
    purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50'
  };

  const statusColors = {
    good: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    caution: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-200',
        'bg-gradient-to-br border-2',
        colorClasses[sensor.color],
        isSelected && 'ring-2 ring-moss-500 scale-105 shadow-lg',
        'hover:shadow-md hover:scale-102'
      )}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            iconColors[sensor.color]
          )}>
            <Icon name={sensor.icon} size={24} />
          </div>
          
          <Badge 
            variant="outline" 
            className={cn('text-xs font-medium', statusColors[status.status])}
          >
            {status.text}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {sensor.name}
          </h3>
          
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {sensor.value}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {sensor.unit}
            </span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Tối ưu: {sensor.optimal[0]} - {sensor.optimal[1]} {sensor.unit}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                status.status === 'good' ? 'bg-green-500' :
                status.status === 'warning' ? 'bg-red-500' : 'bg-yellow-500'
              )}
              style={{
                width: `${Math.min(100, Math.max(0, 
                  ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100
                ))}%`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{sensor.min}</span>
            <span>{sensor.max}</span>
          </div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
