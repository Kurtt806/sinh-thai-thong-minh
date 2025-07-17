import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ActivityLogCard() {
  const activities = [
    {
      id: 1,
      type: 'server_restart',
      message: 'Web Server 01 restarted',
      timestamp: '2 minutes ago',
      severity: 'info',
    },
    {
      id: 2,
      type: 'high_cpu',
      message: 'API Server CPU usage exceeded 80%',
      timestamp: '15 minutes ago',
      severity: 'warning',
    },
    {
      id: 3,
      type: 'server_offline',
      message: 'Cache Server went offline',
      timestamp: '1 hour ago',
      severity: 'error',
    },
    {
      id: 4,
      type: 'backup_complete',
      message: 'Database backup completed successfully',
      timestamp: '3 hours ago',
      severity: 'success',
    },
    {
      id: 5,
      type: 'user_login',
      message: 'Admin user logged in',
      timestamp: '5 hours ago',
      severity: 'info',
    },
  ];
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };
  
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-1 rounded-full ${getSeverityColor(activity.severity)} mt-1`}>
                <Icon name={getSeverityIcon(activity.severity)} size={14} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
