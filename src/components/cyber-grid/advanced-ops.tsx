"use client";

/**
 * @fileOverview AdvancedOpsScreen - El corazón del sistema Aegis para operaciones de alto nivel.
 * 
 * Implementa una interfaz de "Comandancia Militar" con navegación modular y visuales inmersivos.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Crosshair, Zap, Trash2, Brain, 
  Terminal, Globe, Lock, Cpu, ArrowLeft,
  ChevronRight, Activity, AlertCircle, Database,
  Settings, Wifi, Radio, Server, MessageSquare, List
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';

type ModuleType = 'RECONNAISSANCE' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS';

interface AdvancedOpsProps {
  onBack: () => void;
}

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative ${isAccent ? 'double-border-accent' : 'double-border'} bg-black/40 backdrop-blur-md p-3 flex flex-col ${className}`}>
    {title && (
      <div className="absolute -top-3 left-4 px-2 bg-black text-[8px] font-bold tracking-widest text-[#00f2ff] border border-[#00f2ff]/30">
        {title}
      </div>
    )}
    {children}
  </div>
);

export default function AdvancedOpsScreen({ onBack }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('RECONNAISSANCE');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const NavButton = ({ type, icon: Icon, label }: { type: ModuleType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveModule(type)}
      className={`relative w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all overflow-hidden group scan-hover-item ${
        activeModule === type 
          ? 'bg-[#00f2ff]/20 text-white border-r-2 border-[#00f2ff]' 
          : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/80 hover:bg-[#00f2ff]/5'
      }`}
    >
      <Icon className={`w-4 h-4 ${activeModule === type ? 'animate-pulse' : ''}`} />
      <span>{label}</span>
      {activeModule === type && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 w-1 h-full bg-[#00f2ff]"
        />
      )}
    </button>
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#010409] text-[#00f2ff] p-4 flex gap-4 font-mono animate-interference relative">
      <div className="scanline-effect opacity-20 pointer-events-none" />
      <div className="vignette" />

      {/* MENÚ LATERAL TÁCTICO (18%) */}
      <aside className="w-[18%] flex flex-col gap-4 z-20">
        <DoubleBorderPanel className="flex-none p-4">
          <div className="flex flex-col items-center gap-2">
            <Cpu className="w-8 h-8 text-[#00f2ff] animate-pulse" />
            <h1 className="text-sm font-black tracking-[0.3em] uppercase glitch-text">Aegis Command</h1>
            <span className="text-[6px] opacity-40 uppercase tracking-widest">Master Control Terminal</span>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel className="flex-1 p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 border-b border-[#00f2ff]/10 text-[7px] opacity-30 uppercase tracking-widest">Navigation_Interface</div>
            <div className="flex-1 py-2">
              <NavButton type="RECONNAISSANCE" icon={Globe} label="[ Reconnaissance ]" />
              <NavButton type="COUNTERMEASURES" icon={Crosshair} label="[ Countermeasures ]" />
              <NavButton type="DATA_PURGE" icon={Trash2} label="[ Data Purge ]" />
              <NavButton type="AI_ADVISOR" icon={Brain} label="[ AI Advisor ]" />
              <NavButton type="SYSTEM_LOGS" icon={List} label="[ System Logs ]" />
            </div>
            <button 
              onClick={onBack}
              className="mt-auto flex items-center gap-2 px-4 py-4 text-[9px] font-bold text-[#f43f5e] uppercase border-t border-[#f43f5e]/20 hover:bg-[#f43f5e]/10 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>[ Return_to_HUD ]</span>
            </button>
          </div>
        </DoubleBorderPanel>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL (82%) */}
      <main className="flex-1 flex flex-col gap-4 z-20 overflow-hidden">
        <header className="flex justify-between items-center px-2">
          <div className="flex items-center gap-4">
            <div className="h-4 w-1 bg-amber-500 animate-pulse" />
            <h2 className="text-xl font-black tracking-tighter uppercase">{activeModule} // CORE_ACCESS</h2>
          </div>
          <div className="flex gap-4 text-[7px] uppercase tracking-widest opacity-40">
            <span>Uptime: 48:12:09</span>
            <span>Auth: OPR_LEVEL_05</span>
            <span>Sector: GRID_SIGMA_7</span>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col gap-4"
            >
              {activeModule === 'RECONNAISSANCE' && <ReconModule />}
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

