'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Radar, Zap, Power, LayoutDashboard, Settings2, Database, ShieldAlert, Users } from 'lucide-react';

interface AegisHubScreenProps {
  onSelectDashboard: () => void;
  onSelectAdvanced: () => void;
  onSelectUsers: () => void;
  onLogout: () => void;
}

const HubOption = ({ title, description, icon: Icon, onClick, color = "primary", disabled = false }: { title: string, description: string, icon: any, onClick: () => void, color?: "primary" | "accent" | "amber" | "emerald", disabled?: boolean }) => {
  const colorClasses = {
    primary: "border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/5",
    accent: "border-[#f43f5e]/30 text-[#f43f5e] hover:bg-[#f43f5e]/5",
    amber: "border-amber-400/30 text-amber-400 hover:bg-amber-400/5",
    emerald: "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/5"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`relative p-5 border bg-[#050b1a]/80 backdrop-blur-xl flex flex-col items-start gap-3 transition-all duration-300 group fui-corner-brackets overflow-hidden text-left h-full ${colorClasses[color]} ${disabled ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
    >
      <div className="fui-corner-brackets-inner" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-2 border border-current bg-current/5">
        <Icon className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h3 className="text-[11px] font-black tracking-[0.2em] uppercase">{title}</h3>
        <p className="text-[8px] opacity-60 uppercase tracking-widest leading-tight">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-2 flex items-center gap-2">
        <div className="w-2 h-0.5 bg-current" />
        <span className="text-[6px] font-bold tracking-[0.2em] uppercase">Initialize_Link</span>
      </div>
    </motion.button>
  );
};

export default function AegisHubScreen({ onSelectDashboard, onSelectAdvanced, onSelectUsers, onLogout }: AegisHubScreenProps) {
  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#020617] overflow-hidden dot-matrix p-6 md:p-10 lg:p-16">
      <div className="scanline-effect opacity-10" />
      <div className="vignette" />

      <header className="flex justify-between items-start z-20 mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#00f2ff] animate-pulse" />
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-[0.4em] text-[#00f2ff] uppercase leading-none">Aegis_OS</h1>
              <span className="text-[7px] text-[#00f2ff]/40 tracking-[0.2em] font-bold uppercase">Tactical_Operation_Center // v2.4.0</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 border border-[#f43f5e]/40 bg-[#f43f5e]/5 text-[#f43f5e] text-[8px] font-black uppercase tracking-[0.2em] hover:bg-[#f43f5e]/10 transition-all group"
        >
          <Power className="w-3 h-3" />
          <span>Terminate</span>
        </button>
      </header>

      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 z-20 items-stretch max-w-6xl mx-auto w-full max-h-[60vh]">
        <HubOption 
          title="Tactical_Grid"
          description="Live network monitoring, traffic analysis and core terminal access."
          icon={Radar}
          onClick={onSelectDashboard}
          color="primary"
        />

        <HubOption 
          title="Advanced_Ops"
          description="Bio-metrics, neural-advisor and privilege elevation management."
          icon={ShieldAlert}
          onClick={onSelectAdvanced}
          color="amber"
        />

        <HubOption 
          title="Personnel"
          description="Operator database, access hierarchy and status monitoring."
          icon={Users}
          onClick={onSelectUsers}
          color="emerald"
        />

        <HubOption 
          title="Data_Archive"
          description="Encrypted evidence vault and historical audit logs (Restricted)."
          icon={Database}
          onClick={() => {}}
          disabled
        />
      </main>

      <footer className="mt-auto pt-8 flex justify-between items-end z-20">
        <div className="flex flex-col gap-1">
          <span className="text-[6px] opacity-40 uppercase tracking-widest">Environment_Status</span>
          <div className="flex gap-1">
             {Array.from({ length: 8 }).map((_, i) => (
               <div key={i} className="w-3 h-1 bg-[#00f2ff]/20" />
             ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[6px] text-[#00f2ff]/60 uppercase tracking-widest font-mono">
            System_Uptime: 142:55:12:09
          </span>
        </div>
      </footer>
    </div>
  );
}
