'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AegisUltimateDashboard from '@/components/cyber-grid/dashboard';
import AegisLoginScreen from '@/components/cyber-grid/login-screen';
import AdvancedOpsScreen from '@/components/cyber-grid/advanced-ops';

type ViewState = 'login' | 'dashboard' | 'advanced';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('login');

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020617]">
      <AnimatePresence mode="wait">
        {currentView === 'login' && (
          <AegisLoginScreen 
            key="login" 
            onLogin={() => setCurrentView('dashboard')} 
          />
        )}
        
        {currentView === 'dashboard' && (
          <AegisUltimateDashboard 
            key="dashboard" 
            onLogout={() => setCurrentView('login')} 
            onAdvancedOps={() => setCurrentView('advanced')}
          />
        )}

        {currentView === 'advanced' && (
          <AdvancedOpsScreen 
            key="advanced" 
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </AnimatePresence>
    </main>
  );
}