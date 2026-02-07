"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Implementa una interfaz de "Comandancia Militar" con navegación modular y visuales inmersivos.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Crosshair, Zap, Trash2, Brain, 
  Terminal, Globe, Lock, Cpu, ArrowLeft,
  ChevronRight, Activity, AlertCircle, Database,
  Settings, Wifi, Radio, Server, MessageSquare, List,
  Undo2, Syringe, Power, LayoutGrid, HardDrive
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';

type ModuleType = 'RECONNAISSANCE' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AI_ADVISOR' | 'SYSTEM_LOGS';

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
  const [activeModule, setActiveModule] = useState<ModuleType>('COUNTERMEASURES');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const NavButton = ({ type, label }: { type: ModuleType, label: string }) => (
    <button
      onClick={() => setActiveModule(type)}
      className={`relative w-full flex items-center gap-3 px-4 py-3 text-[9px] font-bold tracking-[0.2em] uppercase transition-all overflow-hidden group scan-hover-item ${
        activeModule === type 
          ? 'text-white' 
          : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/80'
      }`}
    >
      <span className={activeModule === type ? 'text-[#00f2ff]' : 'text-transparent'}>[</span>
      <span className="flex-1 text-left">{label}</span>
      <span className={activeModule === type ? 'text-[#00f2ff]' : 'text-transparent'}>]</span>
      {activeModule === type && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 w-0.5 h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
        />
      )}
    </button>
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#020814] text-[#00f2ff] p-4 flex gap-6 font-mono relative">
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      {/* MENÚ LATERAL TÁCTICO */}
      <aside className="w-[18%] flex flex-col gap-4 z-20">
        <DoubleBorderPanel className="flex-none p-4">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-[#00f2ff] glitch-text">AEGIS:</h1>
            <span className="text-[6px] opacity-40 uppercase tracking-widest font-bold">Tactical_Grid_v2</span>
          </div>
        </DoubleBorderPanel>

        <DoubleBorderPanel className="flex-1 p-0 overflow-hidden flex flex-col">
          <nav className="flex-1 py-4 overflow-y-auto terminal-scroll">
            <NavButton type="RECONNAISSANCE" label="RECON_GRID" />
            <NavButton type="COUNTERMEASURES" label="COUNTERMEASURES" />
            <NavButton type="DATA_PURGE" label="DATA_PURGE" />
            <NavButton type="AI_ADVISOR" label="AI_ADVISOR" />
            <NavButton type="SYSTEM_LOGS" label="SYSTEM_LOGS" />
          </nav>

          <div className="mt-auto border-t border-[#00f2ff]/10 p-4">
            <button 
              onClick={onBack}
              className="w-full flex items-center justify-center gap-3 py-2 text-[8px] font-bold text-[#00f2ff] uppercase border border-[#00f2ff]/20 hover:bg-[#00f2ff]/10 transition-all group relative"
            >
              <Undo2 className="w-3 h-3" />
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
            <span>Context: SECURE_ENVIRONMENT / AD_Aegis_Tactical</span>
            <span>Fiction: Core_Protocol_Module_X9X</span>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
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

function CountermeasuresModule() {
  const [impact, setImpact] = useState(42);

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-8 flex-1">
        {/* PANEL 1: INJECT MALWARE */}
        <DoubleBorderPanel title="[ STATUS: READY ]" className="flex flex-col items-center justify-center gap-6 group hover:bg-[#00f2ff]/5 transition-all">
          <button className="relative w-2/3 py-4 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/10 rounded-md flex items-center justify-center gap-4 group-hover:border-[#00f2ff] transition-all">
            <Syringe className="w-6 h-6 text-[#00f2ff]" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">Inject_Malware</span>
          </button>
          
          <div className="w-full px-12 flex justify-between items-center">
            <div className="relative w-12 h-12 border-2 border-[#00f2ff]/20 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-t-[#00f2ff] rounded-full animate-spin" />
              <Syringe className="w-4 h-4 opacity-40" />
            </div>
            
            <div className="h-12 w-20 bg-[#00f2ff]/20 relative">
               <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '60%' }}
                className="absolute bottom-0 w-full bg-[#00f2ff]/60" 
              />
            </div>

            <div className="text-center">
              <span className="text-xl font-black block">100%</span>
              <span className="text-[6px] opacity-40 uppercase">Load_Buffer</span>
            </div>
          </div>
        </DoubleBorderPanel>

        {/* PANEL 2: DENY REMOTE ACCESS */}
        <DoubleBorderPanel title="[ STATUS: READY ]" className="flex items-center gap-8 p-8 group hover:bg-[#00f2ff]/5 transition-all">
          <div className="w-20 h-20 border-2 border-[#00f2ff]/40 bg-[#00f2ff]/5 flex items-center justify-center relative">
             <Lock className="w-8 h-8 text-[#00f2ff]" />
             <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00f2ff]" />
             <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00f2ff]" />
          </div>

          <div className="flex-1 flex flex-col gap-4">
             <div className="text-center">
                <span className="text-[10px] font-black tracking-widest uppercase block mb-1">Deny_Remote_Access</span>
                <span className="text-[6px] opacity-40 uppercase block">[ PROTOCOL: ACTIVE ]</span>
             </div>
             
             <div className="flex justify-center">
                <div className="w-16 h-8 border border-[#00f2ff]/40 bg-black flex items-center px-1 group-hover:border-[#00f2ff]">
                   <div className="w-6 h-6 bg-[#00f2ff]/20 border border-[#00f2ff]/60 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#00f2ff]" />
                   </div>
                   <div className="flex-1 flex flex-col gap-0.5 ml-2 opacity-30">
                      <div className="h-0.5 w-full bg-[#00f2ff]" />
                      <div className="h-0.5 w-2/3 bg-[#00f2ff]" />
                      <div className="h-0.5 w-full bg-[#00f2ff]" />
                   </div>
                </div>
             </div>
          </div>
        </DoubleBorderPanel>

        {/* PANEL 3: ACTIVATE HONEYPOT */}
        <DoubleBorderPanel title="[ ACTIVATE_HONEYPOT ]" className="flex flex-col p-6 group hover:bg-[#00f2ff]/5 transition-all">
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
             {/* Simulación de Red de Nodos */}
             <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
                <circle cx="100" cy="50" r="15" fill="none" stroke="#00f2ff" strokeWidth="0.5" />
                <rect x="90" y="40" width="20" height="20" fill="#00f2ff/20" />
                <path d="M50 20 L100 50 M150 20 L100 50 M50 80 L100 50 M150 80 L100 50" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="2 2" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <circle key={i} cx={50 + (i % 2 === 0 ? 0 : 100)} cy={20 + (i < 2 ? 0 : 60)} r="3" fill="#00f2ff" />
                ))}
             </svg>
             <div className="absolute bottom-2 right-2 flex gap-2">
                <div className="w-8 h-8 border border-[#00f2ff]/30 flex items-center justify-center bg-black/40">
                   <div className="grid grid-cols-2 gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-1 h-1 bg-[#00f2ff]" />)}
                   </div>
                </div>
                <div className="w-12 h-8 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex items-center justify-center">
                   <div className="w-8 h-4 flex flex-col gap-0.5">
                      <div className="h-0.5 w-full bg-[#00f2ff]/60" />
                      <div className="h-0.5 w-full bg-[#00f2ff]/30" />
                   </div>
                </div>
             </div>
          </div>
          <div className="text-center mt-4">
             <span className="text-[7px] font-bold uppercase tracking-[0.3em] opacity-60">[ INTRUDERS LOGGED: 0 ]</span>
          </div>
        </DoubleBorderPanel>

        {/* PANEL 4: SYSTEM OVERRIDE */}
        <DoubleBorderPanel title="SYSTEM_OVERRIDE" isAccent className="flex flex-col items-center justify-center p-6 bg-[#f43f5e]/5 group hover:bg-[#f43f5e]/10 transition-all">
           <button className="relative w-full py-6 border-2 border-[#f43f5e] bg-[#f43f5e]/20 rounded-lg group-hover:scale-[1.02] transition-transform overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
              <span className="text-[10px] font-black tracking-[0.3em] text-[#f43f5e] uppercase">
                !! CRITICAL: FULL SYSTEM TAKEOVER !!
              </span>
           </button>
           <div className="mt-6 flex gap-8 w-full justify-center opacity-40">
              <span className="text-[7px] font-bold uppercase tracking-[0.2em]">[ INTRUDERS LOGGED: 0 ]</span>
           </div>
        </DoubleBorderPanel>
      </div>

      {/* BARRA DE IMPACTO INFERIOR */}
      <div className="flex flex-col gap-3">
         <div className="flex justify-center">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#00f2ff]">
              [ COUNTERMEASURE IMPACT: {impact}% ]
            </span>
         </div>
         <div className="h-4 w-full bg-black border border-[#00f2ff]/20 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${impact}%` }}
              className="h-full bg-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.5)] flex items-center justify-end px-2"
            >
               <span className="text-[6px] font-bold text-black">{impact}%</span>
            </motion.div>
         </div>
         <div className="flex justify-between items-start">
            <p className="max-w-2xl text-[7px] opacity-40 uppercase tracking-widest leading-relaxed">
              Tramsecian onelagetisondes brsemler filadian nlt adruells, aade nal natio inle com cemenda lo instnacion layes emce imicemande.
            </p>
            <button className="px-8 py-3 bg-[#00f2ff] text-black text-[9px] font-black uppercase tracking-[0.2em] tactic-clip hover:opacity-80 transition-opacity">
              COMATION
            </button>
         </div>
      </div>
    </div>
  );
}

