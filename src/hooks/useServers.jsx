import { useState, useEffect } from 'react';
import { ServerService } from '@/services/serverService';

export function useServers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServers = async () => {
    try {
      setLoading(true);
      const response = await ServerService.getServers();
      setServers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const restartServer = async (id) => {
    try {
      await ServerService.restartServer(id);
      // Refresh servers after restart
      await fetchServers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateServer = async (id, data) => {
    try {
      await ServerService.updateServer(id, data);
      await fetchServers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteServer = async (id) => {
    try {
      await ServerService.deleteServer(id);
      await fetchServers();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return {
    servers,
    loading,
    error,
    refetch: fetchServers,
    restartServer,
    updateServer,
    deleteServer,
  };
}
