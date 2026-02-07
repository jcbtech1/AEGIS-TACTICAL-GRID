"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, AlertTriangle, 
  Lock, Zap, Radio, RefreshCw,
  Terminal as TerminalIcon, Cpu, Smartphone,
  Database, Globe, Wifi
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import NetMap from './net-map';

interface VPNStatus {
  id: string;
  protocol: string;
  status: string;
  bandwidth: number;
  latency: number;
}

interface AegisData {
  type: 'traffic' | 'log' | 'threat' | 'stats';
  payload: any;
}

const TacticalPanel = ({ title, id, children, className = "", headerExtra = "" }: { title: string, id?: string, children: React.ReactNode, className?: string, headerExtra?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`relative group border border-[#00f2ff]/20 bg-[#050b1a]/85 backdrop-blur-xl flex flex-col fui-corner-brackets overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.05)] ${className}`}
  >
    <div className="fui-corner-brackets-inner" />
    <div className="flex justify-between items-center px-2 py-1 border-b border-[#00f2ff]/10 bg-[#00f2ff]/5">
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-[#00f2ff] animate-ping rounded-full" />
        <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#00f2ff]/80">{title}</h3>
      </div>
      <div className="flex items-center gap-2">
        {headerExtra && <span className="text-[7px] text-[#00f2ff]/30 font-mono tracking-tighter">{headerExtra}</span>}
        {id && <span className="text-[7px] text-[#00f2ff]/20 font-mono">[{id}]</span>}
      </div>
    </div>
    <div className="flex-1 min-h-0 relative">
      {children}
    </div>
  </motion.div>
);

export default function AegisUltimateDashboard() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [traffic, setTraffic] = useState(Array.from({ length: 30 }, (_, i) => ({ time: i, pps: 20 + Math.random() * 40 })));
  const [terminalLines, setTerminalLines] = useState<string[]>(["[SYSTEM] INITIALIZING AEGIS_V2_CORE...", "[SEC] KERNEL_LOAD_OK", "[NET] SCANNING_TOPOLOGY..."]);
  const [threatLevel, setThreatLevel] = useState("LEVEL_1_SAFE");
  const [stats, setStats] = useState({ throughput: "442.1", peak: "892.4", avg: "512.1", encryption: "MIL-SPEC AES-256" });
  const [vpns, setVpns] = useState<VPNStatus[]>([
    {id: "TNL-A1", protocol: "WireGuard", status: "ENC", bandwidth: 450.2, latency: 1.2},
    {id: "TNL-B2", protocol: "OpenVPN", status: "ENC", bandwidth: 210.5, latency: 4.5},
    {id: "TNL-G9", protocol: "Shadow", status: "STL", bandwidth: 125.1, latency: 0.8}
  ]);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }) + ":" + now.getMilliseconds().toString().padStart(3, '0'));
    };
    
    const interval = setInterval(() => {
      updateTime();
      // Simular tráfico dinámico
      setTraffic(prev => [...prev.slice(1), { time: prev.length, pps: 40 + Math.random() * 60 }]);
      
      // Simular logs ocasionales
      if (Math.random() > 0.8) {
        const logs = ["[DPI] PKT_INSPECTED", "[AUTH] NODE_VERIFIED", "[NET] MESH_STABLE", "[SEC] ROTATING_KEYS"];
        setTerminalLines(prev => [...prev.slice(-15), logs[Math.floor(Math.random() * logs.length)]]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="bg-[#020617] w-screen h-screen" />;

  return (
    <div className="relative w-screen h-screen flex flex-col p-3 dot-matrix overflow-hidden bg-[#020617] text-[#00f2ff] selection:bg-[#00f2ff]/30">
      <div className="scanline-effect opacity-10" />
      <div className="vignette" />

      {/* HEADER TÁCTICO */}
      <header className="flex justify-between items-end mb-3 px-1 z-20 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xs font-black tracking-[0.4em] text-[#00f2ff] glitch-text uppercase leading-none">Aegis Tactical Grid</h1>
            <span className="text-[6px] text-[#00f2ff]/40 tracking-[0.2em] font-bold mt-1">OPERATIONAL_MODE: LOCAL_ENCRYPTED // {stats.encryption}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-2 py-1 border border-[#00f2ff]/20 rounded bg-[#00f2ff]/5">
            <Shield className="w-2.5 h-2.5 text-[#00f2ff] animate-pulse" />
            <span className="text-[8px] font-bold tracking-widest uppercase">Nodes: {vpns.length} Active</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[6px] opacity-40 uppercase tracking-widest mb-0.5">Threat_Level</span>
            <div className={`px-2 py-0.5 border text-[8px] font-bold tracking-[0.1em] rounded transition-colors duration-500 ${
              threatLevel.includes('LEVEL_4') ? 'border-[#f43f5e] bg-[#f43f5e]/20 text-[#f43f5e] animate-pulse' : 'border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff]'
            }`}>
              {threatLevel}
            </div>
          </div>
          <div className="flex flex-col items-end min-w-[100px]">
            <span className="text-[6px] opacity-40 uppercase tracking-widest mb-0.5">System_Time_UTC</span>
            <span className="text-[10px] font-bold tracking-[0.1em] font-mono whitespace-nowrap">{time || "--:--:--:---"}</span>
          </div>
        </div>
      </header>

      {/* REJILLA MODULAR */}
      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0 z-20">
        
        {/* COLUMNA IZQUIERDA (20% aprox) */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          <TacticalPanel title="VISUAL_MONITOR" id="CAM_01" className="flex-[3]">
            <div className="w-full h-full relative bg-black overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-30 contrast-125"
              />
              <div className="absolute top-2 right-2 bg-[#f43f5e] text-white text-[6px] px-1 py-0.5 font-bold border border-white/10 animate-pulse">
                REC_ACTIVE
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 border border-[#00f2ff]/30 relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#f43f5e]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#f43f5e]" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f2ff]/20 animate-scan" />
                  <span className="absolute -top-4 left-0 text-[6px] text-[#f43f5e] font-bold">OBJ_LOCKED: 89.4%</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-[6px] text-[#00f2ff]/60 font-mono">
                X: 42.12 | Y: 88.01<br/>Z: 1.04_ALPHA
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ACTIVE_DEVICES" className="flex-[2]">
            <div className="p-2 space-y-1 h-full overflow-y-auto terminal-scroll">
              {vpns.map((vpn, i) => (
                <div key={i} className="p-1.5 border border-[#00f2ff]/10 bg-[#00f2ff]/5 rounded flex items-center justify-between group hover:border-[#00f2ff]/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
                    <span className="text-[8px] font-bold">{vpn.id}</span>
                  </div>
                  <span className="text-[7px] font-mono text-[#00f2ff]/40">{vpn.bandwidth.toFixed(1)} Mb/s</span>
                </div>
              ))}
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA CENTRAL (55% aprox) */}
        <div className="col-span-6 flex flex-col gap-3 min-h-0">
          <TacticalPanel title="GLOBAL_NET_MAP" headerExtra="LIVE_TOPOLOGY" className="flex-[4]">
            <div className="w-full h-full relative bg-[#000d1a] overflow-hidden">
              <NetMap />
              <div className="absolute top-4 right-4 text-right bg-black/60 p-2 backdrop-blur-md border border-[#00f2ff]/10">
                <span className="text-[6px] opacity-40 uppercase block mb-0.5">Real_Time_Flow</span>
                <span className="text-xl font-black text-[#00f2ff] tracking-tighter">
                  {stats.throughput} <span className="text-[8px] opacity-40">Gb/s</span>
                </span>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="CORE_TERMINAL" className="flex-[2]">
            <div className="p-2 bg-black/40 h-full overflow-y-auto terminal-scroll font-mono text-[8px] leading-tight">
              <AnimatePresence mode="popLayout">
                {terminalLines.map((line, i) => (
                  <motion.div 
                    key={`${i}-${line}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-1 ${i === terminalLines.length - 1 ? 'text-[#00f2ff]' : 'text-[#00f2ff]/40'}`}
                  >
                    <span className="opacity-20 mr-1">[{i.toString().padStart(3, '0')}]</span>
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="w-1 h-3 bg-[#00f2ff] animate-pulse inline-block align-middle ml-1" />
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA DERECHA (25% aprox) */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          <TacticalPanel title="TRAFFIC_PPS" className="flex-[2]">
            <div className="p-2 h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <defs>
                      <linearGradient id="colorPps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="pps" stroke="#00f2ff" fill="url(#colorPps)" strokeWidth={1} isAnimationActive={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-1 border border-[#00f2ff]/10 bg-black/20 text-center">
                  <span className="text-[6px] opacity-30 uppercase block">Peak</span>
                  <span className="text-[9px] font-bold font-mono">{stats.peak} GB/s</span>
                </div>
                <div className="p-1 border border-[#00f2ff]/10 bg-black/20 text-center">
                  <span className="text-[6px] opacity-30 uppercase block">Avg</span>
                  <span className="text-[9px] font-bold font-mono">{stats.avg} GB/s</span>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ENCRYPTION_CONTROL" className="flex-[3]">
            <div className="p-3 flex flex-col h-full bg-[#00f2ff]/2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[7px] uppercase font-bold">
                  <span className="opacity-40">Integrity_Link</span>
                  <span className="text-[#00f2ff]">98.2%</span>
                </div>
                <div className="h-1 bg-white/5 w-full relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98.2%' }}
                    className="h-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" 
                  />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between p-1.5 border border-[#00f2ff]/10 bg-black/40 rounded">
                  <span className="text-[8px] font-bold opacity-60">AES-256 Auth</span>
                  <Lock className="w-2.5 h-2.5 text-[#00f2ff]/40" />
                </div>
                <div className="flex items-center justify-between p-1.5 border border-[#00f2ff]/10 bg-black/40 rounded">
                  <span className="text-[8px] font-bold opacity-60">Handshake</span>
                  <span className="text-[8px] font-mono text-[#00f2ff]/80">0.8ms</span>
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <button className="w-full py-2 border border-[#00f2ff]/20 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 text-[7px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">
                  <RefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500" />
                  Rotate_Keys
                </button>
                <button className="w-full py-2 border border-[#f43f5e]/30 bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 text-[#f43f5e] text-[7px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">
                  <AlertTriangle className="w-2.5 h-2.5 animate-pulse" />
                  Emergency_Purge
                </button>
              </div>
            </div>
          </TacticalPanel>
        </div>
      </main>

      {/* FOOTER TÉCNICO */}
      <footer className="mt-2 flex justify-between items-center px-1 text-[7px] border-t border-[#00f2ff]/10 pt-2 opacity-40 z-20 shrink-0">
        <div className="flex gap-6 font-bold uppercase tracking-widest">
          <span>Station: AEGIS_H1_SECURE</span>
          <span>Kernel: v6.12.0-AEGIS</span>
        </div>
        <div className="flex gap-6 items-center font-bold tracking-[0.2em]">
          <span className="flex items-center gap-1.5">
            <Radio className="w-2 h-2 text-[#00f2ff] animate-pulse" />
            LINK_STABLE: 100%
          </span>
          <span>SYSTEM_GRID_ALPHA_00</span>
        </div>
      </footer>
    </div>
  );
}
