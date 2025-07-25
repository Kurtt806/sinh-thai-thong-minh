import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme.jsx';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { DevicesPage } from '@/pages/DevicesPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { FeedingPage } from '@/pages/FeedingPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import SimpleBackendTest from '@/pages/SimpleBackendTest';
import '@/styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/feeding" element={<FeedingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/backend-test" element={<SimpleBackendTest />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
