
"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Implementa una interfaz de "Comandancia Militar" con gestión de niveles de acceso (Clearance),
 * bloqueos de seguridad y efectos de elevación de privilegios.
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
  LockKeyhole, User, ArrowUpCircle, AlertTriangle
} from 'lucide-react';
import VisualScanModule from './visual-scan';

type ModuleType = 'STRATEGIC_INTELLIGENCE' | 'SECURITY_MANAGEMENT' | 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS' | 'INFRASTRUCTURE';

interface AdvancedOpsProps {
  onBack: () => void;
}

// --- COMPONENTES DE UTILIDAD TÁCTICA ---

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative ${isAccent ? 'border-[#f43f5e]' : 'border-[#00f2ff]/40'} border bg-black/40 backdrop-blur-md p-3 flex flex-col ${className} fui-corner-brackets overflow-hidden`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-[#020814] text-[7px] font-bold tracking-[0.2em] uppercase z-10 ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative">
      {children}
    </div>
  </div>
);

// --- SISTEMA DE BLOQUEO POR NIVEL (CLEARANCE OVERLAY) ---

const ClearanceOverlay = ({ requiredLevel, currentLevel, children }: { requiredLevel: number, currentLevel: number, children: React.ReactNode }) => {
  const isLocked = currentLevel < requiredLevel;

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      <div className="w-full h-full blur-xl grayscale opacity-30 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-[#f43f5e]/20">
        <Lock className="w-12 h-12 text-[#f43f5e] mb-4 animate-pulse" />
        <span className="text-[10px] font-black text-[#f43f5e] tracking-[0.4em] uppercase text-center px-6">
          INSUFFICIENT_CLEARANCE:<br />
          LEVEL_{requiredLevel}_REQUIRED
        </span>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-4 h-1 ${i < currentLevel ? 'bg-[#00f2ff]' : 'bg-[#f43f5e]/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE FLASH DE ELEVACIÓN ---

const ElevationFlash = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="fixed inset-0 z-[100] bg-white pointer-events-none"
      />
    )}
  </AnimatePresence>
);

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
      className={`relative w-full flex items-center gap-3 px-4 py-2 text-[8px] font-bold tracking-[0.2em] uppercase transition-all overflow-hidden group scan-hover-item ${
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
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-4 flex gap-6 font-mono relative box-border">
      <ElevationFlash active={isElevating} />
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      {/* MENÚ LATERAL TÁCTICO */}
      <aside className="w-[18%] flex flex-col gap-4 z-20 h-full">
        <DoubleBorderPanel className="flex-none p-4">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-[#00f2ff] glitch-text">AEGIS:</h1>
            <span className="text-[6px] opacity-40 uppercase tracking-widest font-bold">Command_Center_X9</span>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel className="flex-1 p-0 flex flex-col">
          <nav className="flex-1 py-2 overflow-y-auto terminal-scroll">
            <div className="px-4 py-2 text-[6px] text-[#00f2ff]/20 uppercase tracking-[0.3em]">Operational_Modules</div>
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

          <div className="mt-auto border-t border-[#00f2ff]/10 p-4">
            <button 
              onClick={onBack}
              className="w-full flex items-center justify-center gap-3 py-2 text-[9px] font-black text-[#00f2ff] uppercase border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 transition-all group relative overflow-hidden tactic-clip"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Undo2 className="w-3.5 h-3.5" />
              <span>RETURN_TO_HUD</span>
            </button>
          </div>
        </DoubleBorderPanel>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col gap-4 z-20 overflow-hidden h-full">
        <header className="flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase text-[#00f2ff]">
              [{activeModule.replace('_', ' ')}]
            </h2>
            <div className="flex gap-4 text-[7px] uppercase tracking-widest opacity-40">
              <span>Context: HIGH_SECURITY_ZONE</span>
              <span>Auth: OPERATOR_LEVEL_{currentClearance}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[6px] opacity-40 uppercase">Global_Integrity</span>
                <span className="text-[10px] font-black text-[#00f2ff]">98.2%</span>
             </div>
             <div className="w-10 h-10 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex items-center justify-center">
                <Shield className="w-5 h-5 animate-pulse" />
             </div>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
              {activeModule === 'AI_ADVISOR' && <AIAdvisorModule />}
              {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
              {activeModule === 'INFRASTRUCTURE' && <InfrastructureModule />}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="h-6 shrink-0 bg-black/80 border border-[#00f2ff]/20 overflow-hidden flex items-center">
          <div className="bg-[#00f2ff]/10 px-4 h-full flex items-center border-r border-[#00f2ff]/20">
            <span className="text-[7px] font-black text-[#00f2ff] tracking-[0.3em] uppercase">PRIORITY_ALPHA</span>
          </div>
          <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-12 text-[7px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]"
            >
              <span>PROTOCOL_7B_ACTIVE... STATUS: SECURE</span>
              <span>NO_INTRUSIONS_DETECTED... SCANNING_SECTOR_9</span>
              <span>ALL_NODES_SYNCED... ENCRYPTION_LAYER_8_REINFORCED</span>
              <span>CLEARANCE_LVL_{currentClearance}_VERIFIED</span>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- MÓDULOS ---

function ClearanceLevelManager({ level, onLevelChange }: { level: number, onLevelChange: (l: number) => void }) {
  const operators = [
    { id: 'ADMIN', name: 'ADMIN_PRIME', level: 5, active: true },
    { id: 'OPERATOR_1', name: 'SEC_OP_ALFA', level: 3, active: true },
    { id: 'OPERATOR_2', name: 'RECON_GHOST', level: 2, active: false },
  ];

  const RingSegment = ({ index, active }: { index: number, active: boolean }) => {
    const angle = (index * 72) - 90;
    const radius = 45;
    return (
      <motion.path
        d={`M 50 50 L ${50 + radius * Math.cos((angle - 30) * Math.PI / 180)} ${50 + radius * Math.sin((angle - 30) * Math.PI / 180)} A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos((angle + 30) * Math.PI / 180)} ${50 + radius * Math.sin((angle + 30) * Math.PI / 180)} Z`}
        fill={active ? '#00f2ff' : 'rgba(0, 242, 255, 0.05)'}
        stroke={active ? '#00f2ff' : 'rgba(0, 242, 255, 0.2)'}
        strokeWidth="1"
        animate={{ opacity: active ? [0.6, 1, 0.6] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      <DoubleBorderPanel title="[ CLEARANCE_HIERARCHY ]" className="col-span-4 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <RingSegment key={i} index={i} active={i < level} />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-[#00f2ff] glitch-text leading-none">{level}</span>
            <span className="text-[6px] opacity-40 uppercase tracking-[0.2em] mt-2">Current_Rank</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
           <span className="text-[8px] font-bold text-[#00f2ff] uppercase tracking-[0.3em]">Elevate_Access</span>
           <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onLevelChange(i + 1)}
                  className={`w-8 py-2 border ${level === i + 1 ? 'border-[#00f2ff] bg-[#00f2ff]/20 text-white' : 'border-[#00f2ff]/20 bg-black text-[#00f2ff]/40'} text-[10px] font-black transition-all hover:bg-[#00f2ff]/10`}
                >
                  {i + 1}
                </button>
              ))}
           </div>
        </div>
      </DoubleBorderPanel>

      <DoubleBorderPanel title="[ OPERATOR_SELECTOR ]" className="col-span-8">
        <div className="flex-1 overflow-y-auto terminal-scroll p-2 space-y-2">
          {operators.map((op) => (
            <motion.div 
              key={op.id}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(0, 242, 255, 0.05)' }}
              className={`p-3 border ${op.active ? 'border-[#00f2ff]/20' : 'border-white/5'} flex items-center justify-between transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-none border ${op.active ? 'border-[#00f2ff]/40 bg-[#00f2ff]/10' : 'border-white/10 bg-white/5'} flex items-center justify-center`}>
                  <User className={`w-4 h-4 ${op.active ? 'text-[#00f2ff]' : 'text-white/20'}`} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black ${op.active ? 'text-white' : 'text-white/40'}`}>{op.name}</span>
                  <span className="text-[6px] opacity-40 uppercase">ID: {op.id}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[6px] opacity-40 uppercase">Assigned_Clearance</span>
                 <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-3 h-1 ${i < op.level ? 'bg-[#00f2ff]' : 'bg-white/10'}`} />
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 p-2 bg-[#00f2ff]/5 border border-[#00f2ff]/20 flex items-center gap-3">
           <ArrowUpCircle className="w-4 h-4 text-[#00f2ff] animate-bounce" />
           <span className="text-[7px] font-black uppercase text-[#00f2ff]/60 tracking-widest">
              Select_Operator_to_Modify_Access_Permissions
           </span>
        </div>
      </DoubleBorderPanel>
    </div>
  );
}

function SecurityManagementModule({ currentClearance, onLevelChange }: { currentClearance: number, onLevelChange: (l: number) => void }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <div className="flex-[3] min-h-0">
        <ClearanceLevelManager level={currentClearance} onLevelChange={onLevelChange} />
      </div>

      <div className="flex-[4] grid grid-cols-12 gap-4 min-h-0">
        <DoubleBorderPanel title="[ BIO_REGISTRATION ]" className="col-span-4 flex flex-col gap-4">
          <div className="relative w-full aspect-video bg-black/60 border border-[#00f2ff]/30 overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover grayscale brightness-125" autoPlay muted />
            {!hasCameraPermission && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <span className="text-[7px] text-[#00f2ff] font-black uppercase animate-pulse">Waiting_For_Camera_Auth...</span>
              </div>
            )}
            <div className="absolute inset-0 border border-[#00f2ff]/20 pointer-events-none" />
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-1 h-1 bg-[#00f2ff] rounded-full animate-ping" />
              <span className="text-[5px] text-[#00f2ff] font-bold">LIVE_FEED</span>
            </div>
          </div>
          <button className="w-full py-2 bg-[#00f2ff]/10 border border-[#00f2ff]/40 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.3em] tactic-clip hover:bg-[#00f2ff]/20 transition-all flex items-center justify-center gap-2">
            <Fingerprint className="w-3 h-3" />
            Capture_Bio_Scan
          </button>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ SECURITY_AUDIT_LOG ]" className="col-span-8 bg-black/60" isAccent>
          <div className="flex-1 overflow-y-auto terminal-scroll p-2 space-y-1">
            <div className="text-[7px] font-bold text-[#f43f5e] flex gap-3 p-1 bg-[#f43f5e]/5 border-l-2 border-[#f43f5e]">
              <span className="opacity-40 font-mono">[02:14:55]</span>
              <span className="font-black uppercase">CRITICAL_AUDIT:</span>
              <span className="opacity-80">OPERATOR ADMIN_PRIME INITIATED DATA_PURGE PROTOCOL</span>
            </div>
            <div className="text-[7px] font-bold text-amber-400 flex gap-3 p-1 bg-amber-400/5 border-l-2 border-amber-400">
              <span className="opacity-40 font-mono">[03:44:12]</span>
              <span className="font-black uppercase">AUTH_WARN:</span>
              <span className="opacity-80">FAILED LOGIN ATTEMPT FROM IP: 192.168.1.1</span>
            </div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="text-[7px] text-white/20 flex gap-3 px-1">
                <span className="opacity-20 font-mono">[{10+i}:00:00]</span>
                <span className="uppercase">INFO:</span>
                <span className="opacity-40">System_Integrity_Check // SECTOR_{i}_VERIFIED</span>
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

// --- OTROS MÓDULOS (PREVIAMENTE IMPLEMENTADOS) ---

function StrategicIntelligenceModule() {
  const [kernelHealth, setKernelHealth] = useState(85);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setKernelHealth(prev => {
        const next = prev + (Math.random() - 0.55) * 2;
        const clamped = Math.max(0, Math.min(100, next));
        setIsGlitching(clamped < 50);
        return clamped;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col h-full gap-4 min-h-0 overflow-hidden relative ${isGlitching ? 'animate-interference' : ''}`}>
      {isGlitching && (
        <div className="absolute inset-0 bg-[#ff0055]/5 z-50 pointer-events-none animate-pulse flex items-center justify-center">
           <div className="p-4 border-2 border-[#ff0055] bg-black/80 flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-[#ff0055] animate-bounce" />
              <span className="text-xl font-black text-[#ff0055] tracking-[0.5em] uppercase">Kernel_Panic // Stability_Low</span>
           </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4 flex-[3] min-h-0">
        <DoubleBorderPanel title="[ TACTICAL_GEO_INTEL ]" className="col-span-8 bg-[#000508]/60">
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
              <path d="M 50 350 L 750 350" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="5 5" />
              <motion.path 
                d="M 100 350 Q 400 50 700 350" 
                fill="none" 
                stroke="#ff0055" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <circle cx="100" cy="350" r="4" fill="#00f2ff" />
              <circle cx="700" cy="350" r="4" fill="#ff0055" className="animate-ping" />
            </svg>
            <div className="absolute top-4 right-4 bg-black/80 border border-[#ff0055]/40 p-3 flex flex-col gap-1 backdrop-blur-md">
              <span className="text-[6px] text-[#ff0055] font-black uppercase tracking-[0.3em]">Attacker_Coord</span>
              <span className="text-[10px] font-mono text-white tracking-tighter">LAT: 34.0522 N</span>
              <span className="text-[10px] font-mono text-white tracking-tighter">LON: 118.2437 W</span>
              <span className="text-[7px] text-[#00f2ff] font-bold mt-1">ISP: CLOUD_SHIELD_V4</span>
            </div>
          </div>
        </DoubleBorderPanel>

        <div className="col-span-4 flex flex-col gap-4">
          <DoubleBorderPanel title="[ KERNEL_INTEGRITY ]" className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#00f2ff]/10" />
                <motion.circle 
                  cx="64" cy="64" r="50" 
                  stroke="currentColor" strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray="314.159"
                  animate={{ strokeDashoffset: 314.159 - (314.159 * kernelHealth / 100) }}
                  className={`${kernelHealth < 50 ? 'text-[#ff0055]' : 'text-[#00f2ff]'}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black ${kernelHealth < 50 ? 'text-[#ff0055] animate-pulse' : 'text-[#00f2ff]'}`}>
                  {kernelHealth.toFixed(0)}%
                </span>
                <span className="text-[6px] opacity-40 uppercase tracking-[0.3em]">Stability</span>
              </div>
            </div>
          </DoubleBorderPanel>

          <DoubleBorderPanel title="[ OFFENSIVE_SYNC ]" className="flex-1">
            <div className="space-y-4 p-2">
              {[
                { id: 'deauth', label: 'DEAUTH_ATTACK', icon: ZapOff },
                { id: 'enc', label: 'ENC_OVERRIDE', icon: Key },
                { id: 'jam', label: 'SIGNAL_JAMMER', icon: Radio },
                { id: 'ghost', label: 'GHOST_PROTOCOL', icon: Ghost }
              ].map((btn) => (
                <div key={btn.id} className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="text-[7px] font-black text-[#00f2ff]/60">{btn.label}</span>
                  </div>
                  <div className="h-1 bg-black border border-[#00f2ff]/20 overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#00f2ff]" 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 10 + Math.random() * 20, repeat: Infinity }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DoubleBorderPanel>
        </div>
      </div>

      <DoubleBorderPanel title="[ DEEP_STORAGE_EXPLORER ]" className="flex-1 min-h-0 bg-black/60">
        <div className="flex-1 overflow-x-auto terminal-scroll flex gap-4 p-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, borderColor: '#00f2ff' }}
              className="w-40 h-full border border-[#00f2ff]/10 bg-[#00f2ff]/5 p-2 flex flex-col gap-2 shrink-0 group transition-all"
            >
              <div className="aspect-square bg-black border border-[#00f2ff]/20 relative overflow-hidden flex items-center justify-center">
                <FolderLock className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:text-[#00f2ff] transition-all" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-bold truncate">LOG_SESSION_0x{i}AF.MIL</span>
                <span className="text-[6px] opacity-40">SIZE: 142.4 KB</span>
              </div>
            </motion.div>
          ))}
        </div>
      </DoubleBorderPanel>
    </div>
  );
}

function CountermeasuresModule() {
  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
        <DoubleBorderPanel title="[ MALWARE_INJECTION ]">
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <button className="relative w-4/5 py-4 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/10 rounded-none flex items-center justify-center gap-4 hover:border-[#00f2ff] transition-all group">
              <Syringe className="w-5 h-5 text-[#00f2ff]" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Inject_Payload</span>
              <div className="absolute inset-0 bg-[#00f2ff]/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ ACCESS_DENIAL ]">
          <div className="flex items-center gap-6 h-full p-4">
            <div className="w-20 h-20 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/5 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,242,255,0.1)] shrink-0">
               <Lock className="w-8 h-8 text-[#00f2ff]" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
               <span className="text-[10px] font-black tracking-widest uppercase block mb-1">Gate_Lockdown</span>
               <div className="h-2 bg-[#00f2ff]/10 border border-[#00f2ff]/30 overflow-hidden">
                  <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="w-full h-full bg-[#00f2ff]/40" />
               </div>
            </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ HONEYPOT_CLUSTER ]">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/30 rounded-none border border-[#00f2ff]/10 min-h-0">
               <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
                  <circle cx="100" cy="50" r="15" fill="none" stroke="#00f2ff" strokeWidth="0.5" className="animate-pulse" />
                  <path d="M 100 50 L 130 30 M 100 50 L 70 70 M 100 50 L 140 80" stroke="#00f2ff" strokeWidth="0.2" strokeDasharray="2 2" />
               </svg>
            </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="SYSTEM_OVERRIDE" isAccent className="bg-[#f43f5e]/5">
           <div className="flex flex-col items-center justify-center gap-4 h-full">
             <button className="relative w-full py-5 border-2 border-[#f43f5e] bg-[#f43f5e]/15 rounded-none hover:scale-[1.01] transition-transform tactic-clip">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#f43f5e] uppercase animate-pulse">
                  !! EMERGENCY_TAKEOVER !!
                </span>
             </button>
           </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function ReconModule() {
  return (
    <div className="grid grid-cols-3 gap-4 h-full min-h-0 overflow-hidden">
      <DoubleBorderPanel title="GLOBAL_FOOTPRINT_SCAN" className="col-span-2 relative bg-black/20">
        <div className="w-full h-full flex items-center justify-center min-h-0 overflow-hidden">
          <svg viewBox="0 0 1000 600" className="w-full h-full opacity-60">
            <rect x="0" y="0" width="1000" height="600" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f2ff11" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
      </DoubleBorderPanel>
      <div className="flex flex-col gap-4 min-h-0">
        <DoubleBorderPanel title="DPI_STREAM" className="flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto terminal-scroll p-1 flex flex-col gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="text-[6px] font-mono whitespace-nowrap opacity-50 overflow-hidden flex gap-2">
                <span className="text-[#00f2ff]">[OK]</span>
                <span className="flex-1 truncate">{`NODE_0x${Math.random().toString(16).slice(2, 6).toUpperCase()} // DATA_VERIFIED`}</span>
              </div>
            ))}
          </div>
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
    <div className="flex flex-col gap-4 h-full min-h-0 overflow-hidden">
      <div className="flex gap-4 flex-1 min-h-0">
        <DoubleBorderPanel title="SANITIZATION_CORE" className="flex-1 flex flex-col items-center justify-center gap-6 relative overflow-hidden bg-black/40">
          <motion.div 
            animate={{ rotate: purging ? 360 : 0 }} 
            className={`w-32 h-32 border-4 border-dashed ${purging ? 'border-[#f43f5e]' : 'border-[#00f2ff]/20'} rounded-none flex items-center justify-center transition-all`}
          >
            <HardDrive className={`w-10 h-10 ${purging ? 'text-[#f43f5e]' : 'text-[#00f2ff]/20'}`} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-widest">{progress.toFixed(1)}%</h3>
            <span className="text-[7px] text-[#00f2ff]/40 uppercase">Purging_Encrypted_Sectors...</span>
          </div>
        </DoubleBorderPanel>
      </div>
      <button 
          onClick={() => { setPurging(!purging); if(!purging) setProgress(0); }}
          className={`w-full py-3 border-2 ${purging ? 'border-[#f43f5e] text-[#f43f5e]' : 'border-[#00f2ff] text-[#00f2ff]'} font-black uppercase tracking-[0.4em] tactic-clip text-[9px]`}
        >
          {purging ? 'TERMINATE_PURGE' : 'START_GLOBAL_WIPE'}
      </button>
    </div>
  );
}

function AIAdvisorModule() {
  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <DoubleBorderPanel title="STRATEGIC_AI_ADVISOR" className="flex-1 flex flex-col bg-black/20">
        <div className="flex-1 p-4 overflow-y-auto terminal-scroll space-y-4 min-h-0">
          <div className="p-3 bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[10px] leading-tight rounded-none border-l-4">
            [ADVISOR]: ANALYSIS COMPLETE. RECOMMEND IMMEDIATE REINFORCEMENT OF SECTOR 7. ANOMALY DETECTED IN KERNEL SYNC.
          </div>
          <div className="p-3 bg-[#f43f5e]/5 border border-[#f43f5e]/20 text-[10px] leading-tight rounded-none border-l-4">
            [ADVISOR]: DETECTED UNAUTHORIZED DATA EXFILTRATION ATTEMPT. INITIATING COUNTER-PROTOCOLS.
          </div>
        </div>
        <div className="p-3 border-t border-[#00f2ff]/10 flex gap-2 bg-black/40 shrink-0">
          <input type="text" placeholder="COMMAND_ADVISOR..." className="flex-1 bg-black/60 border border-[#00f2ff]/20 px-4 py-2 text-[9px] outline-none text-[#00f2ff] font-mono" />
          <button className="px-6 py-2 bg-[#00f2ff] text-[#010409] font-black text-[9px] uppercase tracking-widest shrink-0">SEND_QUERY</button>
        </div>
      </DoubleBorderPanel>
    </div>
  );
}

function SystemLogsModule() {
  return (
    <DoubleBorderPanel title="TACTICAL_AUDIT_LOGS" className="h-full min-h-0">
      <div className="flex-1 overflow-y-auto terminal-scroll p-4 font-mono text-[8px] leading-relaxed space-y-1">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="flex gap-4 group hover:bg-[#00f2ff]/5 transition-colors py-0.5 px-2">
            <span className="opacity-25 font-bold shrink-0">[{new Date().toISOString().slice(11, 19)}]</span>
            <span className="text-[#00f2ff] font-bold tracking-widest shrink-0">AUDIT_SEC:</span>
            <span className="opacity-70 truncate">{`Encryption layer ${Math.random().toString(36).slice(7).toUpperCase()} synchronized. Level: ${Math.floor(Math.random()*5)+1}`}</span>
          </div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}

function InfrastructureModule() {
  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-4 flex flex-col gap-4">
           <CoreTelemetryWidget />
           <DoubleBorderPanel title="[ SYSTEM_UPTIME ]" className="h-24 flex items-center justify-center">
              <div className="text-center">
                 <span className="text-xl font-black font-mono">142:55:12:09</span>
                 <p className="text-[6px] opacity-40 uppercase tracking-widest mt-1">Days : Hours : Mins : Secs</p>
              </div>
           </DoubleBorderPanel>
        </div>
        <div className="col-span-8">
           <EvidenceVaultWidget />
        </div>
      </div>
    </div>
  );
}

function CoreTelemetryWidget() {
  const [stats, setStats] = useState({ cpu: 45, thermal: 32, net: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(20 + Math.random() * 70),
        thermal: Math.floor(30 + Math.random() * 50),
        net: Math.floor(5 + Math.random() * 90),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getGaugeColor = (val: number) => {
    if (val >= 90) return '#f43f5e'; 
    if (val >= 70) return '#fbbf24'; 
    return '#00f2ff'; 
  };

  const Gauge = ({ label, value }: { label: string, value: number }) => {
    const color = getGaugeColor(value);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-[#00f2ff]/5" />
            <motion.circle 
              cx="40" cy="40" r={radius} 
              stroke={color} strokeWidth="2" 
              fill="transparent" 
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black" style={{ color }}>{value}%</span>
          </div>
        </div>
        <span className="text-[6px] font-black uppercase tracking-[0.2em] opacity-40">{label}</span>
      </div>
    );
  };

  return (
    <DoubleBorderPanel title="[ CORE_TELEMETRY ]" className="flex-1">
      <div className="flex justify-around items-center h-full py-4">
        <Gauge label="CPU_STRESS" value={stats.cpu} />
        <Gauge label="THERMAL_LOAD" value={stats.thermal} />
        <Gauge label="NET_SATURATION" value={stats.net} />
      </div>
      <div className="mt-auto pt-2 border-t border-[#00f2ff]/10 text-center">
        <span className="text-[6px] font-black uppercase text-[#00f2ff] tracking-[0.4em] animate-pulse">
           HARDWARE_ENCRYPTION_ACTIVE
        </span>
      </div>
    </DoubleBorderPanel>
  );
}

function EvidenceVaultWidget() {
  const files = [
    { name: "IMG_TRG_882.bin", size: "1.4 MB", date: "2024.03.12", encrypted: true },
    { name: "PKT_DUMP_01.log", size: "420 KB", date: "2024.03.11", encrypted: true },
    { name: "GEO_LOC_X9.dat", size: "12 KB", date: "2024.03.11", encrypted: false },
    { name: "VOICE_INT_04.wav", size: "8.2 MB", date: "2024.03.10", encrypted: true },
    { name: "BIO_SCAN_ALFA.bin", size: "2.1 MB", date: "2024.03.10", encrypted: true },
  ];

  return (
    <DoubleBorderPanel title="[ EVIDENCE_VAULT ]" className="h-full">
      <div className="flex-1 overflow-y-auto terminal-scroll p-2">
         <div className="grid grid-cols-1 gap-2">
            {files.map((file, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(0, 242, 255, 0.05)' }}
                className="group relative flex items-center gap-4 p-2 border border-[#00f2ff]/10 bg-black/40 transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex-none w-10 h-10 bg-black border border-[#00f2ff]/20 flex items-center justify-center relative overflow-hidden">
                   <FileText className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold text-[#00f2ff] truncate uppercase tracking-tighter">{file.name}</span>
                    <span className="text-[6px] opacity-40 font-mono">{file.date}</span>
                  </div>
                </div>
                {file.encrypted && (
                  <div className="flex-none">
                     <LockKeyhole className="w-3 h-3 text-[#00f2ff] animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
                  </div>
                )}
              </motion.div>
            ))}
         </div>
      </div>
    </DoubleBorderPanel>
  );
}
