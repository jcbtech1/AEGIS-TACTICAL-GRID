
"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * Se ha eliminado la barra lateral para permitir una experiencia de pantalla completa en todos los módulos.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Trash2, Brain, 
  Globe, Lock, Cpu, 
  Undo2, HardDrive, Eye,
  Fingerprint, ShieldCheck,
  List, Radar, Radio, Loader2,
  Sparkles, Zap, Activity,
  Database, Terminal as TerminalIcon,
  Mic, Send, Power, ShieldAlert,
  ArrowLeft, Cloud, Thermometer,
  Wind, Gauge, MicOff, Volume2,
  ChevronRight,
  Target,
  Link2,
  Link2Off,
  Hash,
  Server,
  Layers,
  Unlock,
  Key,
  RefreshCw,
  AlertTriangle,
  Wifi,
  History,
  Crosshair
} from 'lucide-react';
import VisualScanModule from './visual-scan';
import { sendTacticalCommand } from '@/app/actions';

type ModuleType = 'STRATEGIC_INTELLIGENCE' | 'SECURITY_MANAGEMENT' | 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AEGIS_IA' | 'SYSTEM_LOGS' | 'INFRASTRUCTURE';

interface AdvancedOpsProps {
  onBack: () => void;
  initialModule?: ModuleType;
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
        <Lock className="w-8 h-8 text-[#f43f5e] mb-2" />
        <span className="text-[8px] font-black text-[#f43f5e] tracking-[0.3em] uppercase text-center px-6">
          LEVEL_{requiredLevel}_REQUIRED
        </span>
      </div>
    </div>
  );
};