function ReconModule() {
  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      <DoubleBorderPanel title="GLOBAL_RECON_FOOTPRINT" className="col-span-2 relative">
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
        </div>
      </DoubleBorderPanel>
      <div className="flex flex-col gap-6">
        <DoubleBorderPanel title="TRAFFIC_STREAM" className="flex-1">
          <div className="p-2 overflow-hidden flex flex-col gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="text-[6px] font-mono whitespace-nowrap opacity-50 overflow-hidden">
                <span className="text-[#00f2ff] mr-2">{`>>`}</span>
                {`PKT_DATA_0x${Math.random().toString(16).slice(2, 10).toUpperCase()} [INBOUND_VERIFIED]`}
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="SIGNAL_METRICS" className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 15 }, (_, i) => ({ val: 20 + Math.random() * 80 }))}>
              <Area type="step" dataKey="val" stroke="#00f2ff" fill="#00f2ff" fillOpacity={0.1} />
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
        setProgress(p => (p < 100 ? p + 0.5 : 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [purging]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex gap-6 h-2/3">
        <DoubleBorderPanel title="PURGE_ENGINE" className="flex-1 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
          <motion.div 
            animate={{ rotate: purging ? 360 : 0 }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className={`w-40 h-40 border-8 border-dashed ${purging ? 'border-[#f43f5e]' : 'border-[#00f2ff]/20'} rounded-full flex items-center justify-center`}
          >
            <Database className={`w-12 h-12 ${purging ? 'text-[#f43f5e]' : 'text-[#00f2ff]/20'}`} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-widest">{progress.toFixed(1)}%</h3>
            <p className="text-[8px] opacity-40 uppercase mt-1">Sectors_Sanitized</p>
          </div>
          {purging && <div className="absolute inset-0 bg-[#f43f5e]/5 animate-pulse pointer-events-none" />}
        </DoubleBorderPanel>
        
        <DoubleBorderPanel title="SHREDDER_QUEUE" className="w-1/3">
          <div className="p-2 space-y-1 overflow-hidden h-full">
            {purging && Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="text-[6px] font-mono text-[#f43f5e] opacity-60">
                [DELETE] {Math.random().toString(36).substring(7)}.mil_spec
              </div>
            ))}
          </div>
        </DoubleBorderPanel>
      </div>
      
      <DoubleBorderPanel title="CONTROL_CONSOLE" className="flex-1 flex items-center justify-between px-12">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] opacity-30 uppercase">Est_Time</span>
          <span className="text-xl font-bold">00:0{Math.floor((100 - progress)/20)}:{(100 - progress).toFixed(0)}</span>
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
    <div className="grid grid-cols-4 gap-6 h-full">
      <DoubleBorderPanel title="STRATEGIC_ADVISOR" className="col-span-3 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto terminal-scroll space-y-4">
          <div className="flex flex-col gap-1 max-w-[80%]">
            <span className="text-[6px] text-[#00f2ff] font-bold uppercase">Aegis_Advisor // Gemini_2.5</span>
            <div className="p-4 bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[10px] leading-relaxed">
              OPERADOR, HE ANALIZADO EL ESTADO ACTUAL DE LA RED. EL NIVEL DE AMENAZA SIGMA SE MANTIENE ESTABLE, PERO HE DETECTADO ANOMALÍAS EN EL SECTOR SUDOESTE. RECOMIENDO INICIAR RECONOCIMIENTO PROFUNDO.
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[#00f2ff]/10 flex gap-2">
          <input type="text" placeholder="CONSULTAR_AL_ASESOR..." className="flex-1 bg-black/40 border border-[#00f2ff]/20 px-4 py-2 text-[10px] outline-none focus:border-[#00f2ff]" />
          <button className="px-6 py-2 bg-[#00f2ff] text-[#010409] font-bold text-[10px] uppercase">ENVIAR</button>
        </div>
      </DoubleBorderPanel>
      
      <div className="flex flex-col gap-6">
        <DoubleBorderPanel title="THREAT_LEVEL" className="flex-1">
          <div className="mt-4 text-center">
            <span className="text-2xl font-black text-[#f43f5e] animate-pulse">MODERATE</span>
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
      <div className="flex-1 overflow-y-auto terminal-scroll p-4 font-mono text-[9px] leading-tight space-y-1">
        {Array.from({ length: 60 }).map((_, i) => (
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
