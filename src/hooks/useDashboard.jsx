import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboardService';

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, activitiesResponse] = await Promise.all([
        DashboardService.getDashboardStats(),
        DashboardService.getRecentActivities()
      ]);
      
      setStats(statsResponse.data);
      setActivities(activitiesResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeAction = async (actionId) => {
    try {
      await DashboardService.executeQuickAction(actionId);
      // Refresh dashboard data after action
      await fetchDashboardData();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    activities,
    loading,
    error,
    refetch: fetchDashboardData,
    executeAction,
  };
}
