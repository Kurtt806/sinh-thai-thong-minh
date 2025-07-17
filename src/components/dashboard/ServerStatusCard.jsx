import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ServerStatusCard() {
  const servers = [
    { name: 'Web Server 01', status: 'online', cpu: '45%', memory: '62%', uptime: '99.9%' },
    { name: 'Database Server', status: 'online', cpu: '32%', memory: '78%', uptime: '99.7%' },
    { name: 'API Server', status: 'warning', cpu: '78%', memory: '85%', uptime: '98.9%' },
    { name: 'Cache Server', status: 'offline', cpu: '0%', memory: '0%', uptime: '0%' },
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'warning': return 'AlertCircle';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Server" size={20} className="mr-2" />
          Server Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {servers.map((server, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${getStatusColor(server.status)}`}>
                  <Icon name={getStatusIcon(server.status)} size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{server.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{server.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">CPU: {server.cpu}</p>
                <p className="text-sm text-gray-600">Memory: {server.memory}</p>
                <p className="text-sm text-gray-600">Uptime: {server.uptime}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
