"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, Zap, Lock, AlertTriangle, 
  Terminal as TerminalIcon, Cpu, Smartphone, 
  Eye, Server, Globe, Radio, Wifi, Database,
  ArrowRight, RefreshCw, Power, Binary, Crosshair
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Datos de tráfico simulados
const generateTrafficData = () => Array.from({ length: 30 }, (_, i) => ({
  time: i,
  pps: 200 + Math.random() * 600,
}));

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const TacticalWidget = ({ title, id, children, className = "" }: { title: string, id: string, children: React.ReactNode, className?: string }) => (
  <motion.div 
    variants={PANEL_VARIANTS}
    className={`relative group border border-[#00f2ff]/20 bg-[#050a10]/80 backdrop-blur-md flex flex-col p-3 hover:border-[#00f2ff]/40 transition-colors duration-300 ${className}`}
  >
    {/* Esquinas Reforzadas */}
    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#00f2ff]" />
    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00f2ff]" />
    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00f2ff]" />
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00f2ff]" />
    
    <div className="flex justify-between items-center mb-2 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-1 h-3 bg-[#00f2ff]/60" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00f2ff]">{title}</h3>
      </div>
      <span className="text-[8px] opacity-40 font-mono tracking-tighter">{id}</span>
    </div>
    
    <div className="flex-1 min-h-0 overflow-hidden">
      {children}
    </div>
  </motion.div>
);

