import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ColorTest() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Color Test - Dark Mode
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Waves" size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-gray-900 dark:text-gray-100">Primary Text</span>
            <span className="text-gray-600 dark:text-gray-300">Secondary Text</span>
            <span className="text-gray-500 dark:text-gray-400">Muted Text</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Leaf" size={20} className="text-moss-600 dark:text-moss-400" />
            <span className="text-moss-700 dark:text-moss-300">Moss Green Text</span>
            <span className="text-moss-600 dark:text-moss-400">Moss Medium</span>
          </div>
          
          <div className="flex space-x-2">
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
              Status: Normal
            </div>
            <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm">
              Status: Warning
            </div>
            <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm">
              Status: Error
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
