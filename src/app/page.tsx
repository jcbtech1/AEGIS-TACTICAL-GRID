'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AegisUltimateDashboard from '@/components/cyber-grid/dashboard';
import AegisLoginScreen from '@/components/cyber-grid/login-screen';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020617]">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <AegisLoginScreen key="login" onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <AegisUltimateDashboard key="dashboard" onLogout={() => setIsAuthenticated(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