function ReconModule() {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <DoubleBorderPanel title="GLOBAL_DIGITAL_FOOTPRINT" className="col-span-2 relative">
        <div className="w-full h-full flex items-center justify-center bg-[#000d1a]/20">
          <svg viewBox="0 0 1000 600" className="w-full h-full opacity-60">
            <path d="M100 300 Q250 100 400 300 T700 300 T900 100" fill="none" stroke="#00f2ff" strokeWidth="0.5" className="animate-pulse" />
            <circle cx="200" cy="200" r="2" fill="#00f2ff" />
            <circle cx="500" cy="350" r="3" fill="#f43f5e" className="animate-ping" />
            <circle cx="750" cy="150" r="2" fill="#00f2ff" />
            <rect x="0" y="0" width="1000" height="600" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f2ff11" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
          <div className="absolute top-8 left-8 p-3 border-l border-[#00f2ff]/30 bg-black/40">
            <span className="text-[10px] font-bold block mb-2">TARGET_VECTORS</span>
            <div className="space-y-1">
              {['SNG_NODE_01', 'FRA_GATE_09', 'TOK_CORE_A'].map(id => (
                <div key={id} className="flex justify-between items-center w-40">
                  <span className="text-[7px] opacity-40">{id}</span>
                  <span className="text-[7px] text-green-500">LIVE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DoubleBorderPanel>
      <div className="flex flex-col gap-4">
        <DoubleBorderPanel title="TRAFFIC_STREAM" className="flex-1">
          <div className="p-2 overflow-hidden flex flex-col gap-1">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="text-[6px] font-mono whitespace-nowrap opacity-50 overflow-hidden">
                <span className="text-[#00f2ff] mr-2">{`>>`}</span>
                {`PKT_DATA_0x${Math.random().toString(16).slice(2, 10).toUpperCase()} [INBOUND_VERIFIED]`}
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="SIGNAL_STRENGTH" className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 10 }, (_, i) => ({ val: 20 + Math.random() * 80 }))}>
              <Area type="step" dataKey="val" stroke="#00f2ff" fill="#00f2ff" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function CountermeasuresModule() {
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>({});

  const toggleAction = (id: string) => {
    setActiveActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ActionButton = ({ id, label, icon: Icon, isDanger = false }: { id: string, label: string, icon: any, isDanger?: boolean }) => (
    <button 
      onClick={() => toggleAction(id)}
      className={`p-4 border flex flex-col gap-4 transition-all relative overflow-hidden group ${
        activeActions[id] 
          ? isDanger ? 'border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e]' : 'border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff]' 
          : 'border-white/10 hover:border-white/30 text-white/40'
      }`}
    >
      <div className="flex justify-between items-center">
        <Icon className="w-6 h-6" />
        <span className="text-[8px] font-bold tracking-widest">{activeActions[id] ? 'STATUS: ACTIVE' : 'STATUS: READY'}</span>
      </div>
      <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
      {activeActions[id] && (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className={`absolute bottom-0 left-0 h-0.5 ${isDanger ? 'bg-[#f43f5e]' : 'bg-[#00f2ff]'}`} />
      )}
    </button>
  );

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="flex flex-col gap-4">
        <DoubleBorderPanel title="OFFENSIVE_COMMANDS" className="flex-1 grid grid-cols-2 gap-3 p-4">
          <ActionButton id="malware" label="Inject Malware" icon={Zap} isDanger />
          <ActionButton id="denial" label="Deny Remote Access" icon={Lock} />
          <ActionButton id="honeypot" label="Activate Honeypot" icon={Shield} />
          <ActionButton id="backdoor" label="Secure Backdoor" icon={Server} />
        </DoubleBorderPanel>
        <DoubleBorderPanel title="IMPACT_METRICS" className="h-48">
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="text-4xl font-black text-[#00f2ff]">84.2%</span>
            <span className="text-[8px] opacity-40 uppercase tracking-widest mt-2">Countermeasure_Efficiency_Index</span>
          </div>
        </DoubleBorderPanel>
      </div>
      <DoubleBorderPanel title="LIVE_DETERRENCE_STATUS" className="bg-black/80">
        <div className="p-4 space-y-4">
          {Object.entries(activeActions).filter(([_, v]) => v).map(([k]) => (
            <div key={k} className="p-3 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex justify-between items-center animate-pulse">
              <span className="text-[9px] font-bold uppercase">{k}_PROTOCOL_RUNNING</span>
              <AlertCircle className="w-3 h-3" />
            </div>
          ))}
          {Object.values(activeActions).every(v => !v) && (
            <div className="h-full flex items-center justify-center text-[9px] opacity-20 uppercase tracking-widest">
              Awaiting_Command_Initiation
            </div>
          )}
        </div>
      </DoubleBorderPanel>
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
        setProgress(p => (p < 100 ? p + 0.5 : 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [purging]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 h-2/3">
        <DoubleBorderPanel title="PURGE_ENGINE" className="flex-1 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
          <motion.div 
            animate={{ rotate: purging ? 360 : 0 }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className={`w-40 h-40 border-8 border-dashed ${purging ? 'border-[#f43f5e]' : 'border-[#00f2ff]/20'} rounded-full flex items-center justify-center`}
          >
            <Database className={`w-12 h-12 ${purging ? 'text-[#f43f5e]' : 'text-[#00f2ff]/20'}`} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-2xl font-black tracking-widest">{progress.toFixed(1)}%</h3>
            <p className="text-[8px] opacity-40 uppercase mt-1">Sectors_Sanitized</p>
          </div>
          {purging && <div className="absolute inset-0 bg-[#f43f5e]/5 animate-pulse pointer-events-none" />}
        </DoubleBorderPanel>
        
        <DoubleBorderPanel title="FILES_BEING_SHREDDED" className="w-1/3">
          <div className="p-2 space-y-1 overflow-hidden h-full">
            {purging && Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="text-[6px] font-mono text-[#f43f5e] opacity-60">
                [DELETE] {Math.random().toString(36).substring(7)}.mil_spec
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
      </div>
      
      <DoubleBorderPanel title="PURGE_CONTROL_CENTER" className="flex-1 flex items-center justify-between px-12">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] opacity-30 uppercase">Estimated_Time_Remaining</span>
          <span className="text-lg font-bold">00:0{Math.floor((100 - progress)/20)}:{(100 - progress).toFixed(0)}</span>
        </div>
        <button 
          onClick={() => { setPurging(!purging); setProgress(0); }}
          className={`px-12 py-4 border-2 font-black uppercase tracking-[0.3em] transition-all ${
            purging ? 'border-[#f43f5e] text-[#f43f5e] bg-[#f43f5e]/10 animate-pulse' : 'border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/10'
          }`}
        >
          {purging ? 'ABORT_PURGE' : 'INITIATE_CLEAN_SWEEP'}
        </button>
      </DoubleBorderPanel>
    </div>
  );
}

function AIAdvisorModule() {
  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <DoubleBorderPanel title="STRATEGIC_ADVISOR" className="col-span-3 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto terminal-scroll space-y-4">
          <div className="flex flex-col gap-1 max-w-[80%]">
            <span className="text-[6px] text-[#00f2ff] font-bold uppercase">Aegis_Advisor // Gemini_2.5</span>
            <div className="p-3 bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[10px] leading-relaxed">
              OPERADOR, HE ANALIZADO EL ESTADO ACTUAL DE LA RED. EL NIVEL DE AMENAZA SIGMA SE MANTIENE ESTABLE, PERO HE DETECTADO ANOMALÍAS EN EL SECTOR SUDOESTE. RECOMIENDO INICIAR RECONOCIMIENTO PROFUNDO.
            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-[80%] self-end">
            <span className="text-[6px] text-white/40 font-bold uppercase text-right">Operator</span>
            <div className="p-3 bg-white/5 border border-white/20 text-[10px] leading-relaxed text-right">
              CONFIRMADO. PREPARA EL PROTOCOLO DE CONTRAMEDIDAS NIVEL 4.
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[#00f2ff]/10 flex gap-2">
          <input type="text" placeholder="CONSULTAR_AL_ASESOR..." className="flex-1 bg-black/40 border border-[#00f2ff]/20 px-4 py-2 text-[10px] outline-none focus:border-[#00f2ff]" />
          <button className="px-6 py-2 bg-[#00f2ff] text-[#010409] font-bold text-[10px] uppercase">ENVIAR</button>
        </div>
      </DoubleBorderPanel>
      
      <div className="flex flex-col gap-4">
        <DoubleBorderPanel title="THREAT_LEVEL_ESTIMATE" className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ x: 'A', y: 40 }, { x: 'B', y: 80 }, { x: 'C', y: 60 }]}>
              <Bar dataKey="y" fill="#00f2ff" fillOpacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-[#f43f5e] animate-pulse">MODERATE_RISK</span>
          </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="CORE_LOAD" className="h-32 flex flex-col justify-center items-center">
          <span className="text-2xl font-black">2.4%</span>
          <span className="text-[8px] opacity-30 uppercase">Cognitive_Usage</span>
        </DoubleBorderPanel>
      </div>
    </div>
  );
}

function SystemLogsModule() {
  return (
    <DoubleBorderPanel title="ENCRYPTION_ENGINE_LOGS" className="h-full">
      <div className="flex gap-4 p-2 mb-2 border-b border-[#00f2ff]/10">
        <button className="px-4 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[8px] font-bold uppercase">All_Events</button>
        <button className="px-4 py-1 border border-white/10 text-[8px] font-bold uppercase opacity-40">Security</button>
        <button className="px-4 py-1 border border-white/10 text-[8px] font-bold uppercase opacity-40">Network</button>
      </div>
      <div className="flex-1 overflow-y-auto terminal-scroll p-4 font-mono text-[9px] leading-tight space-y-1">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="flex gap-4 group hover:bg-[#00f2ff]/5 transition-colors">
            <span className="opacity-20">[{new Date().toISOString().slice(11, 19)}]</span>
            <span className="text-[#00f2ff] font-bold">AEGIS_SEC:</span>
            <span className="opacity-60">{`Kernel rotation for document_${Math.random().toString(36).slice(7)} initiated... SUCCESS.`}</span>
          </div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}