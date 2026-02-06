"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Activity, Zap, Lock, AlertTriangle, 
  Cpu, Server, Globe, Radio, RefreshCw, 
  Maximize2, Database, Network, Box, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const generateTrafficData = () => Array.from({ length: 40 }, (_, i) => ({
  time: i,
  pps: 200 + Math.random() * 400,
}));

const TacticalPanel = ({ title, id, children, className = "", headerExtra = "" }: { title: string, id?: string, children: React.ReactNode, className?: string, headerExtra?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`relative group border border-[#00f2ff]/10 bg-[#050b1a]/60 backdrop-blur-sm flex flex-col fui-corner-brackets ${className}`}
  >
    <div className="fui-corner-brackets-inner" />
    
    <div className="flex justify-between items-center p-3 border-b border-[#00f2ff]/5">
      <div className="flex items-center gap-3">
        <Activity className="w-3 h-3 text-[#00f2ff]/60" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00f2ff]">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        {headerExtra && <span className="text-[8px] opacity-40 font-mono">{headerExtra}</span>}
        {id && <span className="text-[8px] opacity-30 font-mono tracking-tighter">{id}</span>}
      </div>
    </div>
    
    <div className="flex-1 min-h-0 relative">
      {children}
    </div>
  </motion.div>
);

export default function AegisUltimateDashboard() {
  const [time, setTime] = useState(new Date());
  const [traffic, setTraffic] = useState(generateTrafficData());
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "[17:53:41] [17:43:05] SYSTEM: NETWORK INTEGRITY VERIFIED - 0 SEGMENTS CORRUPT",
    "[17:53:41] [17:43:09] LISTENING PORT: 8087_CNBI PROCESS_ID: 104 ATTRIBUTES: RWX",
    "[17:53:41] [17:43:12] > RZ FLUX: SI ACTIVE SCAN_MODE: 200X",
    "[17:53:41] [17:53:21] GLOBAL_SYNC: 14,092 NODES VALIDATED",
    "[17:53:41] [17:53:25] AUTH_TOKEN ROTATED: SHA-512_SECURE",
    "[17:53:41] [17:53:29] LATENCY SPIKE DETECTED IN SECTOR_G4"
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const trafficInterval = setInterval(() => {
      setTraffic(prev => [...prev.slice(1), { time: prev.length, pps: 200 + Math.random() * 400 }]);
    }, 2000);

    const logInterval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString('en-GB');
      const logs = [
        `[${timestamp}] AUTH_ENCRYPTION_ROTATED: AES-X_256`,
        `[${timestamp}] NODE_CONNECTION_ESTABLISHED: H1_SECURE_01`,
        `[${timestamp}] PACKET_INSPECTION: 100% CLEAN`,
        `[${timestamp}] SIGNAL_LATENCY: 2.8ms`
      ];
      setTerminalLines(prev => [...prev.slice(-15), logs[Math.floor(Math.random() * logs.length)]]);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(trafficInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#020617] text-[#00f2ff] font-mono flex flex-col p-4 dot-matrix overflow-hidden">
      {/* HEADER TÁCTICO */}
      <header className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.4em] text-[#00f2ff]">GLOBAL SYSTEME GRID</h1>
            <span className="text-[8px] opacity-40 tracking-[0.2em]">STATION: H1_SECURE_01</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 border border-[#00f2ff]/20 rounded-full bg-[#00f2ff]/5">
            <Shield className="w-3 h-3 text-[#00f2ff] animate-pulse" />
            <span className="text-[9px] font-bold tracking-widest uppercase">VPN: ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-40 uppercase tracking-widest mb-1">GLOBAL THREAT</span>
            <div className="px-3 py-0.5 border border-[#f43f5e]/40 bg-[#f43f5e]/10 text-[#f43f5e] text-[9px] font-bold tracking-widest rounded-full animate-pulse">
              CRITICAL_LEVEL_4
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-40 uppercase tracking-widest mb-1">TIME_UTC</span>
            <span className="text-sm font-bold tracking-[0.2em]">{time.toLocaleTimeString('en-GB')}</span>
          </div>
        </div>
      </header>

      {/* REJILLA PRINCIPAL */}
      <main className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* COLUMNA 1: VISUAL & DEVICES (25%) */}
        <div className="col-span-3 flex flex-col gap-6 min-h-0">
          <TacticalPanel title="VISUAL_MONITOR" id="CAM_008.0D3" className="flex-[3]">
            <div className="w-full h-full relative overflow-hidden bg-black/40">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-30 contrast-125"
              />
              <div className="scanline-effect" />
              <div className="absolute inset-0 border-[0.5px] border-[#00f2ff]/5" />
              
              {/* Overlay Recognition */}
              <div className="absolute top-8 right-8 bg-[#f43f5e]/80 text-white text-[7px] px-2 py-1 font-bold border border-white/20">
                UDR_RECOGNITION: 89%
              </div>
              
              {/* Target Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-[#00f2ff]/40 relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f2ff]" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f2ff]" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f2ff]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f2ff]" />
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ACTIVE_DEVICES" className="flex-[2]">
            <div className="p-4 space-y-3 h-full overflow-y-auto terminal-scroll">
              {['WS-01', 'MOB-03', 'GATEWAY'].map((device, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-[#00f2ff]/5 bg-white/5 hover:bg-[#00f2ff]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <Database className="w-3 h-3 text-[#00f2ff]/40" />
                    <span className="text-[10px] font-bold tracking-widest">{device}</span>
                  </div>
                  <button className="text-[7px] px-3 py-1 border border-[#00f2ff]/30 text-[#00f2ff]/70 hover:bg-[#00f2ff]/20 hover:text-[#00f2ff] transition-all uppercase font-bold tracking-widest rounded-full">
                    Scanner
                  </button>
                </div>
              ))}
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA 2: MAP & TERMINAL (50%) */}
        <div className="col-span-6 flex flex-col gap-6 min-h-0">
          <TacticalPanel title="3D_NET_MAP" headerExtra="GLOBAL_STATUS_VISUALIZATION" className="flex-[4]">
            <div className="w-full h-full relative bg-[#00f2ff]/5 flex items-center justify-center">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
                <g opacity="0.2">
                  <path d="M100,200 Q200,100 400,200 T700,200" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="5,5" />
                  <path d="M100,250 Q300,350 500,250 T700,250" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="5,5" />
                </g>
                {[
                  { x: 350, y: 150 }, { x: 450, y: 180 }, { x: 550, y: 140 }
                ].map((p, i) => (
                  <path key={i} d={`M${p.x},${p.y} l40,20 l-20,40 l-40,-20 z`} fill="rgba(0,242,255,0.1)" stroke="#00f2ff" strokeWidth="0.5" />
                ))}
              </svg>
              
              <div className="absolute bottom-8 right-8 text-right">
                <span className="text-[9px] opacity-40 uppercase tracking-[0.3em] block mb-1">PACKET_FLOW_S</span>
                <span className="text-4xl font-black text-[#00f2ff] tracking-tighter">62.8 GB/s</span>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="SYSTEM_TERMINAL" className="flex-[2]">
            <div className="p-4 bg-black/40 h-full overflow-y-auto terminal-scroll font-mono text-[9px] leading-relaxed">
              {terminalLines.map((line, i) => (
                <div key={i} className={`mb-1.5 opacity-60 ${line.includes('LATENCY') ? 'text-[#f43f5e] opacity-100 animate-pulse' : ''}`}>
                  {'>'} {line}
                </div>
              ))}
              <div className="w-1.5 h-3 bg-[#00f2ff] animate-pulse inline-block align-middle ml-1" />
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA 3: TRAFFIC & CONTROL (25%) */}
        <div className="col-span-3 flex flex-col gap-6 min-h-0">
          <TacticalPanel title="TRAFFIC_PPS" className="flex-[2]">
            <div className="p-4 h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <Area 
                      type="step" 
                      dataKey="pps" 
                      stroke="#00f2ff" 
                      fill="rgba(0,242,255,0.05)" 
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 border border-[#00f2ff]/10 bg-white/5 text-center">
                  <span className="text-[7px] opacity-40 uppercase block mb-1">Peak_Value</span>
                  <span className="text-sm font-bold">818 PPS</span>
                </div>
                <div className="p-3 border border-[#00f2ff]/10 bg-white/5 text-center">
                  <span className="text-[7px] opacity-40 uppercase block mb-1">Mean_Flow</span>
                  <span className="text-sm font-bold">210 PPS</span>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="VPN_CONTROL_ALPHA" className="flex-[3]">
            <div className="p-6 flex flex-col justify-center h-full gap-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[8px] uppercase tracking-widest font-bold">
                  <span className="opacity-40">Encryption_Level</span>
                  <span className="text-[#00f2ff]">AES-X 80%</span>
                </div>
                <div className="h-0.5 bg-white/5 w-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    className="h-full bg-[#00f2ff] neon-glow"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/20 text-[9px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 group">
                  <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
                  Reboot_Tunnel
                </button>
                <button className="w-full py-3 border border-[#f43f5e]/40 bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 text-[#f43f5e] text-[9px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 group">
                  <AlertTriangle className="w-3 h-3 animate-pulse" />
                  Emergency_Purge
                </button>
              </div>

              <div className="pt-6 border-t border-[#00f2ff]/10 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <span className="text-[7px] opacity-40 uppercase block">Server_Load</span>
                  <span className="text-[10px] font-bold">0.83%</span>
                </div>
                <div className="text-right">
                  <span className="text-[7px] opacity-40 uppercase block">Ping_Latency</span>
                  <span className="text-[10px] font-bold">2.8ms</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Box className="w-6 h-6 text-[#00f2ff]/20 rotate-45" />
              </div>
            </div>
          </TacticalPanel>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-6 flex justify-between items-center px-2 text-[8px] border-t border-[#00f2ff]/10 pt-4 opacity-60">
        <div className="flex gap-12">
          <span className="tracking-[0.2em] font-bold">UPTIME: 14D_02H_44M_09S</span>
        </div>
        <div className="flex gap-12 items-center">
          <span className="flex items-center gap-2">
            <Radio className="w-2.5 h-2.5" />
            SIGNAL_STRENGTH: 100%
          </span>
          <span className="tracking-[0.3em] font-bold">AEGIS_TACTICAL_GRID // TRANSMISSION_END</span>
        </div>
      </footer>
    </div>
  );
}
