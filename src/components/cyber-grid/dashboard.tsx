
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, AlertTriangle, 
  Cpu, Database, Globe, Radio, RefreshCw, 
  Box, Lock, Zap
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
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`relative group border border-[#00f2ff]/20 bg-[#050b1a]/80 backdrop-blur-xl flex flex-col fui-corner-brackets overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.05)] ${className}`}
  >
    <div className="fui-corner-brackets-inner" />
    <div className="flex justify-between items-center px-4 py-2 border-b border-[#00f2ff]/10 bg-[#00f2ff]/5">
      <div className="flex items-center gap-2">
        <Zap className="w-3 h-3 text-[#00f2ff] animate-pulse" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00f2ff]">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {headerExtra && <span className="text-[8px] text-[#00f2ff]/40 font-mono">{headerExtra}</span>}
        {id && <span className="text-[8px] text-[#00f2ff]/20 font-mono">[{id}]</span>}
      </div>
    </div>
    <div className="flex-1 min-h-0 relative">
      {children}
    </div>
  </motion.div>
);

export default function AegisUltimateDashboard() {
  const [time, setTime] = useState(new Date());
  const [traffic, setTraffic] = useState(Array.from({ length: 30 }, (_, i) => ({ time: i, pps: 0 })));
  const [terminalLines, setTerminalLines] = useState<string[]>(["[SYSTEM] INITIALIZING AEGIS_V2_CORE..."]);
  const [threatLevel, setThreatLevel] = useState("LEVEL_1_SAFE");
  const [stats, setStats] = useState({ throughput: "0.0", peak: "0.0", avg: "0.0", encryption: "DISCONNECTED" });
  const [vpns, setVpns] = useState<VPNStatus[]>([]);

  useEffect(() => {
    const connectWS = () => {
      const socket = new WebSocket('ws://localhost:8080/ws');

      socket.onopen = () => {
        setTerminalLines(prev => [...prev.slice(-15), "[OK] AEGIS_GO_CORE LINK ESTABLISHED", "[SEC] AES-256 HANDSHAKE COMPLETE"]);
      };

      socket.onmessage = (event) => {
        try {
          const data: AegisData = JSON.parse(event.data);
          switch (data.type) {
            case 'traffic':
              setTraffic(prev => [...prev.slice(1), { time: prev.length, pps: data.payload.pps }]);
              break;
            case 'log':
              setTerminalLines(prev => [...prev.slice(-15), data.payload.message]);
              break;
            case 'threat':
              setThreatLevel(data.payload.level);
              if (data.payload.level.includes('CRITICAL')) {
                setTerminalLines(prev => [...prev.slice(-15), `[!!] THREAT DETECTED: ${data.payload.vector} @ ${data.payload.origin}`]);
              }
              break;
            case 'stats':
              setStats(prev => ({...prev, ...data.payload}));
              if (data.payload.vpns) setVpns(data.payload.vpns);
              break;
          }
        } catch (e) { console.error(e); }
      };

      socket.onclose = () => {
        setTerminalLines(prev => [...prev.slice(-15), "[ERR] CORE_LINK_LOST. ATTEMPTING_RECOVERY..."]);
        setTimeout(connectWS, 3000);
      };

      return socket;
    };

    const ws = connectWS();
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      ws.close();
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col p-4 dot-matrix overflow-hidden bg-[#020617] text-[#00f2ff]">
      <div className="scanline-effect opacity-30" />
      <div className="vignette" />

      {/* HEADER TÁCTICO */}
      <header className="flex justify-between items-end mb-6 px-2 z-20">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.6em] text-[#00f2ff] glitch-text uppercase">Aegis Tactical Grid</h1>
            <span className="text-[8px] text-[#00f2ff]/40 tracking-[0.3em] font-bold">MODE: LOCAL_MIL_ENCRYPTED // {stats.encryption}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 border border-[#00f2ff]/30 rounded bg-[#00f2ff]/10 neon-glow-cyan">
            <Lock className="w-3 h-3 text-[#00f2ff]" />
            <span className="text-[10px] font-bold tracking-widest">VPN_MESH: {vpns.filter(v => v.status === 'ENCRYPTED' || v.status === 'STEALTH').length} ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-40 uppercase tracking-widest mb-1">Threat_Vector</span>
            <div className={`px-3 py-1 border text-[10px] font-bold tracking-[0.2em] rounded animate-pulse ${
              threatLevel.includes('LEVEL_4') ? 'border-[#f43f5e] bg-[#f43f5e]/20 text-[#f43f5e]' : 'border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff]'
            }`}>
              {threatLevel}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-40 uppercase tracking-widest mb-1">System_Time_UTC</span>
            <span className="text-sm font-bold tracking-[0.2em] font-mono">{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
          </div>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <main className="flex-1 grid grid-cols-12 gap-5 min-h-0 z-20">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-span-3 flex flex-col gap-5 min-h-0">
          <TacticalPanel title="AI_VISUAL_MONITOR" id="CAM_ALPHA_01" className="flex-[3]">
            <div className="w-full h-full relative bg-black overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-30 contrast-125 transition-all group-hover:opacity-40"
              />
              <div className="absolute top-4 right-4 bg-[#f43f5e] text-white text-[8px] px-2 py-1 font-bold border border-white/20 shadow-lg">
                AI_TRACKING: TRUE
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[7px] text-[#00f2ff]/60 leading-tight">
                OBJ_DETECT: FACE_VERIFIED<br/>
                CONF_LVL: 98.4%<br/>
                PROTO: SCAN_ACTIVE
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border border-[#00f2ff]/20 relative">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f2ff]" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f2ff]" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f2ff]/10 animate-scan" />
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="VPN_MESH_STATUS" className="flex-[2]">
            <div className="p-4 space-y-3 h-full overflow-y-auto terminal-scroll">
              {vpns.length > 0 ? vpns.map((vpn, i) => (
                <div key={i} className="p-3 border border-[#00f2ff]/10 bg-[#00f2ff]/5 rounded group hover:bg-[#00f2ff]/10 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-[#00f2ff]/60" />
                      <span className="text-[10px] font-bold tracking-wider">{vpn.id}</span>
                    </div>
                    <span className="text-[8px] text-[#00f2ff]/40">{vpn.protocol}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-mono text-[#00f2ff]">{vpn.bandwidth.toFixed(1)} Mb/s</span>
                    <div className="flex gap-1">
                      {Array.from({length: 10}).map((_, j) => (
                        <div key={j} className={`w-1 h-3 rounded-full ${j < 7 ? 'bg-[#00f2ff]' : 'bg-[#00f2ff]/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 opacity-20 text-[10px]">WAITING FOR MESH_DATA...</div>
              )}
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA CENTRAL */}
        <div className="col-span-6 flex flex-col gap-5 min-h-0">
          <TacticalPanel title="GLOBAL_DEFENSE_MAP" headerExtra="NETWORK_NODE_TRACKING" className="flex-[4]">
            <div className="w-full h-full relative bg-[#00f2ff]/5 rounded-lg overflow-hidden border border-[#00f2ff]/10">
              <NetMap />
              <div className="absolute top-6 right-8 text-right bg-black/40 p-4 backdrop-blur-md border border-[#00f2ff]/20 rounded-sm">
                <span className="text-[10px] opacity-40 uppercase block mb-1">Real_Time_Throughput</span>
                <span className="text-4xl font-black text-[#00f2ff] tracking-tighter leading-none">
                  {stats.throughput} <span className="text-sm uppercase opacity-60 font-medium tracking-normal">Gb/s</span>
                </span>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="CORE_TERMINAL_IO" className="flex-[2]">
            <div className="p-4 bg-black/60 h-full overflow-y-auto terminal-scroll font-mono text-[9px] leading-relaxed">
              {terminalLines.map((line, i) => (
                <div key={i} className={`mb-1.5 transition-opacity ${i === terminalLines.length - 1 ? 'text-[#00f2ff]' : 'text-[#00f2ff]/50'}`}>
                  <span className="opacity-30 mr-3">[{i.toString().padStart(3, '0')}]</span>
                  <span className="tracking-tight">{line}</span>
                </div>
              ))}
              <div className="w-2 h-4 bg-[#00f2ff]/80 animate-pulse inline-block align-middle ml-2" />
            </div>
          </TacticalPanel>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-span-3 flex flex-col gap-5 min-h-0">
          <TacticalPanel title="TRAFFIC_TELEMETRY" className="flex-[2]">
            <div className="p-4 h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <defs>
                      <linearGradient id="colorPps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="pps" stroke="#00f2ff" fill="url(#colorPps)" strokeWidth={2} isAnimationActive={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 border border-[#00f2ff]/10 bg-[#00f2ff]/5 rounded">
                  <span className="text-[8px] opacity-40 uppercase block mb-1">Peak_Throughput</span>
                  <span className="text-[12px] font-bold font-mono">{stats.peak}</span>
                </div>
                <div className="p-3 border border-[#00f2ff]/10 bg-[#00f2ff]/5 rounded">
                  <span className="text-[8px] opacity-40 uppercase block mb-1">Avg_Flow</span>
                  <span className="text-[12px] font-bold font-mono">{stats.avg}</span>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ENCRYPTION_CONTROL" className="flex-[3]">
            <div className="p-4 flex flex-col justify-between h-full bg-[#00f2ff]/2 overflow-y-auto terminal-scroll">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[7px] uppercase tracking-widest font-bold">
                    <span className="opacity-50">Ciphers_Integrity</span>
                    <span className="text-[#00f2ff]">VALIDATED 100%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full relative overflow-hidden rounded-full">
                    <div className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] transition-all duration-1000" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-2 border border-[#00f2ff]/10 bg-black/40 rounded flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[6px] opacity-40 uppercase">Latency_Handshake</span>
                      <span className="text-[10px] font-bold tracking-tight">1.8 ms</span>
                    </div>
                    <Activity className="w-3 h-3 text-[#00f2ff]/40" />
                  </div>
                  <div className="p-2 border border-[#00f2ff]/10 bg-black/40 rounded flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[6px] opacity-40 uppercase">Active_Tunnels</span>
                      <span className="text-[10px] font-bold tracking-tight">{vpns.length} / 12</span>
                    </div>
                    <Radio className="w-3 h-3 text-[#00f2ff]/40" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <button className="w-full py-2.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/20 text-[9px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group relative overflow-hidden rounded">
                  <RefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500" />
                  Rotate_Ciphers
                </button>
                <button className="w-full py-2.5 border border-[#f43f5e]/50 bg-[#f43f5e]/10 hover:bg-[#f43f5e]/30 text-[#f43f5e] text-[9px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group overflow-hidden rounded">
                  <AlertTriangle className="w-2.5 h-2.5 animate-pulse" />
                  Purge_All_Tunnels
                </button>
              </div>
            </div>
          </TacticalPanel>
        </div>
      </main>

      <footer className="mt-5 flex justify-between items-center px-4 text-[8px] border-t border-[#00f2ff]/10 pt-4 opacity-50 z-20">
        <div className="flex gap-12 font-bold uppercase tracking-[0.2em]">
          <span>Uptime: LOCAL_SYSTEM_SECURE</span>
          <span>Station: Aegis_H1_Alpha</span>
          <span>Kernel: v5.15-Aegis</span>
        </div>
        <div className="flex gap-12 items-center font-bold">
          <span className="flex items-center gap-2 uppercase">
            <Radio className="w-3 h-3 text-[#00f2ff]" />
            Satellite_Link: 100% (STABLE)
          </span>
          <span className="tracking-[0.3em]">SYSTEM_GRID_AEGIS // END_OF_SESSION</span>
        </div>
      </footer>
    </div>
  );
}
