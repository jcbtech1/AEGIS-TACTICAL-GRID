'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Radar, Zap, Power, 
  LayoutDashboard, Brain, Globe, 
  Eye, ShieldAlert, Users, Trash2, 
  HardDrive, List, Fingerprint, Database 
} from 'lucide-react';

interface AegisHubScreenProps {
  onSelectDashboard: () => void;
  onSelectAdvanced: (module: string) => void;
  onSelectUsers: () => void;
  onLogout: () => void;
}

const HubOption = ({ 
  title, 
  id, 
  icon: Icon, 
  onClick, 
  color = "primary", 
  disabled = false 
}: { 
  title: string, 
  id: string, 
  icon: any, 
  onClick: () => void, 
  color?: "primary" | "accent" | "amber" | "emerald" | "blue", 
  disabled?: boolean 
}) => {
  const colorClasses = {
    primary: "border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/5",
    accent: "border-[#f43f5e]/30 text-[#f43f5e] hover:bg-[#f43f5e]/5",
    amber: "border-amber-400/30 text-amber-400 hover:bg-amber-400/5",
    emerald: "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/5",
    blue: "border-blue-400/30 text-blue-400 hover:bg-blue-400/5"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`relative p-3 border bg-[#050b1a]/80 backdrop-blur-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 group fui-corner-brackets overflow-hidden text-center h-full ${colorClasses[color]} ${disabled ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
    >
      <div className="fui-corner-brackets-inner" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <Icon className="w-5 h-5 mb-1" />
      
      <div className="space-y-0.5">
        <h3 className="text-[8px] font-black tracking-[0.2em] uppercase truncate max-w-full">{title}</h3>
        <span className="text-[5px] opacity-40 uppercase tracking-tighter block">{id}</span>
      </div>

      <div className="mt-2 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-0.5 bg-current" />
        <span className="text-[5px] font-bold tracking-[0.1em] uppercase">INIT_LINK</span>
      </div>
    </motion.button>
  );
};

export default function AegisHubScreen({ onSelectDashboard, onSelectAdvanced, onSelectUsers, onLogout }: AegisHubScreenProps) {
  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#020617] overflow-hidden dot-matrix p-4 md:p-6">
      <div className="scanline-effect opacity-10" />
      <div className="vignette" />

      <header className="flex justify-between items-start z-20 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#00f2ff] animate-pulse" />
          <div>
            <h1 className="text-sm font-black tracking-[0.4em] text-[#00f2ff] uppercase leading-none">Aegis_OS: Principal</h1>
            <span className="text-[6px] text-[#00f2ff]/40 tracking-[0.2em] font-bold uppercase">Command_Central // v2.5.0</span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 border border-[#f43f5e]/40 bg-[#f43f5e]/5 text-[#f43f5e] text-[7px] font-black uppercase tracking-[0.2em] hover:bg-[#f43f5e]/10 transition-all group"
        >
          <Power className="w-3 h-3" />
          <span>Terminate</span>
        </button>
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 z-20 items-stretch max-w-6xl mx-auto w-full min-h-0 overflow-y-auto terminal-scroll py-2">
        {/* MÓDULOS PRINCIPALES */}
        <HubOption 
          title="Tactical_Grid" id="CORE_DASHBOARD" icon={LayoutDashboard}
          onClick={onSelectDashboard} color="primary"
        />

        <HubOption 
          title="Personnel" id="OPERATOR_REGISTRY" icon={Users}
          onClick={onSelectUsers} color="emerald"
        />

        {/* MÓDULOS INTEGRADOS DE ADVANCED OPS */}
        <HubOption 
          title="Strategic_Intel" id="RADAR_SCAN" icon={Radar}
          onClick={() => onSelectAdvanced('STRATEGIC_INTELLIGENCE')} color="blue"
        />

        <HubOption 
          title="Security_Mgmt" id="BIO_AUTH" icon={Fingerprint}
          onClick={() => onSelectAdvanced('SECURITY_MANAGEMENT')} color="amber"
        />

        <HubOption 
          title="Recon_Grid" id="GEO_DATA" icon={Globe}
          onClick={() => onSelectAdvanced('RECONNAISSANCE')} color="blue"
        />

        <HubOption 
          title="Visual_Scan" id="FACE_TRACK" icon={Eye}
          onClick={() => onSelectAdvanced('VISUAL_SCAN')} color="primary"
        />

        <HubOption 
          title="Countermeasures" id="OPS_SHIELD" icon={ShieldAlert}
          onClick={() => onSelectAdvanced('COUNTERMEASURES')} color="accent"
        />

        <HubOption 
          title="AI_Advisor" id="NEURAL_CORE" icon={Brain}
          onClick={() => onSelectAdvanced('AI_ADVISOR')} color="primary"
        />

        <HubOption 
          title="Infrastructure" id="HARDWARE_STATUS" icon={HardDrive}
          onClick={() => onSelectAdvanced('INFRASTRUCTURE')} color="blue"
        />

        <HubOption 
          title="System_Logs" id="AUDIT_STREAM" icon={List}
          onClick={() => onSelectAdvanced('SYSTEM_LOGS')} color="primary"
        />

        <HubOption 
          title="Data_Archive" id="RESTRICTED_VAULT" icon={Database}
          onClick={() => {}} disabled color="blue"
        />

        <HubOption 
          title="Data_Purge" id="CRITICAL_WIPE" icon={Trash2}
          onClick={() => onSelectAdvanced('DATA_PURGE')} color="accent"
        />
      </main>

      <footer className="mt-4 pt-4 border-t border-[#00f2ff]/10 flex justify-between items-end z-20 shrink-0">
        <div className="flex flex-col gap-1">
          <span className="text-[5px] opacity-40 uppercase tracking-widest">Global_Status_Indicator</span>
          <div className="flex gap-1">
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="w-2 h-0.5 bg-[#00f2ff]/20" />
             ))}
          </div>
        </div>
        <div className="text-right flex flex-col">
          <span className="text-[5px] text-[#00f2ff]/60 uppercase tracking-widest font-mono">
            System_Uptime: 142:55:12:09
          </span>
          <span className="text-[5px] text-[#00f2ff]/30 uppercase tracking-[0.3em] font-mono mt-0.5">
            NODE_STABILITY: 99.98%
          </span>
        </div>
      </footer>
    </div>
  );
}
