
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, Zap, Lock, AlertTriangle, 
  Terminal as TerminalIcon, Cpu, Smartphone, 
  Eye, Server, Globe, Radio, Wifi
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Datos simulados
const trafficData = Array.from({ length: 30 }, (_, i) => ({
  time: i,
  pps: Math.floor(Math.random() * 800) + 200,
}));

const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function AegisDashboard() {
  const [time, setTime] = useState(new Date());
  const [threatLevel, setThreatLevel] = useState('NORMAL');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "AEGIS_OS v4.2.0 INITIALIZED",
    "SECURE_KERNEL LOADED... OK",
    "DECRYPTING_COMM_LAYER... DONE",
    "LISTENING ON PORT 8080..."
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10);
    const threatTimer = setInterval(() => {
      const levels = ['NORMAL', 'ELEVATED', 'CRITICAL'];
      setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 10000);

    const logInterval = setInterval(() => {
      const logs = [
        `[INTRUSION] Packet filtered from node_${Math.random().toString(36).substr(2, 5)}`,
        `[SYNC] Global nodes updated: 14,092`,
        `[SEC] Rotation of encryption keys successful`,
        `[NET] Latency stabilized: 4.2ms`
      ];
      setTerminalLines(prev => [...prev.slice(-10), logs[Math.floor(Math.random() * logs.length)]]);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(threatTimer);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#020617] flex flex-col p-4 overflow-hidden select-none">
      {/* CAPAS DE POST-PROCESADO */}
      <div className="dot-matrix" />
      <div className="scanlines" />
      
      {/* HEADER TÉCNICO */}
      <header className="h-10 flex justify-between items-center px-4 mb-4 border-b border-primary/20 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase neon-primary">
              GLOBAL_SYSTEME_GRID // AEGIS
            </h1>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${threatLevel === 'CRITICAL' ? 'bg-accent animate-alert neon-accent' : 'bg-green-400 neon-primary'}`} />
            <span className="text-[9px] font-mono opacity-60 uppercase tracking-widest">Status: Operational</span>
          </div>
        </div>

        <div className="flex gap-12 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Global Threat Level</span>
            <span className={`text-xs font-bold tracking-widest ${threatLevel === 'CRITICAL' ? 'text-accent' : threatLevel === 'ELEVATED' ? 'text-yellow-400' : 'text-primary'}`}>
              {threatLevel}
            </span>
          </div>
          <div className="flex flex-col items-end w-32">
            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">System_Time</span>
            <span className="text-sm font-mono text-primary neon-primary">
              {time.toLocaleTimeString('en-GB', { hour12: false })}
              <span className="text-[10px] opacity-50 ml-1">:{time.getMilliseconds().toString().padStart(3, '0')}</span>
            </span>
          </div>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* COLUMNA IZQUIERDA - MONITOR & DEVICES */}
        <div className="col-span-3 flex flex-col gap-4">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-1 ultra-glass p-4 flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[8px] opacity-40 font-mono">ID: CAM_008.0D3</span>
              <Eye className="w-3 h-3 text-primary neon-primary" />
            </div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">Visual_Monitor</h3>
            <div className="flex-1 relative bg-black/50 border border-primary/10 rounded-sm overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/aegis-vis/400/400" 
                alt="Monitor" 
                className="w-full h-full object-cover grayscale contrast-150 opacity-40 scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
                data-ai-hint="security person"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border border-primary/40 rounded-sm relative">
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary neon-primary" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary neon-primary" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-primary neon-primary" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary neon-primary" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-primary bg-black/60 px-1">
                ANALYSIS: NODE_ID_77
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-1 ultra-glass p-4 flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[8px] opacity-40 font-mono">REF: DEV_LIST.09</span>
              <Smartphone className="w-3 h-3 text-primary" />
            </div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">Active_Devices</h3>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
              {[
                { label: 'SECURE_NODE_01', type: 'SRV', load: '12%' },
                { label: 'ENCRYPT_X_GATE', type: 'GTW', load: '45%' },
                { label: 'ALPHA_TERMINAL', type: 'USR', load: '08%' },
                { label: 'DATA_CORE_M3', type: 'DB', load: '67%' },
                { label: 'VPN_TUNNEL_09', type: 'VPN', load: '22%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-primary/5 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold font-mono">{item.label}</span>
                    <span className="text-[8px] text-primary/40">{item.type} // STABLE</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-primary">{item.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* CENTRO - MAPA & TERMINAL */}
        <div className="col-span-6 flex flex-col gap-4">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-[2] ultra-glass p-6 relative overflow-hidden bg-black/40"
          >
            <div className="absolute top-6 left-6 z-10">
              <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary neon-primary">3D_GLOBAL_NET_MAP</h3>
              <p className="text-[8px] text-primary/40 mt-1">REALTIME_TRAFFIC_VISUALIZATION</p>
            </div>
            
            <svg className="w-full h-full opacity-40" viewBox="0 0 800 400">
              <defs>
                <filter id="glow-svg">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g className="map-nodes">
                {[...Array(20)].map((_, i) => (
                  <circle 
                    key={i} 
                    cx={150 + Math.random() * 500} 
                    cy={100 + Math.random() * 200} 
                    r="1.5" 
                    className="fill-primary animate-pulse" 
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </g>
              <path 
                d="M200 150 Q 400 50 600 250 T 700 100" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="0.5" 
                strokeDasharray="10,5"
                className="opacity-20"
              />
              <path 
                d="M150 100 L 400 200 L 650 150" 
                fill="none" 
                stroke="hsl(var(--accent))" 
                strokeWidth="1" 
                filter="url(#glow-svg)"
                className="animate-alert"
              />
            </svg>

            <div className="absolute bottom-6 right-6 text-right">
              <div className="flex items-center gap-2 justify-end">
                <Globe className="w-4 h-4 text-primary neon-primary animate-spin-slow" />
                <span className="text-xl font-mono text-primary neon-primary tracking-tighter">42.8 GB/s</span>
              </div>
              <p className="text-[8px] text-primary/40 mt-1">NODES_SCANNED: 14,092 // ACTIVE_LINKS: 882</p>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-1 ultra-glass p-4 bg-black/90 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3 pb-1 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3 h-3 text-primary neon-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Aegis_Tactical_Terminal</span>
              </div>
              <span className="text-[8px] opacity-40 font-mono">v4.2-STABLE</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono scrollbar-hide">
              {terminalLines.map((line, i) => (
                <div key={i} className="text-[10px] mb-1 flex gap-3">
                  <span className="text-primary/30">[{time.toLocaleTimeString()}]</span>
                  <span className={line.includes('CRITICAL') || line.includes('INTRUSION') ? 'text-accent animate-alert' : 'text-primary/90'}>
                    {'>'} {line}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1 animate-pulse">
                <span className="text-primary">{'>'}</span>
                <div className="w-1.5 h-3 bg-primary" />
              </div>
            </div>
          </motion.section>
        </div>

        {/* COLUMNA DERECHA - TRAFFIC & CONTROL */}
        <div className="col-span-3 flex flex-col gap-4">
          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-1 ultra-glass p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <Activity className="w-3 h-3 text-primary" /> Traffic_PPS
              </h3>
              <Radio className="w-3 h-3 text-accent animate-ping neon-accent" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="stepAfter" 
                    dataKey="pps" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorWave)" 
                    strokeWidth={1}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-2 border border-white/5 bg-white/5 rounded-sm">
                <p className="text-[8px] opacity-40 uppercase">Peak Value</p>
                <p className="text-sm font-mono text-primary font-bold">842.09 PPS</p>
              </div>
              <div className="p-2 border border-white/5 bg-white/5 rounded-sm">
                <p className="text-[8px] opacity-40 uppercase">Mean Flow</p>
                <p className="text-sm font-mono text-primary font-bold">310.44 PPS</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={PANEL_VARIANTS} initial="hidden" animate="visible"
            className="flex-1 ultra-glass p-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-accent neon-accent" />
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase">VPN_Control_Alpha</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="opacity-40 uppercase">Encryption Level</span>
                  <span className="text-primary neon-primary font-bold">AES-256-GCM</span>
                </div>
                <Progress value={threatLevel === 'CRITICAL' ? 100 : 85} className="h-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button className="h-10 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-[9px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
                  <Zap className="w-3 h-3 text-primary group-hover:scale-125 transition-transform" />
                  <span>Reboot Tunnel</span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="h-10 bg-accent/10 hover:bg-accent/20 border border-accent/40 text-[9px] font-bold uppercase tracking-[0.2em] transition-all text-accent flex items-center justify-center gap-3 group relative overflow-hidden animate-pulse">
                  <AlertTriangle className="w-3 h-3 group-hover:scale-125 transition-transform" />
                  <span>Emergency Purge</span>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="opacity-40 uppercase">Protocol</span>
                  <span className="text-primary">X-SEC_v9</span>
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="opacity-40 uppercase">Latency</span>
                  <span className="text-primary">0.0042 MS</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* FOOTER BAR */}
      <footer className="h-6 mt-4 px-2 flex justify-between items-center text-[9px] font-mono border-t border-primary/10 bg-black/40">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
             KERNEL_SECURE_X99
          </span>
          <span className="opacity-40">UPTIME: 14D_02H_44M_09S</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 text-primary neon-primary">
            <Wifi className="w-3 h-3" /> SIGNAL: 100%
          </span>
          <span className="opacity-40 uppercase tracking-widest">Aegis_Tactical_Grid // End_Transmission</span>
        </div>
      </footer>
    </div>
  );
}
