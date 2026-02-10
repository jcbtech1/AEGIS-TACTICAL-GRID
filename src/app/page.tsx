'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AegisUltimateDashboard from '@/components/cyber-grid/dashboard';
import AegisLoginScreen from '@/components/cyber-grid/login-screen';
import AdvancedOpsScreen from '@/components/cyber-grid/advanced-ops';
import AegisHubScreen from '@/components/cyber-grid/hub-screen';
import AegisUsersScreen from '@/components/cyber-grid/users-screen';

type ViewState = 'login' | 'hub' | 'dashboard' | 'advanced' | 'users';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState | null>(null);
  const [initialModule, setInitialModule] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedSession = localStorage.getItem('aegis_session');
    if (savedSession === 'active') {
      setCurrentView('hub');
    } else {
      setCurrentView('login');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('aegis_session', 'active');
    setCurrentView('hub');
  };

  const handleLogout = () => {
    localStorage.removeItem('aegis_session');
    setCurrentView('login');
  };

  const handleSelectAdvanced = (module: string) => {
    setInitialModule(module);
    setCurrentView('advanced');
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
        
        {currentView === 'hub' && (
          <AegisHubScreen
            key="hub"
            onSelectDashboard={() => setCurrentView('dashboard')}
            onSelectAdvanced={handleSelectAdvanced}
            onSelectUsers={() => setCurrentView('users')}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'dashboard' && (
          <AegisUltimateDashboard 
            key="dashboard" 
            onLogout={handleLogout} 
            onBackToHub={() => setCurrentView('hub')}
          />
        )}

        {currentView === 'advanced' && (
          <AdvancedOpsScreen 
            key="advanced" 
            onBack={() => setCurrentView('hub')}
            initialModule={initialModule as any}
          />
        )}

        {currentView === 'users' && (
          <AegisUsersScreen
            key="users"
            onBack={() => setCurrentView('hub')}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
