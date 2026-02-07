"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Activity, AlertTriangle, 
  Lock, Zap, Radio, RefreshCw
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
    className={`relative group border border-[#00f2ff]/20 bg-[#050b1a]/80 backdrop-blur-xl flex flex-col fui-corner-brackets overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.05)] ${className}`}
  >
    <div className="fui-corner-brackets-inner" />
    <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#00f2ff]/10 bg-[#00f2ff]/5">
      <div className="flex items-center gap-2">
        <Zap className="w-3 h-3 text-[#00f2ff] animate-pulse" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00f2ff]">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {headerExtra && <span className="text-[8px] text-[#00f2ff]/40 font-mono">{headerExtra}</span>}
        {id && <span className="text-[8px] text-[#00f2ff]/20 font-mono">[{id}]</span>}
      </div>
    </div>
    <div className="flex-1 min-h-0 relative overflow-hidden">
      {children}
    </div>
  </motion.div>
);

export default function AegisUltimateDashboard() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [traffic, setTraffic] = useState(Array.from({ length: 30 }, (_, i) => ({ time: i, pps: 0 })));
  const [terminalLines, setTerminalLines] = useState<string[]>(["[SYSTEM] INITIALIZING AEGIS_V2_CORE..."]);
  const [threatLevel, setThreatLevel] = useState("LEVEL_1_SAFE");
  const [stats, setStats] = useState({ throughput: "0.0", peak: "0.0", avg: "0.0", encryption: "DISCONNECTED" });
  const [vpns, setVpns] = useState<VPNStatus[]>([]);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();

    const connectWS = () => {
      const socket = new WebSocket('ws://localhost:8080/ws');

      socket.onopen = () => {
        setTerminalLines(prev => [...prev.slice(-12), "[OK] AEGIS_GO_CORE LINK ESTABLISHED", "[SEC] AES-256 HANDSHAKE COMPLETE"]);
      };

      socket.onmessage = (event) => {
        try {
          const data: AegisData = JSON.parse(event.data);
          switch (data.type) {
            case 'traffic':
              setTraffic(prev => [...prev.slice(1), { time: prev.length, pps: data.payload.pps }]);
              break;
            case 'log':
              setTerminalLines(prev => [...prev.slice(-12), data.payload.message]);
              break;
            case 'threat':
              setThreatLevel(data.payload.level);
              if (data.payload.level.includes('CRITICAL')) {
                setTerminalLines(prev => [...prev.slice(-12), `[!!] THREAT DETECTED: ${data.payload.vector} @ ${data.payload.origin}`]);
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
        setTerminalLines(prev => [...prev.slice(-12), "[ERR] CORE_LINK_LOST. ATTEMPTING_RECOVERY..."]);
        setTimeout(connectWS, 3000);
      };

      return socket;
    };

    const ws = connectWS();
    const timer = setInterval(updateTime, 1000);

    return () => {
      ws.close();
      clearInterval(timer);
    };
  }, []);

  if (!mounted) return <div className="bg-[#020617] w-screen h-screen" />;

  return (
    <div className="relative w-screen h-screen flex flex-col p-4 dot-matrix overflow-hidden bg-[#020617] text-[#00f2ff]">
      <div className="scanline-effect opacity-20" />
      <div className="vignette" />

      <header className="flex justify-between items-end mb-4 px-2 z-20">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.5em] text-[#00f2ff] glitch-text uppercase">Aegis Tactical Grid</h1>
            <span className="text-[7px] text-[#00f2ff]/40 tracking-[0.2em] font-bold">MODE: LOCAL_MIL_ENCRYPTED // {stats.encryption}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#00f2ff]/20 rounded bg-[#00f2ff]/5 neon-glow-cyan">
            <Lock className="w-2.5 h-2.5 text-[#00f2ff]" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Nodes: {vpns.length} Active</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[7px] opacity-40 uppercase tracking-widest mb-0.5">Threat_Level</span>
            <div className={`px-2 py-0.5 border text-[9px] font-bold tracking-[0.1em] rounded animate-pulse ${
              threatLevel.includes('LEVEL_4') ? 'border-[#f43f5e] bg-[#f43f5e]/20 text-[#f43f5e]' : 'border-[#00f2ff] bg-[#00f2ff]/10 text-[#00f2ff]'
            }`}>
              {threatLevel}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[7px] opacity-40 uppercase tracking-widest mb-0.5">System_Time_UTC</span>
            <span className="text-[12px] font-bold tracking-[0.1em] font-mono">{time || "--:--:--"}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0 z-20">
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="AI_VISUAL_MONITOR" id="CAM_ALPHA_01" className="flex-[3]">
            <div className="w-full h-full relative bg-black overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-20 transition-all group-hover:opacity-30"
              />
              <div className="absolute top-3 right-3 bg-[#f43f5e] text-white text-[7px] px-1.5 py-0.5 font-bold border border-white/10">
                AI_TRACKING: TRUE
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[7px] text-[#00f2ff]/40 leading-tight">
                OBJ_DETECT: FACE_VERIFIED<br/>
                CONF_LVL: 98.4%
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-[#00f2ff]/10 relative">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff]/60" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff]/60" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f2ff]/10 animate-scan" />
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="VPN_MESH_STATUS" className="flex-[2]">
            <div className="p-3 space-y-2 h-full overflow-y-auto terminal-scroll">
              {vpns.length > 0 ? vpns.map((vpn, i) => (
                <div key={i} className="p-2 border border-[#00f2ff]/10 bg-[#00f2ff]/3 rounded group hover:bg-[#00f2ff]/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold tracking-wider">{vpn.id}</span>
                    <span className="text-[7px] text-[#00f2ff]/30">{vpn.protocol}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] font-mono text-[#00f2ff]/70">{vpn.bandwidth.toFixed(1)} Mb/s</span>
                    <div className="flex gap-0.5">
                      {Array.from({length: 8}).map((_, j) => (
                        <div key={j} className={`w-1 h-2 rounded-full ${j < 6 ? 'bg-[#00f2ff]/60' : 'bg-[#00f2ff]/10'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 opacity-20 text-[8px] uppercase tracking-widest">Awaiting Mesh Data...</div>
              )}
            </div>
          </TacticalPanel>
        </div>

        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="GLOBAL_DEFENSE_MAP" headerExtra="NODE_TRACKING" className="flex-[4]">
            <div className="w-full h-full relative bg-[#00f2ff]/2 rounded-lg overflow-hidden border border-[#00f2ff]/5">
              <NetMap />
              <div className="absolute top-4 right-6 text-right bg-black/40 p-3 backdrop-blur-md border border-[#00f2ff]/10 rounded-sm">
                <span className="text-[7px] opacity-40 uppercase block mb-0.5 tracking-widest">Real_Time_Flow</span>
                <span className="text-3xl font-black text-[#00f2ff] tracking-tighter leading-none">
                  {stats.throughput} <span className="text-[10px] uppercase opacity-40 font-medium tracking-normal">Gb/s</span>
                </span>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="CORE_TERMINAL_IO" className="flex-[2]">
            <div className="p-3 bg-black/40 h-full overflow-y-auto terminal-scroll font-mono text-[8px] leading-relaxed">
              {terminalLines.map((line, i) => (
                <div key={i} className={`mb-1 transition-opacity ${i === terminalLines.length - 1 ? 'text-[#00f2ff]' : 'text-[#00f2ff]/40'}`}>
                  <span className="opacity-20 mr-2">[{i.toString().padStart(3, '0')}]</span>
                  <span className="tracking-tight">{line}</span>
                </div>
              ))}
              <div className="w-1.5 h-3 bg-[#00f2ff]/50 animate-pulse inline-block align-middle ml-1" />
            </div>
          </TacticalPanel>
        </div>

        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="TRAFFIC_TELEMETRY" className="flex-[2]">
            <div className="p-3 h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <defs>
                      <linearGradient id="colorPps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="pps" stroke="#00f2ff" fill="url(#colorPps)" strokeWidth={1} isAnimationActive={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 border border-[#00f2ff]/5 bg-[#00f2ff]/3 rounded">
                  <span className="text-[7px] opacity-30 uppercase block mb-0.5 tracking-tighter">Peak</span>
                  <span className="text-[10px] font-bold font-mono text-[#00f2ff]/80">{stats.peak}</span>
                </div>
                <div className="p-2 border border-[#00f2ff]/5 bg-[#00f2ff]/3 rounded">
                  <span className="text-[7px] opacity-30 uppercase block mb-0.5 tracking-tighter">Avg</span>
                  <span className="text-[10px] font-bold font-mono text-[#00f2ff]/80">{stats.avg}</span>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ENCRYPTION_CONTROL" className="flex-[3]">
            <div className="p-2 flex flex-col h-full bg-[#00f2ff]/2">
              <div className="space-y-3 flex-1 overflow-y-auto terminal-scroll pr-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] uppercase tracking-widest font-bold">
                    <span className="opacity-40">Security_Score</span>
                    <span className="text-[#00f2ff]/80">94.2%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full relative overflow-hidden rounded-full">
                    <div className="h-full bg-[#00f2ff]/60 shadow-[0_0_5px_#00f2ff] transition-all duration-1000" style={{ width: '94%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="p-1.5 border border-[#00f2ff]/5 bg-black/40 rounded flex items-center justify-between">
                    <span className="text-[8px] font-bold tracking-tight opacity-60">AES-X Integrity</span>
                    <Activity className="w-2.5 h-2.5 text-[#00f2ff]/30" />
                  </div>
                  <div className="p-1.5 border border-[#00f2ff]/5 bg-black/40 rounded flex items-center justify-between">
                    <span className="text-[8px] font-bold tracking-tight opacity-60">Handshake Latency</span>
                    <span className="text-[8px] font-mono text-[#00f2ff]/70">1.2ms</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mt-3">
                <button className="w-full py-1.5 border border-[#00f2ff]/20 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 text-[7px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group rounded">
                  <RefreshCw className="w-2 h-2 group-hover:rotate-180 transition-transform duration-500" />
                  Rotate_Keys
                </button>
                <button className="w-full py-1.5 border border-[#f43f5e]/30 bg-[#f43f5e]/5 hover:bg-[#f43f5e]/20 text-[#f43f5e] text-[7px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group rounded">
                  <AlertTriangle className="w-2 h-2 animate-pulse" />
                  Flush_Grid
                </button>
              </div>
            </div>
          </TacticalPanel>
        </div>
      </main>

      <footer className="mt-4 flex justify-between items-center px-4 text-[7px] border-t border-[#00f2ff]/10 pt-3 opacity-30 z-20">
        <div className="flex gap-8 font-bold uppercase tracking-[0.1em]">
          <span>Station: AEGIS_H1_ALPHA</span>
          <span>Kernel: v5.15-SECURE</span>
        </div>
        <div className="flex gap-8 items-center font-bold tracking-[0.2em]">
          <span className="flex items-center gap-1.5">
            <Radio className="w-2.5 h-2.5 text-[#00f2ff]" />
            LINK_STABLE: 100%
          </span>
          <span>SYSTEM_GRID_AEGIS</span>
        </div>
      </footer>
    </div>
  );
}