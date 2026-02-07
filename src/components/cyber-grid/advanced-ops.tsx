
"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Implementa una interfaz de "Comandancia Militar" con navegación modular compacta y visuales inmersivos.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Crosshair, Zap, Trash2, Brain, 
  Terminal, Globe, Lock, Cpu, ArrowLeft,
  ChevronRight, Activity, AlertCircle, Database,
  Settings, Wifi, Radio, Server, MessageSquare, List,
  Undo2, Syringe, Power, LayoutGrid, HardDrive, Eye
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import VisualScanModule from './visual-scan';

type ModuleType = 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS';

interface AdvancedOpsProps {
  onBack: () => void;
}

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative ${isAccent ? 'border-[#f43f5e]' : 'border-[#00f2ff]/40'} border bg-black/40 backdrop-blur-md p-3 flex flex-col ${className} fui-corner-brackets`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-black text-[7px] font-bold tracking-[0.2em] uppercase ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    {children}
  </div>
);

export default function AdvancedOpsScreen({ onBack }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('VISUAL_SCAN');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const NavButton = ({ type, label, icon: Icon }: { type: ModuleType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveModule(type)}
      className={`relative w-full flex items-center gap-3 px-4 py-2.5 text-[8px] font-bold tracking-[0.2em] uppercase transition-all overflow-hidden group scan-hover-item ${
        activeModule === type 
          ? 'text-[#00f2ff] bg-[#00f2ff]/5' 
          : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/80'
      }`}
    >
      <Icon className={`w-3 h-3 ${activeModule === type ? 'text-[#00f2ff]' : 'text-[#00f2ff]/40'}`} />
      <span className="flex-1 text-left">{label}</span>
      {activeModule === type && (
        <motion.div 
          layoutId="active-nav-indicator"
          className="absolute left-0 w-0.5 h-3/4 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
        />
      )}
    </button>
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#020814] text-[#00f2ff] p-4 flex gap-6 font-mono relative">
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      {/* MENÚ LATERAL TÁCTICO COMPACTO */}
      <aside className="w-[18%] flex flex-col gap-4 z-20">
        <DoubleBorderPanel className="flex-none p-4">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-[#00f2ff] glitch-text">AEGIS:</h1>
            <span className="text-[6px] opacity-40 uppercase tracking-widest font-bold">Command_Center_X9</span>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel className="flex-1 p-0 overflow-hidden flex flex-col">
          <nav className="flex-1 py-2 overflow-y-auto terminal-scroll">
            <div className="px-4 py-2 text-[6px] text-[#00f2ff]/20 uppercase tracking-[0.3em]">Operational_Modules</div>
            <NavButton type="RECONNAISSANCE" label="RECON_GRID" icon={Globe} />
            <NavButton type="VISUAL_SCAN" label="VISUAL_SCAN" icon={Eye} />
            <NavButton type="COUNTERMEASURES" label="COUNTERMEASURES" icon={Shield} />
            <NavButton type="DATA_PURGE" label="DATA_PURGE" icon={Trash2} />
            <NavButton type="AI_ADVISOR" label="AI_ADVISOR" icon={Brain} />
            <NavButton type="SYSTEM_LOGS" label="SYSTEM_LOGS" icon={List} />
          </nav>

          <div className="mt-auto border-t border-[#00f2ff]/10 p-4">
            <button 
              onClick={onBack}
              className="w-full flex items-center justify-center gap-3 py-3 text-[9px] font-black text-[#00f2ff] uppercase border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 transition-all group relative overflow-hidden tactic-clip"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Undo2 className="w-3.5 h-3.5" />
              <span>RETURN_TO_HUD</span>
            </button>
          </div>
        </DoubleBorderPanel>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col gap-6 z-20 overflow-hidden">
        <header className="flex flex-col">
          <h2 className="text-3xl font-black tracking-tighter uppercase text-[#00f2ff] mb-1">
            [{activeModule.replace('_', ' ')}]
          </h2>
          <div className="flex gap-4 text-[7px] uppercase tracking-widest opacity-40">
            <span>Context: HIGH_SECURITY_ZONE</span>
            <span>Auth: OPERATOR_CERTIFIED_LEVEL_5</span>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full h-full"
            >
              {activeModule === 'RECONNAISSANCE' && <ReconModule />}
              {activeModule === 'VISUAL_SCAN' && <VisualScanModule />}
              {activeModule === 'COUNTERMEASURES' && <CountermeasuresModule />}
              {activeModule === 'DATA_PURGE' && <DataPurgeModule />}
              {activeModule === 'AI_ADVISOR' && <AIAdvisorModule />}
              {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

// --- MÓDULOS DE CONTENIDO ---

function CountermeasuresModule() {
  const [impact, setImpact] = useState(42);

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-8 flex-1">
        <DoubleBorderPanel title="[ MALWARE_INJECTION ]" className="flex flex-col items-center justify-center gap-6 group hover:bg-[#00f2ff]/5 transition-all">
          <button className="relative w-2/3 py-5 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/10 rounded-md flex items-center justify-center gap-4 group-hover:border-[#00f2ff] transition-all overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#00f2ff]/5 to-transparent animate-scan" />
            <Syringe className="w-6 h-6 text-[#00f2ff]" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">Inject_Payload</span>
          </button>
          
          <div className="w-full px-12 flex justify-between items-center">
            <div className="relative w-14 h-14 border-2 border-[#00f2ff]/20 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-t-[#00f2ff] rounded-full animate-spin" />
              <Activity className="w-5 h-5 opacity-40" />
            </div>
            
            <div className="h-14 w-24 bg-[#00f2ff]/10 border border-[#00f2ff]/20 relative">
               <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '75%' }}
                className="absolute bottom-0 w-full bg-[#00f2ff]/40 shadow-[0_0_15px_rgba(0,242,255,0.3)]" 
              />
            </div>

            <div className="text-center">
              <span className="text-xl font-black block">75%</span>
              <span className="text-[6px] opacity-40 uppercase">Buffer_Ready</span>
            </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ ACCESS_DENIAL ]" className="flex items-center gap-8 p-8 group hover:bg-[#00f2ff]/5 transition-all">
          <div className="w-24 h-24 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/5 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,242,255,0.1)]">
             <Lock className="w-10 h-10 text-[#00f2ff]" />
             <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#00f2ff]" />
             <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00f2ff]" />
          </div>

          <div className="flex-1 flex flex-col gap-5">
             <div className="text-left">
                <span className="text-[12px] font-black tracking-widest uppercase block mb-1">Gate_Lockdown</span>
                <span className="text-[7px] opacity-40 uppercase block">[ STATUS: ENCRYPTED_LOCK ]</span>
             </div>
             
             <div className="flex">
                <div className="w-20 h-10 border border-[#00f2ff]/40 bg-black flex items-center px-2 group-hover:border-[#00f2ff] transition-all">
                   <div className="w-6 h-6 bg-[#00f2ff] border border-[#00f2ff] flex items-center justify-center">
                      <div className="w-2 h-2 bg-black" />
                   </div>
                   <div className="flex-1 flex flex-col gap-1 ml-3">
                      <div className="h-1 w-full bg-[#00f2ff]/40" />
                      <div className="h-1 w-1/2 bg-[#00f2ff]/20" />
                   </div>
                </div>
             </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ HONEYPOT_CLUSTER ]" className="flex flex-col p-6 group hover:bg-[#00f2ff]/5 transition-all">
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/30 rounded-lg border border-[#00f2ff]/10">
             <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
                <circle cx="100" cy="50" r="20" fill="none" stroke="#00f2ff" strokeWidth="0.5" className="animate-pulse" />
                <path d="M50 20 L100 50 M150 20 L100 50 M50 80 L100 50 M150 80 L100 50" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="3 3" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <circle key={i} cx={50 + (i % 2 === 0 ? 0 : 100)} cy={20 + (i < 2 ? 0 : 60)} r="4" fill="#00f2ff" className="animate-flicker" />
                ))}
             </svg>
          </div>
          <div className="text-center mt-4">
             <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#00f2ff]/60">[ INTRUDERS TRAPPED: 0 ]</span>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="SYSTEM_OVERRIDE" isAccent className="flex flex-col items-center justify-center p-6 bg-[#f43f5e]/5 group hover:bg-[#f43f5e]/10 transition-all">
           <button className="relative w-full py-7 border-2 border-[#f43f5e] bg-[#f43f5e]/15 rounded-lg group-hover:scale-[1.01] transition-transform overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
              <span className="text-[11px] font-black tracking-[0.4em] text-[#f43f5e] uppercase">
                !! EMERGENCY_TAKEOVER !!
              </span>
           </button>
           <div className="mt-6 text-[7px] font-bold uppercase tracking-[0.2em] opacity-40 text-[#f43f5e]">
              REQUIRES_HIGHER_CLEARANCE_AUTH
           </div>
        </DoubleBorderPanel>
      </div>

      <div className="flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#00f2ff]">
              [ TOTAL_IMPACT_METRIC: {impact}% ]
            </span>
            <span className="text-[7px] opacity-40 font-mono tracking-widest">Aegis_Tactical_v2.0</span>
         </div>
         <div className="h-5 w-full bg-black border border-[#00f2ff]/20 relative p-0.5 rounded-sm">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${impact}%` }}
              className="h-full bg-gradient-to-r from-[#00f2ff]/40 to-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center justify-end px-3"
            >
               <span className="text-[7px] font-black text-black">{impact}%</span>
            </motion.div>
         </div>
         <div className="flex justify-between items-end">
            <p className="max-w-2xl text-[8px] opacity-40 uppercase tracking-[0.2em] leading-relaxed">
              Proprietary military-grade algorithms ensure data integrity during offensive operations. All actions are logged and encrypted at source.
            </p>
            <button className="px-10 py-4 bg-[#00f2ff] text-black text-[10px] font-black uppercase tracking-[0.3em] tactic-clip hover:opacity-85 active:scale-95 transition-all">
              EXECUTE_COMMAND
            </button>
         </div>
      </div>
    </div>
  );
}