export default function AegisTacticalGrid() {
  const [time, setTime] = useState(new Date());
  const [traffic, setTraffic] = useState(generateTrafficData());
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "SECURE_BOOT_SEQUENCE [OK]",
    "ESTABLISHING_ENCRYPTED_TUNNEL... DONE",
    "NODE_SYC_SUCCESSFUL: 14.88.02.1",
    "SCANNING_SECTOR_7G...",
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 100);
    const trafficInterval = setInterval(() => {
      setTraffic(prev => [...prev.slice(1), { time: prev.length, pps: 200 + Math.random() * 600 }]);
    }, 2000);

    const logInterval = setInterval(() => {
      const logs = [
        `PACKET_INSPECTION_COMPLETED: SECTOR_${Math.floor(Math.random()*99)}`,
        `INTRUSION_ATTEMPT_BLOCKED: IP_192.168.${Math.floor(Math.random()*255)}.1`,
        `VPN_LATENCY_FLUX: ${Math.random().toFixed(2)}ms`,
        `SYSTEM_INTEGRITY_CHECK: 100%`,
        `AUTH_ENCRYPTION_ROTATED: SHA-3`
      ];
      setTerminalLines(prev => [...prev.slice(-20), logs[Math.floor(Math.random() * logs.length)]]);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(trafficInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050a10] text-[#00f2ff] font-mono flex flex-col p-4 selection:bg-[#00f2ff]/20">
      {/* CAPA DE POST-PROCESADO: DOT MATRIX & CRT */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00f2ff 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* HEADER TÉCNICO */}
      <header className="h-10 flex justify-between items-center px-4 border-b border-[#00f2ff]/20 mb-4 shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <h1 className="text-xs font-bold tracking-[0.5em] text-[#00f2ff] uppercase">GLOBAL SYSTEME GRID</h1>
            <div className="h-[1px] w-full bg-[#00f2ff]/20" />
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-[#00f2ff] animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase">VPN: STATUS_ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-40 uppercase tracking-widest">Global_Threat_Lvl</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#f43f5e] animate-pulse uppercase tracking-tighter">Critical_Alert_04</span>
              <div className="w-12 h-1 bg-white/10 overflow-hidden">
                <div className="h-full bg-[#f43f5e] w-[85%]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end min-w-[140px]">
            <span className="text-[8px] opacity-40 uppercase tracking-widest">System_Clock</span>
            <span className="text-xs tabular-nums tracking-widest">
              {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              <span className="text-[10px] opacity-50 ml-1">.{time.getMilliseconds()}</span>
            </span>
          </div>
        </div>
      </header>

      {/* REJILLA DE OPERACIONES (STRICT GRID) */}
      <motion.main 
        initial="hidden" animate="visible"
        className="flex-1 grid grid-cols-10 gap-4 min-h-0"
      >
        {/* COLUMNA IZQUIERDA (20% -> 2 cols de 10) */}
        <div className="col-span-2 flex flex-col gap-4 min-h-0">
          <TacticalWidget title="Visual_Monitor" id="CAM_08.D" className="flex-[3]">
            <div className="relative w-full h-full bg-black/40 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/tactical-1/400/400" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-40 contrast-150"
              />
              <div className="absolute inset-0 bg-[#00f2ff]/5" />
              <div className="absolute inset-0 flex flex-col pointer-events-none">
                <div className="w-full h-[1px] bg-[#00f2ff]/40 animate-[scan-vertical_4s_infinite_linear]" />
              </div>
              {/* Recon Overlay */}
              <div className="absolute top-4 left-4 border border-[#00f2ff]/40 p-1 flex items-center gap-2 bg-[#050a10]/60 backdrop-blur-sm">
                <Crosshair className="w-3 h-3 animate-spin-slow" />
                <span className="text-[8px] font-bold">RECOG: 94.2%</span>
              </div>
            </div>
          </TacticalWidget>

          <TacticalWidget title="Active_Devices" id="NET_NODES" className="flex-[2]">
            <div className="space-y-1.5 overflow-y-auto pr-1 terminal-scroll h-full">
              {['WS_DELTA_01', 'MOBILE_G7', 'GATEWAY_CORE', 'SERVER_ALPHA', 'STORAGE_B3'].map((node, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-[#00f2ff]/10 bg-white/5 group hover:bg-[#00f2ff]/5 transition-all">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-[#00f2ff] ${i === 2 ? 'bg-orange-500 animate-ping' : ''}`} />
                    <span className="text-[9px] font-bold">{node}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] opacity-40 uppercase tracking-tighter">{i === 2 ? 'Suspicious' : 'Secure'}</span>
                    <ArrowRight className="w-2 h-2 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </TacticalWidget>
        </div>

        {/* COLUMNA CENTRO (55% -> 5.5 cols de 10, usamos 5 o 6) */}
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <TacticalWidget title="3D_Net_Map" id="GLOBAL_VIEW" className="flex-[4]">
            <div className="w-full h-full relative bg-black/20 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-60">
                <path d="M100,200 L150,180 L200,200 L250,220 L300,200 M400,100 L450,120 L500,100 L550,130 M600,300 L650,280 L700,300 L750,320" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="4,4" className="opacity-20" />
                {[
                  { x: 150, y: 180, active: true },
                  { x: 450, y: 120, active: true },
                  { x: 650, y: 280, active: true },
                  { x: 300, y: 200, active: false },
                  { x: 500, y: 100, active: true },
                ].map((node, i) => (
                  <g key={i}>
                    <circle cx={node.x} cy={node.y} r="5" className={`fill-current ${node.active ? 'text-[#00f2ff]' : 'text-[#f43f5e]'} opacity-20`} />
                    <circle cx={node.x} cy={node.y} r="2" className={`fill-current ${node.active ? 'text-[#00f2ff]' : 'text-[#f43f5e]'} animate-pulse`} />
                  </g>
                ))}
              </svg>
              <div className="absolute bottom-4 right-4 text-right">
                <span className="text-[8px] opacity-40 uppercase block">Throughput</span>
                <span className="text-xl font-bold tracking-tighter">14.82 GB/s</span>
              </div>
            </div>
          </TacticalWidget>

          <TacticalWidget title="System_Terminal" id="STDOUT_8" className="flex-[2]">
            <div 
              ref={terminalRef}
              className="w-full h-full bg-black/60 p-2 overflow-y-auto terminal-scroll font-mono text-[9px]"
            >
              {terminalLines.map((line, i) => (
                <div key={i} className={`mb-1 flex gap-4 ${line.includes('INTRUSION') || line.includes('Alert') ? 'text-[#f43f5e] animate-pulse' : 'opacity-70'}`}>
                  <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                  <span>{'>'} {line}</span>
                </div>
              ))}
              <div className="w-1.5 h-3 bg-[#00f2ff] animate-pulse inline-block" />
            </div>
          </TacticalWidget>
        </div>

        {/* COLUMNA DERECHA (25% -> 3 cols de 10) */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <TacticalWidget title="Traffic_PPS" id="PPS_FLOW" className="flex-[2]">
            <div className="w-full h-full">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={traffic}>
                  <defs>
                    <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="pps" 
                    stroke="#00f2ff" 
                    fill="url(#wave)" 
                    strokeWidth={1}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="bg-white/5 p-2 text-center">
                   <span className="text-[7px] opacity-40 uppercase block">Peak</span>
                   <span className="text-[10px] font-bold">812 PPS</span>
                 </div>
                 <div className="bg-white/5 p-2 text-center">
                   <span className="text-[7px] opacity-40 uppercase block">Mean</span>
                   <span className="text-[10px] font-bold">422 PPS</span>
                 </div>
              </div>
            </div>
          </TacticalWidget>

          <TacticalWidget title="VPN_Control_Alpha" id="SEC_CORE" className="flex-[3]">
            <div className="space-y-6 flex flex-col justify-center h-full px-2">
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] uppercase tracking-widest">
                  <span className="opacity-40">Encryption_Strength</span>
                  <span className="text-[#00f2ff] font-bold">AES_256 (92%)</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    className="h-full bg-gradient-to-r from-[#00f2ff] to-[#f43f5e]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="relative w-full h-10 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[9px] font-bold uppercase tracking-[0.3em] overflow-hidden group hover:bg-[#00f2ff]/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700" />
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Reboot_Tunnel
                  </span>
                </button>

                <button className="relative w-full h-10 bg-[#f43f5e]/10 border border-[#f43f5e]/40 text-[#f43f5e] text-[9px] font-bold uppercase tracking-[0.3em] overflow-hidden group hover:bg-[#f43f5e]/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f43f5e]/30 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700" />
                  <span className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3 h-3 animate-pulse" />
                    Emergency_Purge
                  </span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#00f2ff]/10 grid grid-cols-2 gap-4 text-[9px]">
                <div>
                  <span className="opacity-40 uppercase block text-[7px]">Latency</span>
                  <span className="font-bold">2.4ms</span>
                </div>
                <div className="text-right">
                  <span className="opacity-40 uppercase block text-[7px]">CPU_Usage</span>
                  <span className="font-bold">14.8%</span>
                </div>
              </div>
            </div>
          </TacticalWidget>
        </div>
      </motion.main>

      {/* FOOTER BAR */}
      <footer className="h-6 mt-4 flex justify-between items-center text-[8px] border-t border-[#00f2ff]/10 shrink-0">
        <div className="flex gap-10">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-pulse" />
            CORE_OPERATIONAL
          </span>
          <span className="opacity-40 tracking-[0.2em] uppercase">Uptime: 14D_02H_44M_09S</span>
        </div>
        <div className="flex gap-10 opacity-40">
          <span>SIG_STRENGTH: 100%</span>
          <span className="tracking-[0.3em]">AEGIS_TACTICAL_GRID // END_TX</span>
        </div>
      </footer>
    </div>
  );
}