export default function AdvancedOpsScreen({ onBack, initialModule }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>(initialModule || 'STRATEGIC_INTELLIGENCE');
  const [currentClearance, setCurrentClearance] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (initialModule) {
      setActiveModule(initialModule);
    }
  }, [initialModule]);

  if (!isMounted) return null;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-3 flex flex-col gap-3 font-mono relative box-border">
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      <header className="flex justify-between items-center shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-[10px] font-black tracking-widest uppercase text-[#00f2ff]">
              AEGIS_MODULE // [{activeModule.replace('_', ' ')}]
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
             <span className="text-[5px] opacity-40 uppercase tracking-widest">Operator_Status</span>
             <span className="text-[8px] font-bold text-emerald-400">AUTHORIZED_L_{currentClearance}</span>
           </div>
           <div className="w-8 h-8 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex items-center justify-center">
              <Shield className="w-4 h-4" />
           </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 relative overflow-hidden z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            {activeModule === 'STRATEGIC_INTELLIGENCE' && <StrategicIntelligenceModule />}
            {activeModule === 'SECURITY_MANAGEMENT' && <SecurityManagementModule currentClearance={currentClearance} onLevelChange={setCurrentClearance} />}
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
            {activeModule === 'AEGIS_IA' && <AegisIAModule currentLevel={currentClearance} />}
            {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
            {activeModule === 'INFRASTRUCTURE' && <InfrastructureModule />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="h-5 shrink-0 bg-black/80 border border-[#00f2ff]/20 overflow-hidden flex items-center z-30">
        <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center">
          <motion.div 
            animate={{ x: [0, -500] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-12 text-[6px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]"
          >
            <span>PROTOCOL_7B_ACTIVE... STATUS: SECURE</span>
            <span>SCANNING_SECTOR_9... NO_INTRUSIONS_DETECTION</span>
            <span>ENCRYPTION_LAYER_8_REINFORCED</span>
            <span>NEURAL_LINK_STABLE</span>
            <span>GRID_INTEGRITY_99.9%</span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

// --- MÓDULOS (Componentes Internos) ---

function SecurityManagementModule({ currentClearance, onLevelChange }: { currentClearance: number, onLevelChange: (l: number) => void }) {
  const [matrix, setMatrix] = useState<string[]>([]);
  const [integrity, setIntegrity] = useState(99.4);
  const [activeLayers, setActiveLayers] = useState([
    { id: 'FW-01', name: 'NEURAL_FIREWALL', status: 'ACTIVE' },
    { id: 'ENC-X', name: 'PACKET_SHREDDER', status: 'ACTIVE' },
    { id: 'ID-7', name: 'HEURISTIC_IDS', status: 'STANDBY' },
  ]);

  useEffect(() => {
    const generateRow = () => Array.from({ length: 4 }).map(() => Math.random().toString(16).slice(2, 6).toUpperCase()).join(' ');
    setMatrix(Array.from({ length: 8 }).map(generateRow));

    const interval = setInterval(() => {
      setMatrix(prev => [...prev.slice(1), generateRow()]);
      setIntegrity(99.2 + Math.random() * 0.6);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative">
      <div className="flex-[2] flex flex-col gap-4 min-h-0">
        <DoubleBorderPanel title="AUTHENTICATION_MATRIX" className="flex-1 bg-black/60">
           <div className="flex-1 overflow-hidden p-4 font-mono text-[8px] text-[#00f2ff]/40 space-y-2">
              {matrix.map((row, i) => (
                <div key={i} className="flex justify-between items-center opacity-60">
                  <span className="text-[#00f2ff]/20">0x{i.toString(16).padStart(4, '0')}</span>
                  <span className="tracking-[0.5em]">{row}</span>
                  <span className="text-emerald-500/40">VALID</span>
                </div>
              ))}
              <div className="border-t border-[#00f2ff]/10 pt-2 mt-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[6px] uppercase tracking-widest">Key_Rotation_Sequence</span>
                    <RefreshCw className="w-3 h-3 animate-spin text-[#00f2ff]/40" />
                 </div>
              </div>
           </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="ACTIVE_SECURITY_LAYERS" className="flex-1 bg-black/40">
           <div className="p-3 space-y-3">
              {activeLayers.map((layer, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-[#00f2ff]/10 bg-[#00f2ff]/5">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className={`w-4 h-4 ${layer.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-500'}`} />
                      <div className="flex flex-col">
                         <span className="text-[8px] font-black uppercase tracking-widest">{layer.name}</span>
                         <span className="text-[5px] opacity-40 uppercase">{layer.id}</span>
                      </div>
                   </div>
                   <div className={`text-[7px] font-bold px-2 py-0.5 border ${layer.status === 'ACTIVE' ? 'border-emerald-400 text-emerald-400' : 'border-amber-500 text-amber-500'}`}>
                      {layer.status}
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-auto p-3 border-t border-[#00f2ff]/10">
              <button className="w-full py-2 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[7px] font-black uppercase tracking-widest hover:bg-[#00f2ff]/20 transition-all">
                 REINFORCE_ALL_LAYERS
              </button>
           </div>
        </DoubleBorderPanel>
      </div>

      <div className="flex-[3] flex flex-col gap-4 min-h-0">
        <DoubleBorderPanel title="SYSTEM_INTEGRITY_INDEX" className="h-64 flex items-center justify-center bg-black/80 relative">
           <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                 <circle cx="96" cy="96" r="80" fill="none" stroke="#00f2ff" strokeWidth="1" strokeDasharray="502" strokeDashoffset={502 - (502 * integrity / 100)} className="transition-all duration-1000" />
                 <circle cx="96" cy="96" r="88" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="2, 8" className="opacity-20" />
              </svg>
              <div className="flex flex-col items-center">
                 <span className="text-4xl font-black text-[#00f2ff] drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">{integrity.toFixed(1)}%</span>
                 <span className="text-[6px] font-bold opacity-40 uppercase tracking-[0.4em]">Grid_Stability</span>
              </div>
           </div>
           
           <div className="absolute bottom-4 w-full px-8 flex justify-between items-center">
              <div className="flex flex-col items-start">
                 <span className="text-[5px] opacity-40 uppercase">Threat_Level</span>
                 <span className="text-[10px] font-black text-emerald-400">NOMINAL</span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[5px] opacity-40 uppercase">Enc_Strength</span>
                 <span className="text-[10px] font-black text-[#00f2ff]">MIL_SPEC_AES</span>
              </div>
           </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="OPERATOR_CLEARANCE_CONTROL" className="flex-1 bg-[#00f2ff]/5">
           <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
              <div className="flex items-center gap-12">
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-[6px] opacity-40 uppercase tracking-[0.3em]">Current_Level</span>
                    <div className="w-16 h-16 rounded-full border-2 border-[#00f2ff] flex items-center justify-center bg-[#00f2ff]/10 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                       <span className="text-3xl font-black">{currentClearance}</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(l => (
                      <button 
                        key={l} 
                        onClick={() => onLevelChange(l)}
                        className={`
                          w-8 h-8 flex items-center justify-center border font-black text-[10px] transition-all
                          ${currentClearance === l 
                            ? 'bg-[#00f2ff] text-black border-[#00f2ff] shadow-[0_0_10px_#00f2ff]' 
                            : 'border-[#00f2ff]/30 text-[#00f2ff]/60 hover:bg-[#00f2ff]/10'}
                        `}
                      >
                        L{l}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="w-full flex gap-4">
                 <button className="flex-1 py-3 border border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e] text-[8px] font-black uppercase tracking-[0.3em] hover:bg-[#f43f5e]/20 transition-all flex items-center justify-center gap-3">
                    <Lock className="w-3 h-3" />
                    TOTAL_LOCKDOWN
                 </button>
                 <button className="flex-1 py-3 border border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.3em] hover:bg-[#00f2ff]/20 transition-all flex items-center justify-center gap-3">
                    <RefreshCw className="w-3 h-3" />
                    REAUTHORIZE_SESSION
                 </button>
              </div>
           </div>
        </DoubleBorderPanel>
      </div>

      <div className="flex-[2] flex flex-col gap-4 min-h-0">
        <DoubleBorderPanel title="BIOMETRIC_IDENTITY_FEED" className="flex-[3] bg-black/60 relative">
           <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="relative w-32 h-32 border border-[#00f2ff]/20 bg-black p-2 overflow-hidden">
                 <Fingerprint className="w-full h-full text-[#00f2ff]/20" />
                 <motion.div 
                   animate={{ top: ['0%', '100%', '0%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_15px_#00f2ff]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/5 to-transparent animate-scan" />
              </div>
              <div className="mt-6 w-full space-y-3">
                 <div className="flex justify-between text-[7px] border-b border-[#00f2ff]/10 pb-1">
                    <span className="opacity-40 uppercase">Genetic_Auth</span>
                    <span className="text-emerald-400 font-bold uppercase">MATCH_OK</span>
                 </div>
                 <div className="flex justify-between text-[7px] border-b border-[#00f2ff]/10 pb-1">
                    <span className="opacity-40 uppercase">Iris_Scan</span>
                    <span className="text-emerald-400 font-bold uppercase">MATCH_OK</span>
                 </div>
                 <div className="flex justify-between text-[7px] border-b border-[#00f2ff]/10 pb-1">
                    <span className="opacity-40 uppercase">Heart_Rate</span>
                    <span className="text-[#00f2ff] font-bold">72 BPM</span>
                 </div>
              </div>
           </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="SECURITY_AUDIT_ALERTS" className="flex-[2] bg-black/60" isAccent>
           <div className="flex-1 overflow-y-auto terminal-scroll p-3 space-y-2">
              {[
                { time: '14:22:01', msg: 'ACCESS_DENIED_SECTOR_7', type: 'CRITICAL' },
                { time: '14:18:45', msg: 'HEURISTIC_IDS_ANOMALY', type: 'WARNING' },
                { time: '14:05:12', msg: 'OPERATOR_AUTH_SUCCESS', type: 'INFO' },
                { time: '13:58:22', msg: 'ENCRYPTION_KEY_ROTATED', type: 'INFO' },
              ].map((alert, i) => (
                <div key={i} className={`flex flex-col p-1.5 border-l-2 ${
                  alert.type === 'CRITICAL' ? 'border-[#f43f5e] bg-[#f43f5e]/5' : 
                  alert.type === 'WARNING' ? 'border-amber-500 bg-amber-500/5' : 'border-[#00f2ff]/40 bg-[#00f2ff]/5'
                }`}>
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[5px] opacity-40">{alert.time}</span>
                      <span className={`text-[5px] font-bold ${
                        alert.type === 'CRITICAL' ? 'text-[#f43f5e]' : 
                        alert.type === 'WARNING' ? 'text-amber-500' : 'text-[#00f2ff]'
                      }`}>{alert.type}</span>
                   </div>
                   <span className="text-[7px] font-black uppercase tracking-tight truncate">{alert.msg}</span>
                </div>
              ))}
           </div>
           <div className="p-2 border-t border-[#f43f5e]/20 flex justify-center">
              <span className="text-[5px] text-[#f43f5e] font-black uppercase animate-pulse">Live_Security_Watchdog_Active</span>
           </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function SystemLogsModule() {
  const [logs, setLogs] = useState<string[]>([]);
  const [memoryBlocks, setMemoryBlocks] = useState<number[]>([]);

  useEffect(() => {
    // Initial logs
    const initialLogs = Array.from({ length: 25 }).map((_, i) => 
      `[${new Date().toLocaleTimeString()}] NODE_BOOT_SEQ_${i.toString(16).toUpperCase()} // OK`
    );
    setLogs(initialLogs);

    // Initial memory map
    setMemoryBlocks(Array.from({ length: 64 }).map(() => Math.random()));

    const interval = setInterval(() => {
      const types = ["SYSTEM", "SECURITY", "NETWORK", "KERNEL", "ACCESS"];
      const type = types[Math.floor(Math.random() * types.length)];
      const codes = ["0x88AF", "0x22BC", "0x9900", "0xFA12", "0x00FF"];
      const code = codes[Math.floor(Math.random() * codes.length)];
      
      const newLog = `[${new Date().toLocaleTimeString()}] ${type} // ${code} // STATUS_OK_ACK`;
      setLogs(prev => [...prev.slice(-50), newLog]);
      
      setMemoryBlocks(prev => {
        const next = [...prev];
        next[Math.floor(Math.random() * 64)] = Math.random();
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative">
      <div className="flex-[3] flex flex-col min-h-0">
        <DoubleBorderPanel title="TACTICAL_AUDIT_STREAM" className="flex-1 min-h-0 bg-black/60">
          <div className="flex-1 overflow-y-auto terminal-scroll p-4 font-mono text-[8px] space-y-1.5 leading-relaxed">
             {logs.map((log, i) => (
               <motion.div 
                 initial={{ opacity: 0, x: -5 }}
                 animate={{ opacity: 1, x: 0 }}
                 key={i} 
                 className="flex gap-4 group"
               >
                 <span className="opacity-20 shrink-0 font-bold tracking-widest">{i.toString().padStart(4, '0')}</span>
                 <span className={`
                   ${log.includes('SECURITY') ? 'text-amber-500' : 
                     log.includes('KERNEL') ? 'text-[#00f2ff]' : 
                     log.includes('NETWORK') ? 'text-blue-400' : 'text-[#00f2ff]/60'}
                   group-hover:text-white transition-colors
                 `}>
                   {log}
                 </span>
               </motion.div>
             ))}
             <div className="flex items-center gap-2 pt-2 text-[#00f2ff] animate-pulse">
                <span className="text-[10px]">{">"}</span>
                <span className="w-2 h-4 bg-[#00f2ff]" />
             </div>
          </div>
          
          <div className="p-2 border-t border-[#00f2ff]/10 bg-[#00f2ff]/5 flex justify-between items-center">
             <div className="flex gap-4">
                <span className="text-[6px] font-black tracking-widest uppercase">Buffer_Status: OPTIMAL</span>
                <span className="text-[6px] font-black tracking-widest uppercase">Encryption: AES_X64</span>
             </div>
             <span className="text-[6px] font-black tracking-widest uppercase opacity-40">Live_Capture_Active</span>
          </div>
        </DoubleBorderPanel>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <DoubleBorderPanel title="MEMORY_FRAGMENTATION" className="h-64 shrink-0 bg-black/40">
           <div className="p-3 grid grid-cols-8 gap-1.5">
              {memoryBlocks.map((val, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    opacity: val > 0.8 ? [0.4, 1, 0.4] : 1,
                    scale: val > 0.9 ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 1 + val, repeat: Infinity }}
                  className={`
                    aspect-square border border-[#00f2ff]/20 
                    ${val > 0.7 ? 'bg-[#00f2ff]' : 
                      val > 0.4 ? 'bg-[#00f2ff]/40' : 
                      val > 0.2 ? 'bg-[#00f2ff]/10' : 'bg-transparent'}
                  `}
                />
              ))}
           </div>
           <div className="mt-auto p-3 space-y-2 bg-[#00f2ff]/5 border-t border-[#00f2ff]/10">
              <div className="flex justify-between items-center">
                 <span className="text-[6px] opacity-40 uppercase">Total_Allocated</span>
                 <span className="text-[8px] font-black">256.4 TB</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[6px] opacity-40 uppercase">Page_Faults</span>
                 <span className="text-[8px] font-black text-emerald-400">0.00%</span>
              </div>
           </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="KERNEL_PROCESSES" className="flex-1 min-h-0 bg-black/40">
           <div className="flex-1 overflow-y-auto terminal-scroll p-3 space-y-4">
              {[
                { name: 'Neural_Synapse', load: 42, color: 'text-[#00f2ff]' },
                { name: 'Grid_Topology', load: 12, color: 'text-[#00f2ff]' },
                { name: 'Shield_Protocol', load: 88, color: 'text-amber-500' },
                { name: 'DPI_Inference', load: 24, color: 'text-[#00f2ff]' },
                { name: 'I/O_Multiplex', load: 5, color: 'text-[#00f2ff]' },
              ].map((proc, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex justify-between items-center">
                      <span className="text-[7px] font-black tracking-widest uppercase">{proc.name}</span>
                      <span className={`text-[7px] font-black ${proc.color}`}>{proc.load}%</span>
                   </div>
                   <div className="h-1 bg-white/5 w-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${proc.load}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className={`h-full ${proc.load > 80 ? 'bg-amber-500' : 'bg-[#00f2ff]'} shadow-[0_0_5px_currentColor]`}
                      />
                   </div>
                </div>
              ))}
           </div>
           <div className="p-2 text-center border-t border-[#00f2ff]/10">
              <span className="text-[5px] opacity-20 uppercase tracking-[0.5em]">System_Integrity_Verified</span>
           </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function AegisIAModule({ currentLevel }: { currentLevel: number }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { role: 'ai', text: 'SISTEMA AEGIS EN LÍNEA. NÚCLEO NEURONAL ESTABILIZADO. ESPERANDO COMANDOS.', timestamp: '00:00:00', source: 'LOCAL' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [linkStatus, setLinkStatus] = useState<'LOCAL' | 'EXTERNAL' | 'WAITING'>('LOCAL');
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 45, load: 22, sync: 99.9 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.1;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript.toUpperCase());
      };
      recognition.start();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(15 + Math.random() * 15),
        ram: Math.floor(40 + Math.random() * 8),
        load: Math.floor(18 + Math.random() * 12),
        sync: 99.85 + Math.random() * 0.15
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (forcedInput?: string) => {
    const messageToSend = forcedInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg = { 
      role: 'operator', 
      text: messageToSend.toUpperCase(),
      timestamp: new Date().toLocaleTimeString().slice(0, 8)
    };
    
    setHistory(prev => [...prev, userMsg as any]);
    setInput('');
    setIsLoading(true);
    setLinkStatus('WAITING');

    try {
      const result = await sendTacticalCommand({
        message: userMsg.text,
        systemStatus: { 
          threatLevel: "STABLE_ZONE", 
          activeNodes: 18, 
          throughput: `${metrics.load} Mb/s` 
        }
      });

      const aiResponse = { 
        role: 'ai', 
        text: result.response,
        timestamp: new Date().toLocaleTimeString().slice(0, 8),
        source: (result as any).source || 'LOCAL'
      };

      setHistory(prev => [...prev, aiResponse as any]);
      setLinkStatus((result as any).source || 'LOCAL');
      speak(aiResponse.text);

    } catch (error) {
      console.error("AI Link Failure:", error);
      const errorMsg = "ERROR: INTERRUPCIÓN EN EL ENLACE NEURONAL.";
      setHistory(prev => [...prev, { role: 'ai', text: errorMsg, timestamp: 'ERR', source: 'ERROR' } as any]);
      setLinkStatus('LOCAL');
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative">
      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
        <div className="absolute top-4 left-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 p-1.5 border-l-2 border-[#00f2ff] bg-[#00f2ff]/5">
             <div className="flex flex-col">
                <span className="text-[5px] opacity-40 uppercase tracking-[0.2em]">Neural_Sync</span>
                <span className="text-[9px] font-black">{metrics.sync.toFixed(2)}%</span>
             </div>
          </div>
          <div className="flex items-center gap-3 p-1.5 border-l-2 border-[#00f2ff]/40 bg-[#00f2ff]/2">
             <div className="flex flex-col">
                <span className="text-[5px] opacity-40 uppercase tracking-[0.2em]">Proc_Load</span>
                <span className="text-[9px] font-black">{metrics.cpu}%</span>
             </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
           <span className="text-[5px] opacity-40 uppercase tracking-[0.4em]">Data_Link_Status</span>
           <div className={`flex items-center gap-2 px-2 py-1 border text-[7px] font-black tracking-widest ${
             linkStatus === 'EXTERNAL' ? 'border-[#00f2ff] text-[#00f2ff] bg-[#00f2ff]/10' : 
             linkStatus === 'WAITING' ? 'border-amber-500 text-amber-500 animate-pulse' :
             'border-[#00f2ff]/20 text-[#00f2ff]/40'
           }`}>
             {linkStatus === 'EXTERNAL' ? <Link2 className="w-3 h-3" /> : <Link2Off className="w-3 h-3" />}
             {linkStatus === 'EXTERNAL' ? 'EXTERNAL_LINK_ACTIVE' : 
              linkStatus === 'WAITING' ? 'ESTABLISHING_LINK...' : 'LOCAL_CORE_ONLY'}
           </div>
        </div>

        <div className="absolute top-4 right-4 text-right flex flex-col gap-1">
          <span className="text-[12px] font-black tracking-tighter text-[#00f2ff] flex items-center gap-2 justify-end">
             <Cloud className="w-3 h-3" /> 22.4°C
          </span>
          <span className="text-[5px] opacity-40 uppercase tracking-widest">Sector_Grid_Gamma</span>
          <div className="flex gap-1 justify-end mt-2">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className={`w-1 h-3 border border-[#00f2ff]/20 ${i < 4 ? 'bg-[#00f2ff]/60' : ''}`} />
             ))}
          </div>
        </div>

        <div className="relative w-[400px] h-[400px] flex items-center justify-center pointer-events-none">
          <svg className="absolute w-full h-full animate-spin-slow opacity-10" viewBox="0 0 200 200">
             <circle cx="100" cy="100" r="98" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="2,4" />
          </svg>
          <svg className="absolute w-[90%] h-[90%] animate-spin-reverse-slow opacity-30" viewBox="0 0 200 200">
             <circle cx="100" cy="100" r="88" fill="none" stroke="#00f2ff" strokeWidth="1" strokeDasharray="30,10,5,10" />
             <circle cx="100" cy="100" r="86" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="1,15" />
          </svg>
          <svg className="absolute w-[75%] h-[75%] animate-spin-slow opacity-50" viewBox="0 0 200 200">
             <path d="M 100 30 A 70 70 0 0 1 170 100" fill="none" stroke="#00f2ff" strokeWidth="3" />
             <path d="M 30 100 A 70 70 0 0 1 100 170" fill="none" stroke="#00f2ff" strokeWidth="3" />
             <circle cx="100" cy="100" r="68" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="2,8" />
          </svg>
          <svg className="absolute w-[60%] h-[60%] animate-spin-reverse-slow" viewBox="0 0 200 200">
             {Array.from({ length: 36 }).map((_, i) => (
               <circle key={i} cx={100 + 55 * Math.cos(i * 10 * Math.PI / 180)} cy={100 + 55 * Math.sin(i * 10 * Math.PI / 180)} r="0.8" fill="#00f2ff" opacity={i % 4 === 0 ? 1 : 0.2} />
             ))}
          </svg>
          <div className="relative w-36 h-36 rounded-full border-2 border-[#00f2ff]/60 bg-[#00f2ff]/5 flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(0,242,255,0.2)]">
             <div className="flex flex-col items-center">
                <h1 className="text-xl font-black tracking-[0.5em] text-[#00f2ff] ml-[0.5em] drop-shadow-[0_0_10px_#00f2ff]">AEGIS</h1>
                <span className="text-[6px] font-bold text-[#00f2ff]/40 tracking-[0.3em] uppercase mt-1">
                   {isListening ? 'LISTENING...' : isLoading ? 'PROCESSING...' : 'CORE_ACTIVE'}
                </span>
             </div>
             <div className="absolute inset-0 border-[3px] border-[#00f2ff]/10 rounded-full border-dashed animate-spin-slow" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-[-10%] border-2 border-[#00f2ff]/5 rounded-full border-dotted"
          />
        </div>

        <div className="absolute bottom-12 w-full px-32 flex justify-between items-center text-[#00f2ff]/60">
           <div className="flex gap-4">
              <div className="flex flex-col">
                 <span className="text-[5px] uppercase">Heuristic_Node</span>
                 <span className="text-[8px] font-bold">ALPHA_SEC_01</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[5px] uppercase">Latency</span>
                 <span className="text-[8px] font-bold">0.04ms</span>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[5px] uppercase">Logic_Throughput</span>
              <span className="text-[14px] font-black text-[#00f2ff]">{metrics.load} TFlops</span>
           </div>
        </div>
      </div>

      <div className="w-[320px] flex flex-col gap-3 h-full min-h-0 bg-black/40 border-l border-[#00f2ff]/10 z-10 backdrop-blur-md">
        <div className="p-3 border-b border-[#00f2ff]/10 flex justify-between items-center bg-[#00f2ff]/5">
           <div className="flex items-center gap-3">
             <Brain className="w-4 h-4 text-[#00f2ff]" />
             <span className="text-[8px] font-black tracking-widest uppercase">Aegis_Comm_Link</span>
           </div>
           {isListening && <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />}
        </div>

        <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
           <AnimatePresence mode="popLayout">
              {history.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[95%] p-2.5 border transition-all ${
                    msg.role === 'ai' 
                    ? 'border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff]' 
                    : 'border-[#f43f5e]/30 bg-[#f43f5e]/5 text-[#f43f5e]'
                  } fui-corner-brackets`}>
                    <div className="flex justify-between items-center mb-1.5 opacity-40">
                      <span className="text-[5px] font-black uppercase tracking-widest">
                        {msg.role === 'ai' ? `AEGIS_INTEL [${(msg as any).source}]` : 'OPERATOR_COM'}
                      </span>
                      {msg.role === 'ai' && (
                        <Volume2 className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => speak(msg.text)} />
                      )}
                    </div>
                    <p className="text-[8px] font-mono uppercase leading-relaxed tracking-tight">
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex items-center gap-3 text-[#00f2ff]/40 p-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-[7px] font-black tracking-[0.3em]">SYNCHRONIZING...</span>
              </div>
            )}
            <div ref={chatEndRef} />
        </div>

        <div className="p-3 bg-black/60 border-t border-[#00f2ff]/10">
           <div className="flex gap-2">
              <button 
                onClick={startListening}
                disabled={isLoading}
                className={`w-9 h-9 flex items-center justify-center border transition-all ${
                  isListening 
                  ? 'border-red-500 bg-red-500/20 text-red-500' 
                  : 'border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] hover:bg-[#00f2ff]/20'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>

              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "RECORDING..." : "ENTER_QUERY..."} 
                disabled={isLoading}
                className="flex-1 bg-[#00f2ff]/5 border border-[#00f2ff]/20 px-3 py-1.5 text-[8px] outline-none text-[#00f2ff] placeholder:text-[#00f2ff]/10 uppercase font-mono" 
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center bg-[#00f2ff] text-black hover:bg-[#00f2ff]/80 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function StrategicIntelligenceModule() {
  return (
    <div className="flex flex-col h-full gap-3 min-h-0 overflow-hidden">
      <div className="grid grid-cols-12 gap-3 flex-[3] min-h-0">
        <DoubleBorderPanel title="[ GEO_TACTICAL ]" className="col-span-8 bg-[#000508]/60">
           <div className="w-full h-full flex items-center justify-center opacity-20">
              <Globe className="w-12 h-12" />
           </div>
        </DoubleBorderPanel>
        <div className="col-span-4 flex flex-col gap-2">
          <DoubleBorderPanel title="[ KERNEL ]" className="flex-1 flex flex-col items-center justify-center">
             <span className="text-xl font-black">98%</span>
             <span className="text-[5px] opacity-40 uppercase">STABILITY</span>
          </DoubleBorderPanel>
          <DoubleBorderPanel title="[ OFFENSIVE ]" className="flex-1 flex flex-col gap-2 p-2">
             <div className="w-full h-1 bg-[#00f2ff]/10 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-[#00f2ff]" />
             </div>
             <span className="text-[5px] opacity-40 uppercase">SYNCING...</span>
          </DoubleBorderPanel>
        </div>
      </div>
      <DoubleBorderPanel title="[ SECTOR_STREAM ]" className="flex-[2] bg-black/60">
         <div className="flex gap-2 p-2 overflow-x-auto terminal-scroll h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-20 h-full border border-[#00f2ff]/10 flex-shrink-0 bg-[#00f2ff]/5 flex items-center justify-center">
                 <Cpu className="w-3 h-3 opacity-20" />
              </div>
            ))}
         </div>
      </DoubleBorderPanel>
    </div>
  );
}

function ReconModule() {
  const [pings, setPings] = useState<{ x: number, y: number, id: string, type: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['THREAT', 'NODE', 'UNKNOWN'];
      setPings(prev => {
        const newPings = [...prev];
        if (newPings.length > 5) newPings.shift();
        newPings.push({
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
          id: Math.random().toString(36).substr(2, 4).toUpperCase(),
          type: types[Math.floor(Math.random() * types.length)]
        });
        return newPings;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden">
      {/* LEFT: SIGNAL & TELEMETRY */}
      <div className="flex-1 flex flex-col gap-4">
        <DoubleBorderPanel title="SIGNAL_SPECTRUM" className="flex-1 bg-black/40">
           <div className="flex-1 flex items-end gap-[2px] p-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                   key={i}
                   animate={{ height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`] }}
                   transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                   className="flex-1 bg-[#00f2ff]/30 min-h-[2px]"
                />
              ))}
           </div>
           <div className="p-2 border-t border-[#00f2ff]/10 text-center">
              <span className="text-[5px] opacity-40 uppercase tracking-[0.4em]">Frequency_Scan_Active</span>
           </div>
        </DoubleBorderPanel>
        
        <DoubleBorderPanel title="ATMOSPHERIC_SENSORS" className="flex-1 bg-black/40">
           <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                 <span className="text-[6px] opacity-40 uppercase">Ambient_Temp</span>
                 <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[#00f2ff]" />
                    <span className="text-xl font-black">24.2°C</span>
                 </div>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[6px] opacity-40 uppercase">Humidity_Idx</span>
                 <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-[#00f2ff]" />
                    <span className="text-xl font-black">44%</span>
                 </div>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[6px] opacity-40 uppercase">Pressure_hPa</span>
                 <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-[#00f2ff]" />
                    <span className="text-xl font-black">1012</span>
                 </div>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[6px] opacity-40 uppercase">O3_Levels</span>
                 <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xl font-black text-emerald-400">LOW</span>
                 </div>
              </div>
           </div>
        </DoubleBorderPanel>
      </div>

      {/* CENTER: ORBITAL RADAR */}
      <div className="flex-[3] flex flex-col min-h-0">
        <DoubleBorderPanel title="ORBITAL_RECON_RADAR" className="flex-1 bg-black/60 relative flex items-center justify-center">
           {/* Radar circles */}
           <div className="relative w-[400px] h-[400px] flex items-center justify-center border border-[#00f2ff]/10 rounded-full">
              <div className="absolute w-[300px] h-[300px] border border-[#00f2ff]/10 rounded-full" />
              <div className="absolute w-[200px] h-[200px] border border-[#00f2ff]/10 rounded-full" />
              <div className="absolute w-[100px] h-[100px] border border-[#00f2ff]/10 rounded-full" />
              
              {/* Grid lines */}
              <div className="absolute w-full h-[1px] bg-[#00f2ff]/10" />
              <div className="absolute h-full w-[1px] bg-[#00f2ff]/10" />

              {/* Sweep line */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-[150px] bg-gradient-to-t from-transparent via-[#00f2ff]/10 to-transparent top-1/2 origin-top"
              />

              {/* Central crosshair */}
              <Crosshair className="w-6 h-6 text-[#00f2ff] opacity-40" />

              {/* Pings */}
              {pings.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 3 }}
                  className={`absolute w-3 h-3 rounded-full border-2 ${p.type === 'THREAT' ? 'border-red-500' : 'border-[#00f2ff]'}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                   <div className="absolute -top-4 left-0 text-[5px] font-bold text-white bg-black/60 px-1 whitespace-nowrap">
                      {p.id} // {p.type}
                   </div>
                </motion.div>
              ))}
           </div>
           
           <div className="absolute bottom-6 right-6 text-right">
              <span className="text-[10px] font-black text-[#00f2ff] block">COORD: 34.0522° N, 118.2437° W</span>
              <span className="text-[6px] opacity-40 uppercase tracking-[0.3em]">Satellite_Reference: AEGIS_SAT_7</span>
           </div>

           <div className="absolute top-6 left-6">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 bg-red-500 animate-pulse" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Live_Orbital_Feed</span>
              </div>
              <span className="text-[6px] opacity-40 uppercase block">Resolving_Sector_Gamma...</span>
           </div>
        </DoubleBorderPanel>
      </div>

      {/* RIGHT: TRACKING OBJECTS */}
      <div className="flex-1 flex flex-col gap-4">
        <DoubleBorderPanel title="TRACKING_OBJECTS" className="flex-1 bg-black/40">
           <div className="p-3 space-y-2 overflow-y-auto terminal-scroll h-full">
              {[
                { id: 'OBJ-001', type: 'THREAT', dist: '14.2km', status: 'LOCKED' },
                { id: 'SAT-X9', type: 'NODE', dist: '442km', status: 'ACTIVE' },
                { id: 'UNC-44', type: 'UNKNOWN', dist: '2.1km', status: 'TRACKING' },
                { id: 'COM-08', type: 'NODE', dist: '12.4km', status: 'STANDBY' },
                { id: 'BOG-12', type: 'THREAT', dist: '5.8km', status: 'INTERCEPT' },
              ].map((obj, i) => (
                <div key={i} className={`p-2 border ${obj.type === 'THREAT' ? 'border-red-500/30' : 'border-[#00f2ff]/10'} bg-[#00f2ff]/5 flex flex-col gap-1`}>
                   <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-white">{obj.id}</span>
                      <span className={`text-[6px] font-bold px-1 ${obj.type === 'THREAT' ? 'bg-red-500/20 text-red-500' : 'text-[#00f2ff]'}`}>{obj.type}</span>
                   </div>
                   <div className="flex justify-between text-[6px] opacity-40">
                      <span>DIST: {obj.dist}</span>
                      <span className={obj.status === 'LOCKED' ? 'text-red-500 animate-pulse' : 'text-emerald-400'}>{obj.status}</span>
                   </div>
                </div>
              ))}
           </div>
           <div className="p-2 border-t border-[#00f2ff]/10 bg-[#00f2ff]/5">
              <button className="w-full py-2 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[7px] font-black uppercase hover:bg-[#00f2ff]/20 transition-all">
                 Clear_Stale_Tracks
              </button>
           </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function CountermeasuresModule() {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
       <DoubleBorderPanel title="INJECTION" className="flex flex-col items-center justify-center p-4">
          <button className="w-full p-2 border border-[#00f2ff]/40 bg-[#00f2ff]/10 text-[7px] font-black uppercase tracking-widest hover:bg-[#00f2ff]/20 transition-all">Start_Payload</button>
       </DoubleBorderPanel>
       <DoubleBorderPanel title="SIGNAL_JAM" className="flex flex-col items-center justify-center p-4">
          <Radio className="w-8 h-8 text-[#00f2ff]/20 mb-2" />
          <span className="text-[6px] opacity-40">READY_FOR_JAMMING</span>
       </DoubleBorderPanel>
    </div>
  );
}

function DataPurgeModule() {
  return (
    <DoubleBorderPanel title="PURGE_SYSTEM" className="h-full flex flex-col items-center justify-center gap-4" isAccent>
       <span className="text-lg font-black text-[#f43f5e] uppercase tracking-[0.2em]">!! STANDBY_PURGE !!</span>
       <button className="px-6 py-2 border border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e] text-[8px] font-black uppercase tracking-[0.3em] hover:bg-[#f43f5e]/20">Initialize</button>
    </DoubleBorderPanel>
  );
}

function InfrastructureModule() {
  return (
    <div className="grid grid-cols-12 gap-2 h-full">
      <DoubleBorderPanel title="CPU_LOAD" className="col-span-4 flex items-center justify-center">
         <span className="text-xl font-black">42%</span>
      </DoubleBorderPanel>
      <DoubleBorderPanel title="VAULT" className="col-span-8 overflow-y-auto p-1.5 space-y-1">
         {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="text-[6px] border border-[#00f2ff]/10 p-1 flex justify-between">
               <span className="truncate">FILE_0{i}.BIN</span>
               <Lock className="w-2 h-2 opacity-40 shrink-0" />
            </div>
         ))}
      </DoubleBorderPanel>
    </div>
  );
}