// Otros módulos se mantienen con mejoras menores de espaciado y estilo

function ReconModule() {
  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      <DoubleBorderPanel title="GLOBAL_FOOTPRINT_SCAN" className="col-span-2 relative bg-black/20">
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 1000 600" className="w-full h-full opacity-60">
            <path d="M100 300 Q250 100 400 300 T700 300 T900 100" fill="none" stroke="#00f2ff" strokeWidth="0.5" className="animate-pulse" />
            <circle cx="200" cy="200" r="3" fill="#00f2ff" />
            <circle cx="500" cy="350" r="4" fill="#f43f5e" className="animate-ping" />
            <circle cx="750" cy="150" r="3" fill="#00f2ff" />
            <rect x="0" y="0" width="1000" height="600" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f2ff11" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
      </DoubleBorderPanel>
      <div className="flex flex-col gap-6">
        <DoubleBorderPanel title="DPI_STREAM" className="flex-1">
          <div className="p-3 overflow-hidden flex flex-col gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="text-[7px] font-mono whitespace-nowrap opacity-50 overflow-hidden flex gap-3">
                <span className="text-[#00f2ff]">[OK]</span>
                <span className="flex-1">{`NODE_0x${Math.random().toString(16).slice(2, 6).toUpperCase()} // DATA_VERIFIED`}</span>
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="SIGNAL_STRENGTH" className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ val: 30 + Math.random() * 70 }))}>
              <Area type="step" dataKey="val" stroke="#00f2ff" fill="#00f2ff" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function DataPurgeModule() {
  const [purging, setPurging] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (purging) {
      interval = setInterval(() => {
        setProgress(p => (p < 100 ? p + 0.3 : 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [purging]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex gap-6 h-2/3">
        <DoubleBorderPanel title="SANITIZATION_CORE" className="flex-1 flex flex-col items-center justify-center gap-10 relative overflow-hidden bg-black/40">
          <motion.div 
            animate={{ rotate: purging ? 360 : 0 }} 
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className={`w-48 h-48 border-8 border-dashed ${purging ? 'border-[#f43f5e] shadow-[0_0_30px_rgba(244,63,94,0.2)]' : 'border-[#00f2ff]/20'} rounded-full flex items-center justify-center transition-all`}
          >
            <Database className={`w-14 h-14 ${purging ? 'text-[#f43f5e]' : 'text-[#00f2ff]/20'}`} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-4xl font-black tracking-widest">{progress.toFixed(1)}%</h3>
            <p className="text-[9px] opacity-40 uppercase mt-2 tracking-[0.5em]">Sanitizing_Sectors...</p>
          </div>
          {purging && <div className="absolute inset-0 bg-[#f43f5e]/5 animate-pulse pointer-events-none" />}
        </DoubleBorderPanel>
        
        <DoubleBorderPanel title="SHREDDER_QUEUE" className="w-1/3">
          <div className="p-3 space-y-2 overflow-hidden h-full">
            {purging && Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="text-[7px] font-mono text-[#f43f5e] opacity-70 animate-flicker">
                [PURGE] file_0x{Math.random().toString(36).substring(7)}.mil
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
      </div>
      
      <DoubleBorderPanel title="PURGE_CONTROLS" className="flex-1 flex items-center justify-between px-16">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] opacity-30 uppercase tracking-widest">Time_To_Zero</span>
          <span className="text-2xl font-black font-mono">00:0{Math.floor((100 - progress)/25)}:{(100 - progress).toFixed(0)}</span>
        </div>
        <button 
          onClick={() => { setPurging(!purging); if(!purging) setProgress(0); }}
          className={`px-16 py-5 border-2 font-black uppercase tracking-[0.4em] transition-all tactic-clip ${
            purging ? 'border-[#f43f5e] text-[#f43f5e] bg-[#f43f5e]/10 animate-pulse' : 'border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/10'
          }`}
        >
          {purging ? 'TERMINATE_PURGE' : 'START_GLOBAL_WIPE'}
        </button>
      </DoubleBorderPanel>
    </div>
  );
}

function AIAdvisorModule() {
  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <DoubleBorderPanel title="STRATEGIC_AI_ADVISOR" className="col-span-3 flex flex-col bg-black/20">
        <div className="flex-1 p-6 overflow-y-auto terminal-scroll space-y-6">
          <div className="flex flex-col gap-2 max-w-[85%]">
            <div className="flex items-center gap-3">
               <Brain className="w-4 h-4 text-[#00f2ff]" />
               <span className="text-[8px] text-[#00f2ff] font-bold uppercase tracking-widest">Gemini_Tactical_v2.5</span>
            </div>
            <div className="p-5 bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[11px] leading-relaxed rounded-r-lg border-l-4">
              ANALYSIS COMPLETE. RECOMMEND IMMEDIATE REINFORCEMENT OF SECTOR 7. ANOMALIES DETECTED IN LATENCY PATTERNS SUGGEST AN IMPENDING BREACH ATTEMPT. PROTOCOL 9 STATUS: READY.
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-[#00f2ff]/10 flex gap-3 bg-black/40">
          <input type="text" placeholder="COMMAND_ADVISOR..." className="flex-1 bg-black/60 border border-[#00f2ff]/20 px-5 py-3 text-[10px] outline-none focus:border-[#00f2ff] transition-all" />
          <button className="px-8 py-3 bg-[#00f2ff] text-[#010409] font-black text-[10px] uppercase tracking-widest hover:opacity-80 transition-all">SEND_QUERY</button>
        </div>
      </DoubleBorderPanel>
      
      <div className="flex flex-col gap-6">
        <DoubleBorderPanel title="THREAT_LEVEL" className="flex-1 flex flex-col items-center justify-center gap-4">
          <span className="text-3xl font-black text-[#f43f5e] animate-pulse">ELEVATED</span>
          <div className="w-full h-1 bg-[#f43f5e]/20 overflow-hidden">
             <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1/2 h-full bg-[#f43f5e]" />
          </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="COGNITIVE_LOAD" className="h-40 flex flex-col justify-center items-center gap-2">
          <span className="text-3xl font-black text-[#00f2ff]">3.1%</span>
          <span className="text-[9px] opacity-40 uppercase tracking-widest text-center">Neural_Core_Load</span>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function SystemLogsModule() {
  return (
    <DoubleBorderPanel title="TACTICAL_AUDIT_LOGS" className="h-full">
      <div className="flex-1 overflow-y-auto terminal-scroll p-5 font-mono text-[9px] leading-relaxed space-y-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="flex gap-5 group hover:bg-[#00f2ff]/5 transition-colors py-1 px-2 border-l border-transparent hover:border-[#00f2ff]/40">
            <span className="opacity-25 font-bold">[{new Date().toISOString().slice(11, 19)}]</span>
            <span className="text-[#00f2ff] font-bold tracking-widest">AUDIT_SEC:</span>
            <span className="opacity-70">{`Encryption layer ${Math.random().toString(36).slice(7).toUpperCase()} synchronized across all active nodes.`}</span>
          </div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}
