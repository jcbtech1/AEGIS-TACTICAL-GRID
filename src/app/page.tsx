
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AegisUltimateDashboard from '@/components/cyber-grid/dashboard';
import AegisLoginScreen from '@/components/cyber-grid/login-screen';
import AdvancedOpsScreen from '@/components/cyber-grid/advanced-ops';

type ViewState = 'login' | 'dashboard' | 'advanced';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('aegis_session');
    if (savedSession === 'active') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('aegis_session', 'active');
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('aegis_session');
    setCurrentView('login');
  };

  if (currentView === null) return <div className="bg-[#020617] w-screen h-screen" />;

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020617]">
      <AnimatePresence mode="wait">
        {currentView === 'login' && (
          <AegisLoginScreen 
            key="login" 
            onLogin={handleLogin} 
          />
        )}
        
        {currentView === 'dashboard' && (
          <AegisUltimateDashboard 
            key="dashboard" 
            onLogout={handleLogout} 
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
