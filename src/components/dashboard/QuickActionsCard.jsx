import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function QuickActionsCard() {
  const actions = [
    {
      id: 'restart-all',
      title: 'Restart All Servers',
      description: 'Restart all servers in sequence',
      icon: 'RotateCcw',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'backup-db',
      title: 'Backup Database',
      description: 'Create database backup',
      icon: 'Database',
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'clear-cache',
      title: 'Clear Cache',
      description: 'Clear all cached data',
      icon: 'Trash2',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'system-health',
      title: 'System Health Check',
      description: 'Run comprehensive health check',
      icon: 'Heart',
      color: 'bg-red-100 text-red-600',
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <Icon name={action.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
