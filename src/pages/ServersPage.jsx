import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ServersPage() {
  const servers = [
    {
      id: 1,
      name: 'Web Server 01',
      ip: '192.168.1.10',
      status: 'online',
      cpu: 45,
      memory: 62,
      disk: 78,
      uptime: '15d 4h 23m',
      location: 'Data Center A',
    },
    {
      id: 2,
      name: 'Database Server',
      ip: '192.168.1.11',
      status: 'online',
      cpu: 32,
      memory: 78,
      disk: 45,
      uptime: '23d 12h 45m',
      location: 'Data Center A',
    },
    {
      id: 3,
      name: 'API Server',
      ip: '192.168.1.12',
      status: 'warning',
      cpu: 78,
      memory: 85,
      disk: 92,
      uptime: '8d 2h 15m',
      location: 'Data Center B',
    },
    {
      id: 4,
      name: 'Cache Server',
      ip: '192.168.1.13',
      status: 'offline',
      cpu: 0,
      memory: 0,
      disk: 0,
      uptime: '0d 0h 0m',
      location: 'Data Center B',
    },
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
  
  const getUsageColor = (usage) => {
    if (usage > 80) return 'bg-red-500';
    if (usage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servers</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your server infrastructure</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Icon name="Plus" size={18} className="mr-2" />
            Add Server
          </button>
        </div>
      </div>
      
      {/* Server Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servers.map((server) => (
          <Card key={server.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{server.name}</CardTitle>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                  <Icon name={getStatusIcon(server.status)} size={14} className="mr-1" />
                  {server.status}
                </div>
              </div>
              <p className="text-sm text-gray-500">{server.ip} • {server.location}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Resource Usage */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>{server.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                      style={{ width: `${server.cpu}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Usage</span>
                    <span>{server.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                      style={{ width: `${server.memory}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Disk Usage</span>
                    <span>{server.disk}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                      style={{ width: `${server.disk}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Uptime */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Icon name="Clock" size={16} className="mr-1" />
                  Uptime: {server.uptime}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Icon name="Settings" size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Icon name="RotateCcw" size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Icon name="Power" size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
