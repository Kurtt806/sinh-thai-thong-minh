import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme.jsx';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { FishPage } from '@/pages/FishPage';
import { DogsPage } from '@/pages/DogsPage';
import { CatsPage } from '@/pages/CatsPage';
import { AquariumsPage } from '@/pages/AquariumsPage';
import { ServersPage } from '@/pages/ServersPage';
import { SensorsPage } from '@/pages/SensorsPage';
import SimpleBackendTest from '@/pages/SimpleBackendTest';
import '@/styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fish" element={<FishPage />} />
            <Route path="/dogs" element={<DogsPage />} />
            <Route path="/cats" element={<CatsPage />} />
            <Route path="/aquariums" element={<AquariumsPage />} />
            <Route path="/devices" element={<div className="p-8 text-center">Trang Thiết Bị - Đang phát triển</div>} />
            <Route path="/sensors" element={<SensorsPage />} />
            <Route path="/feeding" element={<div className="p-8 text-center">Trang Cho Ăn - Đang phát triển</div>} />
            <Route path="/history" element={<div className="p-8 text-center">Trang Lịch Sử - Đang phát triển</div>} />
            <Route path="/settings" element={<div className="p-8 text-center">Trang Cài Đặt - Đang phát triển</div>} />
            <Route path="/backend-test" element={<SimpleBackendTest />} />
            {/* Keep old routes for reference */}
            <Route path="/servers" element={<ServersPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
