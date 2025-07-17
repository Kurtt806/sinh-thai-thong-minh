import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export function StatCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
            {trend && (
              <div className={cn(
                'flex items-center mt-2 text-sm font-medium',
                trendUp ? 'text-moss-600 dark:text-moss-400' : 'text-red-600 dark:text-red-400'
              )}>
                <Icon 
                  name={trendUp ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className="mr-1 flex-shrink-0" 
                />
                <span className="truncate">{trend}</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-moss-100 dark:bg-moss-900/30 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
            <Icon name={icon} size={28} className="text-moss-600 dark:text-moss-400 sm:w-7 sm:h-7" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
