
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Activity, AlertTriangle, 
  Cpu, Database, Globe, Radio, RefreshCw, 
  Box
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import NetMap from './net-map';

// Tipado para los datos del WebSocket
interface AegisData {
  type: 'traffic' | 'log' | 'threat' | 'stats';
  payload: any;
}

const TacticalPanel = ({ title, id, children, className = "", headerExtra = "" }: { title: string, id?: string, children: React.ReactNode, className?: string, headerExtra?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`relative group border border-[#00f2ff]/10 bg-[#050b1a]/70 backdrop-blur-md flex flex-col fui-corner-brackets overflow-hidden ${className}`}
  >
    <div className="fui-corner-brackets-inner" />
    <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#00f2ff]/10 bg-[#00f2ff]/5">
      <div className="flex items-center gap-2">
        <Activity className="w-2.5 h-2.5 text-[#00f2ff]/60" />
        <h3 className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#00f2ff]/90">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {headerExtra && <span className="text-[7px] opacity-40 font-mono tracking-tighter">{headerExtra}</span>}
        {id && <span className="text-[7px] opacity-30 font-mono tracking-tighter">[{id}]</span>}
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
  const [terminalLines, setTerminalLines] = useState<string[]>(["SYSTEM READY. WAITING FOR LOCAL_GO_BACKEND..."]);
  const [threatLevel, setThreatLevel] = useState("LEVEL_1_SAFE");
  const [stats, setStats] = useState({ throughput: "0.0", peak: "0.0", avg: "0.0" });

  // Conexión WebSocket con el backend local de Go
  useEffect(() => {
    const connectWS = () => {
      const socket = new WebSocket('ws://localhost:8080/ws');

      socket.onopen = () => {
        setTerminalLines(prev => [...prev.slice(-12), "[OK] CONNECTED TO AEGIS_GO_CORE"]);
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
              break;
            case 'stats':
              setStats(data.payload);
              break;
          }
        } catch (e) {
          console.error("Error parsing WS data", e);
        }
      };

      socket.onclose = () => {
        setTerminalLines(prev => [...prev.slice(-12), "[ERR] DISCONNECTED FROM AEGIS_GO_CORE. RETRYING..."]);
        setTimeout(connectWS, 5000);
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
    <div className="relative w-screen h-screen flex flex-col p-3 dot-matrix overflow-hidden bg-[#020617]">
      <div className="scanline-effect" />
      <div className="vignette" />

      <header className="flex justify-between items-end mb-4 px-1 z-10">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <h1 className="text-xs font-black tracking-[0.5em] text-[#00f2ff] glitch-text uppercase">Aegis Tactical Grid</h1>
            <span className="text-[7px] opacity-40 tracking-[0.2em] font-bold">STATION: H1_SECURE_ALPHA_01 (LOCAL_MODE)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 border border-[#00f2ff]/30 rounded bg-[#00f2ff]/5 neon-glow-cyan">
            <Shield className="w-2.5 h-2.5 text-[#00f2ff] animate-pulse" />
            <span className="text-[8px] font-bold tracking-widest uppercase">ENCRYPTION: ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[7px] opacity-40 uppercase tracking-widest mb-0.5">Threat_Vector</span>
            <div className={`px-2 py-0.5 border text-[8px] font-bold tracking-widest rounded animate-pulse ${
              threatLevel.includes('LEVEL_4') ? 'border-[#f43f5e]/40 bg-[#f43f5e]/10 text-[#f43f5e]' : 'border-[#00f2ff]/40 bg-[#00f2ff]/10 text-[#00f2ff]'
            }`}>
              {threatLevel}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[7px] opacity-40 uppercase tracking-widest mb-0.5">System_Time_UTC</span>
            <span className="text-xs font-bold tracking-[0.15em]">{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0 z-10">
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="VISUAL_MONITOR" id="CAM_SEC_01" className="flex-[3]">
            <div className="w-full h-full relative bg-black/60 group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Feed" 
                className="w-full h-full object-cover grayscale opacity-20 contrast-150 brightness-75"
              />
              <div className="absolute top-4 right-4 bg-[#f43f5e]/90 text-white text-[7px] px-2 py-0.5 font-bold border border-white/20">
                AI_RECOGNITION: ACTIVE
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 border border-[#00f2ff]/30 relative flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#00f2ff]/80 rounded-full" />
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f2ff]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f2ff]" />
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="ACTIVE_DEVICES" className="flex-[2]">
            <div className="p-3 space-y-2 h-full overflow-y-auto terminal-scroll">
              {['GO_SERVER', 'PYTHON_AI_CORE', 'LOCAL_SUBNET'].map((device, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-[#00f2ff]/10 bg-[#00f2ff]/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <Database className="w-2.5 h-2.5 text-[#00f2ff]/40" />
                    <span className="text-[9px] font-bold tracking-wider">{device}</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-[#00f2ff] rounded-full animate-pulse shadow-[0_0_5px_#00f2ff]" />
                </div>
              ))}
            </div>
          </TacticalPanel>
        </div>

        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="GLOBAL_NET_MAP" headerExtra="REAL_TIME_NODE_TRACKING" className="flex-[4]">
            <div className="w-full h-full relative bg-[#00f2ff]/5">
              <NetMap />
              <div className="absolute top-4 right-4 text-right">
                <span className="text-[8px] opacity-40 uppercase block mb-0.5">Data_Throughput</span>
                <span className="text-3xl font-black text-[#00f2ff] tracking-tighter leading-none">
                  {stats.throughput} <span className="text-xs uppercase opacity-60 font-medium">GB/s</span>
                </span>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="SYSTEM_CONSOLE_IO" className="flex-[2]">
            <div className="p-3 bg-black/50 h-full overflow-y-auto terminal-scroll font-mono text-[8px] leading-relaxed">
              {terminalLines.map((line, i) => (
                <div key={i} className="mb-1 text-[#00f2ff]/60">
                  <span className="opacity-30 mr-2">[{i.toString().padStart(3, '0')}]</span>
                  <span className="tracking-tighter">{line}</span>
                </div>
              ))}
              <div className="w-1 h-3 bg-[#00f2ff]/60 animate-pulse inline-block align-middle ml-1" />
            </div>
          </TacticalPanel>
        </div>

        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="TRAFFIC_PPS_MONITOR" className="flex-[2]">
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
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 border border-[#00f2ff]/10 bg-[#00f2ff]/5">
                  <span className="text-[6px] opacity-40 uppercase block mb-0.5">Peak_PPS</span>
                  <span className="text-[10px] font-bold">{stats.peak}</span>
                </div>
                <div className="p-2 border border-[#00f2ff]/10 bg-[#00f2ff]/5">
                  <span className="text-[6px] opacity-40 uppercase block mb-0.5">Avg_PPS</span>
                  <span className="text-[10px] font-bold">{stats.avg}</span>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="VPN_ENCRYPTION_TUNNEL" className="flex-[3]">
            <div className="p-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[7px] uppercase tracking-widest font-bold">
                    <span className="opacity-40">Encryption_Integrity</span>
                    <span className="text-[#00f2ff]">AES-X 80%</span>
                  </div>
                  <div className="h-0.5 bg-white/5 w-full relative">
                    <div className="h-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff] transition-all" style={{ width: '80%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 border border-[#00f2ff]/10 bg-black/40">
                    <span className="text-[6px] opacity-40 uppercase block">Ping_Lat</span>
                    <span className="text-[10px] font-bold tracking-tight">2.44 ms</span>
                  </div>
                  <div className="p-2 border border-[#00f2ff]/10 bg-black/40">
                    <span className="text-[6px] opacity-40 uppercase block">Srv_Load</span>
                    <span className="text-[10px] font-bold tracking-tight">0.12 %</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <button className="w-full py-2.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/20 text-[8px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group relative overflow-hidden">
                  <RefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500" />
                  Reboot_Tunnel
                </button>
                <button className="w-full py-2.5 border border-[#f43f5e]/40 bg-[#f43f5e]/10 hover:bg-[#f43f5e]/30 text-[#f43f5e] text-[8px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group overflow-hidden">
                  <AlertTriangle className="w-2.5 h-2.5 animate-pulse" />
                  Emergency_Purge
                </button>
              </div>
            </div>
          </TacticalPanel>
        </div>
      </main>

      <footer className="mt-3 flex justify-between items-center px-2 text-[7px] border-t border-[#00f2ff]/10 pt-3 opacity-50 z-10">
        <div className="flex gap-10 font-bold uppercase tracking-widest">
          <span>Uptime: LOCAL_RUNTIME</span>
          <span>Station: ALPHA_GRID_PRIMARY</span>
        </div>
        <div className="flex gap-10 items-center font-bold">
          <span className="flex items-center gap-1.5 uppercase">
            <Radio className="w-2 h-2 text-[#00f2ff]" />
            Sig_Strength: 100%
          </span>
          <span className="tracking-[0.2em]">AEGIS_SYSTEMS_GRID // END_OF_TRANSMISSION</span>
        </div>
      </footer>
    </div>
  );
}
