"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, Zap, Lock, AlertTriangle, 
  Terminal as TerminalIcon, Cpu, Smartphone, 
  Eye, Server, Globe, Radio, Wifi, Database,
  ArrowRight, RefreshCw, Power
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Datos de tráfico simulados para el gráfico de ondas
const trafficData = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  pps: 400 + Math.sin(i * 0.5) * 200 + Math.random() * 100,
}));

// Datos para el gráfico de frecuencia del núcleo
const frequencyData = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  val: 20 + Math.random() * 60,
}));

const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AegisUltimateDashboard() {
  const [time, setTime] = useState(new Date());
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "INIT22Z8NG SYSA.",
    "[17:43:00] ENCRYPTED NODE: ALPHA_888 CONNECTED TO ALGO_AUTH SERVER (GEO: EU-EAST)",
    "[17:43:05] SYSTEM: NETWORK INTEGRITY VERIFIED - 0 SEGMENTS CORRUPT",
    "[17:43:09] LISTENING PORT:8087_CNBI PROCESS_ID: 104 ATTRIBUTES:RWX",
    "[17:43:12] > RZ FLUX: SI ACTIVE SCAN_MODE: 200X"
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const logInterval = setInterval(() => {
      const logs = [
        `[${new Date().toLocaleTimeString()}] INTRUSION PACKET DEFLECTED: NODE_${Math.random().toString(36).substr(2, 4)}`,
        `[${new Date().toLocaleTimeString()}] AUTH_TOKEN ROTATED: SHA-512_SECURE`,
        `[${new Date().toLocaleTimeString()}] LATENCY SPIKE DETECTED IN SECTOR_G4`,
        `[${new Date().toLocaleTimeString()}] GLOBAL_SYNC: 14,092 NODES VALIDATED`
      ];
      setTerminalLines(prev => [...prev.slice(-8), logs[Math.floor(Math.random() * logs.length)]]);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#020617] flex flex-col p-4 overflow-hidden select-none text-primary/90">
      <div className="dot-matrix" />
      <div className="scanlines" />
      
      {/* HEADER TÉCNICO SUPERIOR */}
      <header className="h-12 flex justify-between items-center px-4 mb-4 border border-white/10 ultra-glass shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-xs font-bold tracking-[0.4em] text-primary uppercase neon-primary">
              GLOBAL SYSTEME GRID
            </h1>
            <span className="text-[8px] opacity-60 tracking-[0.2em]">STATION: H1_SECURE_01</span>
          </div>
          
          <div className="flex items-center gap-3 bg-primary/5 px-3 py-1 border border-primary/20 rounded-sm">
            <Shield className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase">VPN: ACTIVE</span>
          </div>
        </div>

        <div className="flex gap-12 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Global Threat</span>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-accent/10 border border-accent/40 rounded-full">
              <span className="text-[9px] font-bold tracking-widest text-accent uppercase animate-pulse">Critical_Level_4</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end min-w-[120px]">
            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Time_UTC</span>
            <span className="text-sm font-mono text-primary neon-primary tabular-nums">
              {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>
      </header>

      {/* REJILLA PRINCIPAL DE OPERACIONES */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* COLUMNA IZQUIERDA - MONITORES Y FRECUENCIA */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[4] ultra-glass p-4 flex flex-col tech-frame"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <Eye className="w-3 h-3 text-primary" /> Visual_Monitor
              </h3>
              <span className="text-[8px] opacity-40 font-mono">CAM_008.0D3</span>
            </div>
            
            <div className="flex-1 relative bg-black/40 border border-white/5 rounded-sm overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/aegis-security/600/600" 
                alt="Security Feed" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 opacity-60"
                data-ai-hint="security area"
              />
              <div className="absolute inset-0 scanning-line" />
              
              {/* Overlay de Reconocimiento */}
              <div className="absolute top-4 right-4 bg-accent/20 border border-accent/40 px-2 py-1 backdrop-blur-sm">
                <span className="text-[8px] font-bold text-accent tracking-tighter uppercase">UDR_RECOGNITION: 89%</span>
              </div>

              {/* Retículo de enfoque */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/20">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[3] ultra-glass p-4 flex flex-col tech-frame"
          >
            <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
              <Smartphone className="w-3 h-3 text-primary" /> Active_Devices
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 terminal-scroll pr-1">
              {[
                { id: 'WS-01', status: 'Secure', color: 'text-primary' },
                { id: 'MOB-03', status: 'Secure', color: 'text-primary' },
                { id: 'GAT-02', status: 'Review', color: 'text-accent' },
              ].map((dev) => (
                <div key={dev.id} className="flex items-center justify-between p-2 border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <Database className={`w-3 h-3 ${dev.color}`} />
                    <span className="text-[10px] font-bold font-mono tracking-wider">{dev.id}</span>
                  </div>
                  <button className={`text-[8px] font-bold uppercase px-3 py-1 border border-current rounded-full ${dev.color} bg-current/5 group-hover:bg-current/10`}>
                    Scanner
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[3] ultra-glass p-4 flex flex-col tech-frame"
          >
            <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
              <Activity className="w-3 h-3 text-primary" /> Frequency del Núcleo
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyData}>
                  <Bar dataKey="val">
                    {frequencyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 4 === 0 ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} 
                        fillOpacity={0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[8px] opacity-40 uppercase tracking-widest">T09/CPU_ANALYSIS</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-0.5 bg-primary/20" />)}
              </div>
            </div>
          </motion.section>
        </div>

        {/* CENTRO - MAPA Y TERMINAL DE DATOS */}
        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[6] ultra-glass p-6 relative overflow-hidden bg-black/40 tech-frame"
          >
            <div className="absolute top-6 left-6 z-10">
              <h3 className="text-[11px] font-bold tracking-[0.4em] uppercase text-primary neon-primary">3D_NET_MAP</h3>
              <p className="text-[8px] text-primary/40 mt-1 uppercase tracking-widest">Global_Status_Visualization</p>
            </div>
            
            {/* MAPA MUNDIAL SVG REFINADO */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg className="w-full h-full opacity-60" viewBox="0 0 1000 500">
                <defs>
                  <filter id="neon-glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Silueta de mapa simplificada */}
                <path 
                  d="M150,150 L180,130 L220,150 L250,140 L300,180 L320,250 L280,350 L200,400 L150,350 Z M400,100 L450,80 L500,100 L550,120 L580,200 L550,300 L480,350 L420,300 Z M700,150 L750,130 L800,150 L850,200 L820,300 L750,350 L700,300 Z" 
                  fill="rgba(34, 211, 238, 0.05)" 
                  stroke="rgba(34, 211, 238, 0.2)" 
                  strokeWidth="1"
                />

                {/* NODOS DE RED */}
                {[
                  { x: 200, y: 180, active: true }, // NA
                  { x: 250, y: 350, active: true }, // SA
                  { x: 500, y: 150, active: true }, // EU
                  { x: 550, y: 300, active: false }, // AF
                  { x: 750, y: 180, active: true }, // AS
                  { x: 800, y: 380, active: true }, // AU
                ].map((node, i) => (
                  <g key={i}>
                    <circle cx={node.x} cy={node.y} r="6" className={`fill-current ${node.active ? 'text-primary' : 'text-accent'} opacity-20`} />
                    <circle cx={node.x} cy={node.y} r="3" className={`fill-current ${node.active ? 'text-primary' : 'text-accent'} animate-pulse`} />
                  </g>
                ))}

                {/* CONEXIONES DE RED */}
                <path d="M200,180 Q 350,100 500,150" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="5,3" className="opacity-40" />
                <path d="M500,150 Q 625,100 750,180" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="5,3" className="opacity-40" />
                <path d="M250,350 Q 375,300 500,150" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="5,3" className="opacity-40" />
                <path d="M500,150 L 520,180" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" filter="url(#neon-glow)" className="animate-pulse" />
              </svg>
            </div>

            <div className="absolute bottom-6 right-6 text-right">
              <div className="flex items-center gap-3 justify-end">
                <span className="text-[10px] text-primary/40 uppercase tracking-[0.2em]">Packet_Flow_S</span>
                <span className="text-2xl font-mono text-primary neon-primary tracking-tighter">62.8 GB/s</span>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[4] ultra-glass p-4 bg-black/60 flex flex-col overflow-hidden tech-frame"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3 h-3 text-primary neon-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">SYSTEM_TERMINAL</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto font-mono terminal-scroll">
              {terminalLines.map((line, i) => (
                <div key={i} className={`text-[10px] mb-1.5 flex gap-3 ${line.includes('Critical') || line.includes('INTRUSION') ? 'text-accent animate-pulse-soft' : 'text-primary/70'}`}>
                  <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                  <span>{line}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 mt-2 animate-pulse">
                <span className="text-primary">{'>'}</span>
                <div className="w-1.5 h-3 bg-primary" />
              </div>
            </div>
          </motion.section>
        </div>

        {/* COLUMNA DERECHA - TRÁFICO Y CONTROLES VPN */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[5] ultra-glass p-4 flex flex-col tech-frame"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <Activity className="w-3 h-3 text-primary" /> Traffic_PPS
              </h3>
              <Radio className="w-3 h-3 text-accent animate-ping" />
            </div>
            <div className="flex-1 min-h-0 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="pps" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#waveGradient)" 
                    strokeWidth={1.5}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-white/5 bg-white/5 text-center">
                <p className="text-[7px] opacity-40 uppercase tracking-widest mb-1">Peak_Value</p>
                <p className="text-xs font-mono text-primary font-bold">818 PPS</p>
              </div>
              <div className="p-3 border border-white/5 bg-white/5 text-center">
                <p className="text-[7px] opacity-40 uppercase tracking-widest mb-1">Mean_Flow</p>
                <p className="text-xs font-mono text-primary font-bold">210 PPS</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[5] ultra-glass p-5 flex flex-col gap-6 tech-frame"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-accent" />
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase">VPN_CONTROL_ALPHA</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-mono">
                  <span className="opacity-40 uppercase tracking-wider">Encryption_Level</span>
                  <span className="text-primary font-bold">AES-X 80%</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '80%' }} 
                    className="h-full bg-gradient-to-right from-primary to-accent"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full h-10 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-[9px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group">
                  <RefreshCw className="w-3 h-3 text-primary group-hover:rotate-180 transition-transform duration-500" />
                  <span>Reboot_Tunnel</span>
                </button>
                <button className="w-full h-10 bg-accent/10 hover:bg-accent/20 border border-accent/40 text-[9px] font-bold uppercase tracking-[0.3em] transition-all text-accent flex items-center justify-center gap-3 group">
                  <AlertTriangle className="w-3 h-3 animate-pulse" />
                  <span>Emergency_Purge</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[7px] opacity-40 uppercase">Server_Load</span>
                  <span className="text-[10px] font-mono text-primary">0.83%</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[7px] opacity-40 uppercase">Ping_Latency</span>
                  <span className="text-[10px] font-mono text-primary">2.8ms</span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-center opacity-30">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border border-primary rotate-45" />
                <div className="absolute inset-2 bg-primary animate-pulse" />
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* FOOTER BAR INFERIOR */}
      <footer className="h-6 mt-4 px-2 flex justify-between items-center text-[8px] font-mono border-t border-primary/10 bg-black/40">
        <div className="flex gap-8">
          <span className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             KERNEL_X99_OPERATIONAL
          </span>
          <span className="opacity-40 uppercase tracking-[0.2em]">Uptime: 14D_02H_44M_09S</span>
        </div>
        <div className="flex gap-8 items-center">
          <span className="flex items-center gap-2 text-primary">
            <Wifi className="w-3 h-3" /> SIGNAL_STRENGTH: 100%
          </span>
          <span className="opacity-30 uppercase tracking-[0.3em]">Aegis_Tactical_Grid // Transmission_End</span>
        </div>
      </footer>
    </div>
  );
}