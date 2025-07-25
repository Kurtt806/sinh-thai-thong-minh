import React, { useState, useEffect } from 'react';

const SimpleBackendTest = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Test server connection
  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      setServerStatus({ 
        status: 'connected', 
        data: data,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      setServerStatus({ 
        status: 'error', 
        error: error.message,
        timestamp: new Date().toLocaleTimeString()
      });
    }
    setLoading(false);
  };

  // Test on component mount
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Backend Connection Test
        </h1>

        {/* Server Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🌐 Server Status
            {serverStatus && (
              <span className={`ml-3 w-3 h-3 rounded-full ${
                serverStatus.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
            )}
          </h2>

          <div className="space-y-4">
            <button 
              onClick={testConnection}
              disabled={loading}
              className={`px-4 py-2 rounded font-medium ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>

            {serverStatus && (
              <div className="mt-4 p-4 rounded-md bg-gray-50">
                <div className="mb-2">
                  <strong>Status:</strong> 
                  <span className={`ml-2 font-medium ${
                    serverStatus.status === 'connected' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {serverStatus.status === 'connected' ? '✅ Connected' : '❌ Failed'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <strong>Time:</strong> {serverStatus.timestamp}
                </div>

                {serverStatus.status === 'connected' && serverStatus.data && (
                  <div className="space-y-1">
                    <div><strong>Server Status:</strong> {serverStatus.data.status}</div>
                    <div><strong>Uptime:</strong> {Math.floor(serverStatus.data.uptime || 0)}s</div>
                    <div><strong>Version:</strong> {serverStatus.data.version}</div>
                  </div>
                )}

                {serverStatus.status === 'error' && (
                  <div className="text-red-600">
                    <strong>Error:</strong> {serverStatus.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* API Test Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📡 API Test</h2>
          
          <div className="space-y-4">
            <ApiTestButton 
              endpoint="/health" 
              label="Health Check" 
              description="Test server health endpoint"
            />
            
            <ApiTestButton 
              endpoint="/api" 
              label="API Info" 
              description="Get API information"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Instructions
          </h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>1. Start Backend:</strong> Run <code className="bg-blue-100 px-2 py-1 rounded">g:\SERVER_WEB_CONTROL\AUTO_RUN.bat</code></p>
            <p><strong>2. Backend URL:</strong> <a href="http://localhost:5000" target="_blank" className="underline">http://localhost:5000</a></p>
            <p><strong>3. Test:</strong> Click "Test Connection" above</p>
            <p><strong>4. Expected:</strong> Green status = Backend working correctly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// API Test Button Component
const ApiTestButton = ({ endpoint, label, description }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`);
      const data = await response.json();
      setResult({ success: true, data });
    } catch (error) {
      setResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-medium">{label}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button
          onClick={testEndpoint}
          disabled={loading}
          className={`px-3 py-1 rounded text-sm font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {loading ? 'Testing...' : 'Test'}
        </button>
      </div>
      
      {result && (
        <div className={`mt-2 p-2 rounded text-sm ${
          result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {result.success ? (
            <div>
              <div>✅ Success</div>
              <pre className="mt-1 text-xs overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div>❌ Error: {result.error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleBackendTest;
