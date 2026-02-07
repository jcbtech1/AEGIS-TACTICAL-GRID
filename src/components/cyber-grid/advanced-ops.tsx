
"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Implementa una interfaz de "Comandancia Militar" con navegación modular compacta y visuales inmersivos.
 * Optimizado para prevenir desbordamientos fuera de la pantalla.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Crosshair, Zap, Trash2, Brain, 
  Terminal, Globe, Lock, Cpu, ArrowLeft,
  ChevronRight, Activity, AlertCircle, Database,
  Settings, Wifi, Radio, Server, MessageSquare, List,
  Undo2, Syringe, Power, LayoutGrid, HardDrive, Eye,
  UserPlus, Users, Fingerprint, Camera, ShieldCheck,
  FileSearch, History, Search, Radar, FolderLock, 
  ZapOff, Ghost, Siren, Key, Thermometer, FileText, FileArchive,
  LockKeyhole
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import VisualScanModule from './visual-scan';
import { useToast } from "@/hooks/use-toast";

type ModuleType = 'STRATEGIC_INTELLIGENCE' | 'SECURITY_MANAGEMENT' | 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS' | 'INFRASTRUCTURE';

interface AdvancedOpsProps {
  onBack: () => void;
}

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

export default function AdvancedOpsScreen({ onBack }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('STRATEGIC_INTELLIGENCE');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      {/* MENÚ LATERAL TÁCTICO COMPACTO */}
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
        <header className="flex flex-col shrink-0">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-[#00f2ff]">
            [{activeModule.replace('_', ' ')}]
          </h2>
          <div className="flex gap-4 text-[7px] uppercase tracking-widest opacity-40">
            <span>Context: HIGH_SECURITY_ZONE</span>
            <span>Auth: OPERATOR_CERTIFIED_LEVEL_5</span>
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
              {activeModule === 'SECURITY_MANAGEMENT' && <SecurityManagementModule />}
              {activeModule === 'RECONNAISSANCE' && <ReconModule />}
              {activeModule === 'VISUAL_SCAN' && <VisualScanModule />}
              {activeModule === 'COUNTERMEASURES' && <CountermeasuresModule />}
              {activeModule === 'DATA_PURGE' && <DataPurgeModule />}
              {activeModule === 'AI_ADVISOR' && <AIAdvisorModule />}
              {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
              {activeModule === 'INFRASTRUCTURE' && <InfrastructureModule />}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* PRIORITY_ALPHA TICKER */}
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
              <span>HARDWARE_ENCRYPTION_ACTIVE... TEMP_NORMAL_0x3F</span>
              <span>KERNEL_LOAD_OK... AUDIT_LOG_INITIALIZED</span>
              <span>SIGNAL_STRENGTH_MAX... GLOBAL_RECON_GRID_ONLINE</span>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- MÓDULO INFRASTRUCTURE (CORE_TELEMETRY & EVIDENCE_VAULT) ---

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
    if (val >= 90) return '#f43f5e'; // Red
    if (val >= 70) return '#fbbf24'; // Amber
    return '#00f2ff'; // Cyan
  };

  const Gauge = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => {
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
            <Icon className="w-3 h-3 opacity-20" style={{ color }} />
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
        <Gauge label="CPU_STRESS" value={stats.cpu} icon={Cpu} />
        <Gauge label="THERMAL_LOAD" value={stats.thermal} icon={Thermometer} />
        <Gauge label="NET_SATURATION" value={stats.net} icon={Wifi} />
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
    { name: "SYS_DEBUG_09.txt", size: "45 KB", date: "2024.03.09", encrypted: false },
    { name: "MAL_PAYLOAD_X.so", size: "1.1 MB", date: "2024.03.08", encrypted: true },
    { name: "KEY_SPEC_ROT.bin", size: "4 KB", date: "2024.03.08", encrypted: true },
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
                   {/* Pixelated Preview on Hover */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <img 
                        src={`https://picsum.photos/seed/${file.name}/40/40?blur=10`} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale brightness-150"
                        style={{ imageRendering: 'pixelated' }}
                      />
                   </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold text-[#00f2ff] truncate uppercase tracking-tighter">{file.name}</span>
                    <span className="text-[6px] opacity-40 font-mono">{file.date}</span>
                  </div>
                  <div className="flex gap-3 text-[6px] opacity-40 uppercase tracking-widest mt-1">
                    <span>Size: {file.size}</span>
                    <span>Type: {file.name.split('.').pop()}_ENC</span>
                  </div>
                </div>

                {file.encrypted && (
                  <div className="flex-none">
                     <LockKeyhole className="w-3 h-3 text-[#00f2ff] animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
                  </div>
                )}

                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#00f2ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
         </div>
      </div>
      <div className="mt-2 p-2 bg-[#00f2ff]/5 border border-[#00f2ff]/20 flex justify-between items-center shrink-0">
         <span className="text-[7px] font-black text-[#00f2ff]/60">VAULT_INTEGRITY: 100% // ALL_FILES_VERIFIED</span>
         <button className="px-4 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/40 text-[7px] font-black uppercase hover:bg-[#00f2ff]/20 transition-all">Export_Report</button>
      </div>
    </DoubleBorderPanel>
  );
}

// --- MÓDULOS EXISTENTES (PARA REFERENCIA) ---

function StrategicIntelligenceModule() {
  const [kernelHealth, setKernelHealth] = useState(85);
  const [attackSync, setAttackSync] = useState({ deauth: 0, enc: 0, jam: 0, ghost: 0 });
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

  const startAttack = (key: keyof typeof attackSync) => {
    setAttackSync(prev => ({ ...prev, [key]: 1 }));
    const timer = setInterval(() => {
      setAttackSync(prev => {
        if (prev[key] >= 100) {
          clearInterval(timer);
          return { ...prev, [key]: 100 };
        }
        return { ...prev, [key]: prev[key] + 5 };
      });
    }, 100);
  };

  return (
    <div className={`flex flex-col h-full gap-4 min-h-0 overflow-hidden relative ${isGlitching ? 'animate-interference' : ''}`}>
      {isGlitching && (
        <div className="absolute inset-0 bg-[#ff0055]/5 z-50 pointer-events-none animate-pulse" />
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
              <motion.path 
                d="M 200 350 Q 400 150 600 350" 
                fill="none" 
                stroke="#00f2ff" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <circle cx="100" cy="350" r="4" fill="#00f2ff" />
              <circle cx="700" cy="350" r="4" fill="#ff0055" className="animate-ping" />
              <circle cx="200" cy="350" r="3" fill="#00f2ff" />
              <circle cx="600" cy="350" r="3" fill="#00f2ff" />
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
                    <span className="text-[7px] font-mono">{attackSync[btn.id as keyof typeof attackSync]}%</span>
                  </div>
                  <div className="h-1 bg-black border border-[#00f2ff]/20 overflow-hidden">
                    <motion.div 
                      animate={{ width: `${attackSync[btn.id as keyof typeof attackSync]}%` }}
                      className="h-full bg-[#00f2ff]" 
                    />
                  </div>
                  <button 
                    onClick={() => startAttack(btn.id as keyof typeof attackSync)}
                    disabled={attackSync[btn.id as keyof typeof attackSync] > 0}
                    className="w-full py-1 text-[6px] font-bold uppercase tracking-[0.2em] border border-[#00f2ff]/30 hover:bg-[#00f2ff]/10 disabled:opacity-20 transition-all"
                  >
                    Initiate
                  </button>
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

function SecurityManagementModule() {
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

  const operators = [
    { name: "ADMIN_PRIME", rank: "Level 5", lastConn: "02:14:55", token: "ACTIVE" },
    { name: "SEC_OPERATOR_09", rank: "Level 4", lastConn: "05:22:10", token: "ACTIVE" },
    { name: "VISION_CORE_X", rank: "Level 3", lastConn: "12:01:44", token: "EXPIRED" },
  ];

  const targets = [
    { name: "SUBJECT_0x8F", job: "Network Intruder", risk: "CRITICAL", appearances: 12, img: "https://picsum.photos/seed/target1/200/200" },
    { name: "ENT_GHOST_B", job: "Unknown Actor", risk: "HIGH", appearances: 3, img: "https://picsum.photos/seed/target2/200/200" },
  ];

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <DoubleBorderPanel title="[ OPERATOR_REGISTRY ]" className="col-span-8">
          <div className="flex-1 overflow-y-auto terminal-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#00f2ff]/20">
                  <th className="p-2 text-[7px] font-black uppercase opacity-40">Operator_ID</th>
                  <th className="p-2 text-[7px] font-black uppercase opacity-40">Clearance</th>
                  <th className="p-2 text-[7px] font-black uppercase opacity-40">Last_Access</th>
                  <th className="p-2 text-[7px] font-black uppercase opacity-40">Encryption_Token</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op, i) => (
                  <tr key={i} className="border-b border-[#00f2ff]/5 hover:bg-[#00f2ff]/5 transition-colors group">
                    <td className="p-2 text-[9px] font-bold group-hover:text-[#00f2ff]">{op.name}</td>
                    <td className="p-2 text-[9px] font-mono opacity-60">{op.rank}</td>
                    <td className="p-2 text-[9px] font-mono opacity-60">{op.lastConn}</td>
                    <td className="p-2">
                      <span className={`text-[7px] px-2 py-0.5 border ${op.token === 'ACTIVE' ? 'border-green-500/40 text-green-500 bg-green-500/5' : 'border-red-500/40 text-red-500 bg-red-500/5'}`}>
                        {op.token}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ BIO_REGISTRATION ]" className="col-span-4 flex flex-col gap-4">
          <div className="relative w-full aspect-video bg-black/60 border border-[#00f2ff]/30 overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover grayscale brightness-125" autoPlay muted />
            {!hasCameraPermission && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <span className="text-[7px] text-[#00f2ff] font-black uppercase animate-pulse">Waiting_For_Camera_Auth...</span>
              </div>
            )}
          </div>
          <button className="w-full py-2 bg-[#00f2ff]/10 border border-[#00f2ff]/40 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.3em] tactic-clip hover:bg-[#00f2ff]/20 transition-all flex items-center justify-center gap-2">
            <Fingerprint className="w-3 h-3" />
            Capture_Bio_Scan
          </button>
        </DoubleBorderPanel>
      </div>

      <div className="grid grid-cols-12 gap-4 h-2/5 min-h-0">
        <DoubleBorderPanel title="[ TARGET_PROFILES ]" className="col-span-8">
          <div className="flex-1 overflow-x-auto terminal-scroll flex gap-4 p-1">
            {targets.map((target, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="w-64 h-full border border-[#00f2ff]/20 bg-[#00f2ff]/5 p-3 flex flex-col gap-3 shrink-0 group relative overflow-hidden"
              >
                <div className="flex gap-4 relative z-10">
                  <div className="w-20 h-20 border border-[#00f2ff]/40 bg-black overflow-hidden relative">
                    <img src={target.img} alt={target.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[10px] font-black text-[#00f2ff] tracking-tight">{target.name}</span>
                    <span className="text-[6px] opacity-40 uppercase">{target.job}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ SECURITY_AUDIT_LOG ]" className="col-span-4 bg-black/60" isAccent>
          <div className="flex-1 overflow-y-auto terminal-scroll p-2 space-y-1">
            <div className="text-[6px] font-bold text-[#f43f5e] flex gap-2">
              <span className="opacity-40">[02:14:55]</span>
              <span className="font-black uppercase">AUDIT:</span>
              <span className="opacity-80">OPERATOR ADMIN_PRIME ACTIVATED PURGE_PROTOCOL</span>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-[6px] text-white/20 flex gap-2">
                <span className="opacity-20">[{Math.floor(Math.random()*24)}:00:00]</span>
                <span className="uppercase">INFO: System_Check_Pass // OK</span>
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function CountermeasuresModule() {
  return (
    <div className="flex flex-col h-full gap-4 min-h-0 overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
        <DoubleBorderPanel title="[ MALWARE_INJECTION ]">
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <button className="relative w-4/5 py-4 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/10 rounded-md flex items-center justify-center gap-4 hover:border-[#00f2ff] transition-all">
              <Syringe className="w-5 h-5 text-[#00f2ff]" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Inject_Payload</span>
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
            </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="[ HONEYPOT_CLUSTER ]">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/30 rounded-lg border border-[#00f2ff]/10 min-h-0">
               <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
                  <circle cx="100" cy="50" r="15" fill="none" stroke="#00f2ff" strokeWidth="0.5" className="animate-pulse" />
               </svg>
            </div>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel title="SYSTEM_OVERRIDE" isAccent className="bg-[#f43f5e]/5">
           <div className="flex flex-col items-center justify-center gap-4 h-full">
             <button className="relative w-full py-5 border-2 border-[#f43f5e] bg-[#f43f5e]/15 rounded-lg hover:scale-[1.01] transition-transform">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#f43f5e] uppercase">
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
            className={`w-32 h-32 border-4 border-dashed ${purging ? 'border-[#f43f5e]' : 'border-[#00f2ff]/20'} rounded-full flex items-center justify-center transition-all`}
          >
            <Database className={`w-10 h-10 ${purging ? 'text-[#f43f5e]' : 'text-[#00f2ff]/20'}`} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-widest">{progress.toFixed(1)}%</h3>
          </div>
        </DoubleBorderPanel>
      </div>
      <button 
          onClick={() => { setPurging(!purging); if(!purging) setProgress(0); }}
          className="w-full py-3 border-2 border-[#00f2ff] text-[#00f2ff] font-black uppercase tracking-[0.4em] tactic-clip text-[9px]"
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
          <div className="p-3 bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[10px] leading-tight rounded-r-lg border-l-4">
            ANALYSIS COMPLETE. RECOMMEND IMMEDIATE REINFORCEMENT OF SECTOR 7.
          </div>
        </div>
        <div className="p-3 border-t border-[#00f2ff]/10 flex gap-2 bg-black/40 shrink-0">
          <input type="text" placeholder="COMMAND_ADVISOR..." className="flex-1 bg-black/60 border border-[#00f2ff]/20 px-4 py-2 text-[9px] outline-none" />
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
            <span className="opacity-70 truncate">{`Encryption layer ${Math.random().toString(36).slice(7).toUpperCase()} synchronized.`}</span>
          </div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}
