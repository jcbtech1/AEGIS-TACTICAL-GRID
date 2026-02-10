"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Versión compactada para evitar desbordamientos en pantalla.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Trash2, Brain, 
  Globe, Lock, Cpu, 
  Undo2, Syringe, Power, HardDrive, Eye,
  Fingerprint, ShieldCheck,
  List, Radar, FolderLock, 
  ZapOff, Ghost, Radio, Key, Thermometer, FileText,
  LockKeyhole, User, CircleArrowUp, AlertTriangle, Send, Loader2
} from 'lucide-react';
import VisualScanModule from './visual-scan';
import { sendTacticalCommand } from '@/app/actions';

type ModuleType = 'STRATEGIC_INTELLIGENCE' | 'SECURITY_MANAGEMENT' | 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS' | 'INFRASTRUCTURE';

interface AdvancedOpsProps {
  onBack: () => void;
}

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative ${isAccent ? 'border-[#f43f5e]' : 'border-[#00f2ff]/40'} border bg-black/40 backdrop-blur-md p-2 flex flex-col ${className} fui-corner-brackets overflow-hidden`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-[#020814] text-[6px] font-bold tracking-[0.2em] uppercase z-10 ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative">
      {children}
    </div>
  </div>
);

const ClearanceOverlay = ({ requiredLevel, currentLevel, children }: { requiredLevel: number, currentLevel: number, children: React.ReactNode }) => {
  const isLocked = currentLevel < requiredLevel;

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      <div className="w-full h-full blur-lg grayscale opacity-30 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-[#f43f5e]/20">
        <Lock className="w-8 h-8 text-[#f43f5e] mb-2 animate-pulse" />
        <span className="text-[8px] font-black text-[#f43f5e] tracking-[0.3em] uppercase text-center px-6">
          LEVEL_{requiredLevel}_REQUIRED
        </span>
      </div>
    </div>
  );
};

export default function AdvancedOpsScreen({ onBack }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('STRATEGIC_INTELLIGENCE');
  const [currentClearance, setCurrentClearance] = useState(3);
  const [isElevating, setIsElevating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLevelUp = (level: number) => {
    if (level > currentClearance) {
      setIsElevating(true);
      setTimeout(() => setIsElevating(false), 200);
    }
    setCurrentClearance(level);
  };

  if (!isMounted) return null;

  const NavButton = ({ type, label, icon: Icon }: { type: ModuleType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveModule(type)}
      className={`relative w-full flex items-center gap-2 px-3 py-1.5 text-[7px] font-bold tracking-[0.15em] uppercase transition-all overflow-hidden group scan-hover-item ${
        activeModule === type 
          ? 'text-[#00f2ff] bg-[#00f2ff]/5' 
          : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/80'
      }`}
    >
      <Icon className={`w-3 h-3 ${activeModule === type ? 'text-[#00f2ff]' : 'text-[#00f2ff]/40'}`} />
      <span className="flex-1 text-left truncate">{label}</span>
      {activeModule === type && (
        <motion.div 
          layoutId="active-nav-indicator"
          className="absolute left-0 w-0.5 h-3/4 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
        />
      )}
    </button>
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-3 flex gap-4 font-mono relative box-border">
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      <aside className="w-[180px] flex flex-col gap-3 z-20 h-full shrink-0">
        <DoubleBorderPanel className="flex-none py-2 px-3">
          <h1 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#00f2ff] leading-none">AEGIS:CMD</h1>
        </DoubleBorderPanel>

        <DoubleBorderPanel className="flex-1 p-0 flex flex-col">
          <nav className="flex-1 py-1 overflow-y-auto terminal-scroll">
            <NavButton type="STRATEGIC_INTELLIGENCE" label="STRATEGIC_INTEL" icon={Radar} />
            <NavButton type="SECURITY_MANAGEMENT" label="SECURITY_MGMT" icon={ShieldCheck} />
            <NavButton type="RECONNAISSANCE" label="RECON_GRID" icon={Globe} />
            <NavButton type="VISUAL_SCAN" label="VISUAL_SCAN" icon={Eye} />
            <NavButton type="COUNTERMEASURES" label="COUNTERMEASURES" icon={Shield} />
            <NavButton type="DATA_PURGE" label="DATA_PURGE" icon={Trash2} />
            <NavButton type="AI_ADVISOR" label="AI_ADVISOR" icon={Brain} />
            <NavButton type="INFRASTRUCTURE" label="INFRASTRUCTURE" icon={HardDrive} />
            <NavButton type="SYSTEM_LOGS" label="SYSTEM_LOGS" icon={List} />
          </nav>

          <div className="mt-auto border-t border-[#00f2ff]/10 p-2">
            <button 
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-[7px] font-black text-[#00f2ff] uppercase border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 transition-all tactic-clip"
            >
              <Undo2 className="w-3 h-3" />
              <span>EXIT_HUB</span>
            </button>
          </div>
        </DoubleBorderPanel>
      </aside>

      <main className="flex-1 flex flex-col gap-3 z-20 overflow-hidden h-full">
        <header className="flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase text-[#00f2ff]">
              [{activeModule.replace('_', ' ')}]
            </h2>
            <div className="flex gap-3 text-[6px] uppercase tracking-widest opacity-40">
              <span>Auth: OPERATOR_LEVEL_{currentClearance}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex items-center justify-center">
                <Shield className="w-3 h-3 animate-pulse" />
             </div>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full flex flex-col min-h-0"
            >
              {activeModule === 'STRATEGIC_INTELLIGENCE' && <StrategicIntelligenceModule />}
              {activeModule === 'SECURITY_MANAGEMENT' && <SecurityManagementModule currentClearance={currentClearance} onLevelChange={handleLevelUp} />}
              {activeModule === 'RECONNAISSANCE' && <ReconModule />}
              {activeModule === 'VISUAL_SCAN' && <VisualScanModule />}
              {activeModule === 'COUNTERMEASURES' && (
                <ClearanceOverlay requiredLevel={4} currentLevel={currentClearance}>
                  <CountermeasuresModule />
                </ClearanceOverlay>
              )}
              {activeModule === 'DATA_PURGE' && (
                <ClearanceOverlay requiredLevel={5} currentLevel={currentClearance}>
                  <DataPurgeModule />
                </ClearanceOverlay>
              )}
              {activeModule === 'AI_ADVISOR' && <AIAdvisorModule currentLevel={currentClearance} />}
              {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
              {activeModule === 'INFRASTRUCTURE' && <InfrastructureModule />}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="h-5 shrink-0 bg-black/80 border border-[#00f2ff]/20 overflow-hidden flex items-center">
          <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center">
            <motion.div 
              animate={{ x: [0, -500] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-12 text-[6px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]"
            >
              <span>PROTOCOL_7B_ACTIVE... STATUS: SECURE</span>
              <span>NO_INTRUSIONS_DETECTED... SCANNING_SECTOR_9</span>
              <span>ENCRYPTION_LAYER_8_REINFORCED</span>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- MÓDULOS COMPACTADOS ---

function SecurityManagementModule({ currentClearance, onLevelChange }: { currentClearance: number, onLevelChange: (l: number) => void }) {
  return (
    <div className="flex flex-col h-full gap-3 min-h-0 overflow-hidden">
      <div className="flex-[2] grid grid-cols-12 gap-3 min-h-0">
        <DoubleBorderPanel title="[ CLEARANCE ]" className="col-span-5 flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-black text-[#00f2ff]">{currentClearance}</span>
            <div className="mt-3 flex gap-1">
              {[1,2,3,4,5].map(l => (
                <button key={l} onClick={() => onLevelChange(l)} className={`w-6 h-6 border ${currentClearance === l ? 'bg-[#00f2ff] text-black' : 'bg-black text-[#00f2ff]'} text-[8px] font-bold`}>{l}</button>
              ))}
            </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="[ BIOMETRIC_FEED ]" className="col-span-7 bg-black/40">
           <div className="w-full h-full bg-black/80 flex items-center justify-center border border-[#00f2ff]/10">
              <Fingerprint className="w-10 h-10 text-[#00f2ff]/20" />
           </div>
        </DoubleBorderPanel>
      </div>

      <DoubleBorderPanel title="[ SECURITY_LOGS ]" className="flex-[3] bg-black/60" isAccent>
          <div className="flex-1 overflow-y-auto terminal-scroll p-2 space-y-1 font-mono text-[7px]">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="opacity-40">[{10+i}:00:00] SYSTEM_CHECK_SECTOR_{i}_OK</div>
            ))}
          </div>
      </DoubleBorderPanel>
    </div>
  );
}

function StrategicIntelligenceModule() {
  return (
    <div className="flex flex-col h-full gap-3 min-h-0 overflow-hidden">
      <div className="grid grid-cols-12 gap-3 flex-[3] min-h-0">
        <DoubleBorderPanel title="[ GEO_TACTICAL ]" className="col-span-8 bg-[#000508]/60">
           <div className="w-full h-full flex items-center justify-center opacity-30">
              <Globe className="w-16 h-16" />
           </div>
        </DoubleBorderPanel>
        <div className="col-span-4 flex flex-col gap-3">
          <DoubleBorderPanel title="[ KERNEL ]" className="flex-1 flex flex-col items-center justify-center">
             <span className="text-2xl font-black">98%</span>
             <span className="text-[6px] opacity-40 uppercase">STABILITY</span>
          </DoubleBorderPanel>
          <DoubleBorderPanel title="[ OFFENSIVE ]" className="flex-1 flex flex-col gap-2 p-2">
             <div className="w-full h-1 bg-[#00f2ff]/10 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-[#00f2ff]" />
             </div>
             <span className="text-[6px] opacity-40 uppercase">SYNCING_PAYLOAD...</span>
          </DoubleBorderPanel>
        </div>
      </div>
      <DoubleBorderPanel title="[ SECTOR_STREAM ]" className="flex-[2] bg-black/60">
         <div className="flex gap-2 p-2 overflow-x-auto terminal-scroll h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-24 h-full border border-[#00f2ff]/10 flex-shrink-0 bg-[#00f2ff]/5 flex items-center justify-center">
                 <Cpu className="w-4 h-4 opacity-20" />
              </div>
            ))}
         </div>
      </DoubleBorderPanel>
    </div>
  );
}

function AIAdvisorModule({ currentLevel }: { currentLevel: number }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([{ role: 'ai', text: 'SISTEMA AEGIS ACTIVO.' }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'operator', text: input.toUpperCase() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const result = await sendTacticalCommand({
        message: userMsg.text,
        systemStatus: { threatLevel: "ADVANCED_ZONE", activeNodes: 12, throughput: "2.4 Gb/s" }
      });
      setHistory(prev => [...prev, { role: 'ai', text: result.response }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-2 min-h-0 overflow-hidden">
      <DoubleBorderPanel title="AI_ADVISOR" className="flex-1 flex flex-col">
        <div className="flex-1 p-3 overflow-y-auto terminal-scroll space-y-2 text-[9px]">
          {history.map((msg, i) => (
            <div key={i} className={`p-2 border border-[#00f2ff]/20 ${msg.role === 'ai' ? 'bg-[#00f2ff]/5' : 'text-right'}`}>
              <span className="text-[5px] block opacity-40">{msg.role.toUpperCase()}</span>
              {msg.text}
            </div>
          ))}
          {isLoading && <Loader2 className="w-3 h-3 animate-spin mx-auto opacity-40" />}
        </div>
        <div className="p-2 border-t border-[#00f2ff]/10 flex gap-2 shrink-0">
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="COMMAND..." 
            className="flex-1 bg-black/60 border border-[#00f2ff]/20 px-3 py-1 text-[8px] outline-none text-[#00f2ff]" 
          />
          <button onClick={handleSend} className="px-4 bg-[#00f2ff] text-black font-black text-[8px] uppercase">RUN</button>
        </div>
      </DoubleBorderPanel>
    </div>
  );
}

function SystemLogsModule() {
  return (
    <DoubleBorderPanel title="TACTICAL_AUDIT" className="h-full">
      <div className="flex-1 overflow-y-auto terminal-scroll p-3 font-mono text-[7px] space-y-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="opacity-50 truncate">[{new Date().toISOString().slice(11, 19)}] NODE_SYNC_OK_0x{i}</div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}

function ReconModule() {
  return (
    <div className="flex flex-col h-full gap-3">
       <DoubleBorderPanel title="RECON_MAP" className="flex-[3] flex items-center justify-center bg-black/40">
          <Radar className="w-16 h-16 text-[#00f2ff]/10 animate-spin-slow" />
       </DoubleBorderPanel>
       <DoubleBorderPanel title="DATA_STREAM" className="flex-[2] overflow-y-auto terminal-scroll p-2 text-[6px] opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>PACKET_INSPECTED_NODE_{i}_0x{Math.random().toString(16).slice(2,6).toUpperCase()}</div>
          ))}
       </DoubleBorderPanel>
    </div>
  );
}

function CountermeasuresModule() {
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
       <DoubleBorderPanel title="INJECTION" className="flex items-center justify-center">
          <button className="p-4 border border-[#00f2ff]/40 bg-[#00f2ff]/10 text-[8px] font-black uppercase tracking-widest hover:bg-[#00f2ff]/20 transition-all">Start_Payload</button>
       </DoubleBorderPanel>
       <DoubleBorderPanel title="SIGNAL_JAM" className="flex items-center justify-center">
          <Radio className="w-10 h-10 text-[#00f2ff]/20" />
       </DoubleBorderPanel>
    </div>
  );
}

function DataPurgeModule() {
  return (
    <DoubleBorderPanel title="PURGE_SYSTEM" className="h-full flex flex-col items-center justify-center gap-4" isAccent>
       <span className="text-xl font-black text-[#f43f5e] animate-pulse">!! STANDBY !!</span>
       <button className="px-8 py-3 border-2 border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e] text-[9px] font-black uppercase tracking-[0.4em]">Initialize_Purge</button>
    </DoubleBorderPanel>
  );
}

function InfrastructureModule() {
  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      <DoubleBorderPanel title="CPU_LOAD" className="col-span-4 flex items-center justify-center">
         <span className="text-2xl font-black">42%</span>
      </DoubleBorderPanel>
      <DoubleBorderPanel title="VAULT" className="col-span-8 overflow-y-auto p-2 space-y-1">
         {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="text-[7px] border border-[#00f2ff]/10 p-1 flex justify-between">
               <span>FILE_SESSION_0{i}.BIN</span>
               <Lock className="w-2 h-2 opacity-40" />
            </div>
         ))}
      </DoubleBorderPanel>
    </div>
  );
}
