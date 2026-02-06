"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Globe, Activity, Zap, Lock, AlertTriangle, 
  Terminal as TerminalIcon, Cpu, Smartphone, Wifi, 
  Eye, Server, Database, ChevronRight, Radio
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Datos simulados para gráficos
const trafficData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  pps: Math.floor(Math.random() * 500) + 100,
}));

export default function CyberDashboard() {
  const [time, setTime] = useState(new Date());
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> INITIALIZING CYBER_DEFENSE_CORE...",
    "> SYNCING WITH GLOBAL_NODES...",
    "> ENCRYPTING TUNNEL_X99...",
    "> ACCESS GRANTED: LEVEL ALPHA"
  ]);

  // Reloj Militar y Logs
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const logInterval = setInterval(() => {
      const logs = [
        `[AUTH] Access attempt blocked from ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.X.X`,
        `[NET] Packet integrity check: 100%`,
        `[SYS] Kernel temperature stable: 42°C`,
        `[GEO] New node discovered in Singapore`,
      ];
      setTerminalLines(prev => [...prev.slice(-8), logs[Math.floor(Math.random() * logs.length)]]);
    }, 4000);
    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#00050a] flex flex-col p-3 overflow-hidden select-none">
      {/* Capas de Post-Procesado */}
      <div className="crt-overlay" />
      <div className="noise-bg" />
      <div className="scan-line" />

      {/* HEADER WIDGET */}
      <header className="h-12 flex justify-between items-center px-4 mb-2 glass-panel rounded-lg shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase neon-glow">
              GRID_SYSTEM_ALPHA
            </h1>
            <span className="text-[10px] text-primary/50 font-mono">STATION: HQ_SECURE_01</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary animate-pulse neon-glow" />
            <span className="text-[10px] font-mono text-primary">VPN: ACTIVE</span>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Global Threat</span>
            <Badge variant="outline" className="border-accent text-accent bg-accent/10 h-5 px-2 text-[10px]">CRITICAL_LEVEL_4</Badge>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Time_UTC</span>
            <span className="text-sm font-mono text-primary neon-glow">
              {time.toLocaleTimeString('en-GB', { hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT GRID */}
      <div className="flex-1 grid grid-cols-4 gap-3 min-h-0">
        
        {/* LEFT COLUMN (25%) - MONITOR & DEVICES */}
        <aside className="col-span-1 flex flex-col gap-3">
          {/* Face Monitor Widget */}
          <section className="flex-1 glass-panel rounded-lg p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3 text-primary" />
                <h3 className="text-[10px] uppercase font-bold tracking-widest">Visual_Monitor</h3>
              </div>
              <span className="text-[8px] text-primary/50">CAM_048_REC</span>
            </div>
            <div className="flex-1 relative bg-black/40 border border-white/5 rounded overflow-hidden">
              <img 
                src="https://picsum.photos/seed/cyberface/400/300" 
                alt="Face Recognition" 
                className="w-full h-full object-cover grayscale opacity-60 contrast-125"
                data-ai-hint="digital face"
              />
              <div className="absolute inset-0 border-[0.5px] border-primary/20 pointer-events-none" />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <div className="w-20 h-[1px] bg-primary/40" />
                <div className="w-[1px] h-20 bg-primary/40" />
              </div>
              <div className="absolute top-4 right-4 text-[8px] text-primary animate-pulse font-mono bg-black/50 px-1">
                ID: USER_MATCH_88%
              </div>
            </div>
          </section>

          {/* Device List Widget */}
          <section className="flex-1 glass-panel rounded-lg p-3 flex flex-col overflow-hidden">
            <h3 className="text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
              <Smartphone className="w-3 h-3 text-primary" /> Active_Devices
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {[
                { id: 'WS-01', type: 'Server', status: 'online' },
                { id: 'MOB-04', type: 'Handheld', status: 'online' },
                { id: 'IoT-09', type: 'Sensor', status: 'alert' },
                { id: 'GAT-02', type: 'Gateway', status: 'online' },
                { id: 'STO-X', type: 'Database', status: 'standby' },
              ].map((dev, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-white/5 bg-white/5 rounded group hover:bg-primary/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-3 h-3 ${dev.status === 'alert' ? 'text-accent' : 'text-primary'}`} />
                    <span className="text-[10px] font-mono">{dev.id}</span>
                  </div>
                  <Badge className={`text-[8px] h-4 ${dev.status === 'alert' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                    {dev.type}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* CENTER COLUMN (50%) - MAP & TERMINAL */}
        <main className="col-span-2 flex flex-col gap-3">
          {/* Network Map Widget */}
          <section className="flex-[2] glass-panel rounded-lg p-4 relative overflow-hidden bg-black/20">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] neon-glow">3D_NET_MAP</h3>
              <p className="text-[8px] text-primary/40">NODES_SCANNED: 14,092</p>
            </div>
            
            {/* SVG Dinámico simulando mapa de red */}
            <svg className="w-full h-full opacity-60" viewBox="0 0 800 400">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g className="nodes">
                {[...Array(15)].map((_, i) => (
                  <circle 
                    key={i} 
                    cx={100 + Math.random() * 600} 
                    cy={50 + Math.random() * 300} 
                    r="2" 
                    className="fill-primary animate-pulse" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </g>
              <path 
                d="M100 200 Q 400 50 700 200 T 400 350" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="0.5" 
                strokeDasharray="5,5"
                className="opacity-20"
              />
              <path 
                d="M150 100 L 400 200 L 650 150" 
                fill="none" 
                stroke="hsl(var(--accent))" 
                strokeWidth="1" 
                filter="url(#glow)"
                className="animate-pulse"
              />
            </svg>

            {/* Overlay de datos flotantes */}
            <div className="absolute bottom-4 right-4 text-right">
              <div className="text-[8px] font-mono text-primary/60">PACKET_FLOW_X</div>
              <div className="text-lg font-mono text-primary neon-glow tracking-tighter">42.8 GB/s</div>
            </div>
          </section>

          {/* Terminal Widget */}
          <section className="flex-1 glass-panel rounded-lg p-3 bg-black/80 font-mono flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
              <TerminalIcon className="w-3 h-3 text-primary" />
              <span className="text-[9px] uppercase text-primary/60">System_Terminal</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {terminalLines.map((line, i) => (
                <div key={i} className="text-[10px] flex gap-2">
                  <span className="text-primary/40">[{time.toLocaleTimeString()}]</span>
                  <span className={line.includes('ACCESS') ? 'text-primary' : line.includes('blocked') ? 'text-accent' : 'text-white/80'}>
                    {line}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1 animate-pulse">
                <span className="text-primary">{'>'}</span>
                <div className="w-1 h-3 bg-primary" />
              </div>
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN (25%) - TRAFFIC & CONTROLS */}
        <aside className="col-span-1 flex flex-col gap-3">
          {/* Traffic Monitor Widget */}
          <section className="flex-1 glass-panel rounded-lg p-3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3 text-primary" /> Traffic_PPS
              </h3>
              <Radio className="w-3 h-3 text-accent animate-ping" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorPps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="pps" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorPps)" 
                    strokeWidth={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="text-center p-1 border border-white/5 rounded">
                <p className="text-[8px] text-white/40">PEAK_VALUE</p>
                <p className="text-xs font-mono text-primary">842 PPS</p>
              </div>
              <div className="text-center p-1 border border-white/5 rounded">
                <p className="text-[8px] text-white/40">MEAN_FLOW</p>
                <p className="text-xs font-mono text-primary">310 PPS</p>
              </div>
            </div>
          </section>

          {/* VPN Control Panel Widget */}
          <section className="flex-1 glass-panel rounded-lg p-4 flex flex-col gap-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3 text-accent" /> VPN_Control_Alpha
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono">
                  <span>ENCRYPTION_LEVEL</span>
                  <span className="text-primary">AES-256-GCM</span>
                </div>
                <Progress value={85} className="h-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button className="h-8 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-[10px] font-bold uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2 group">
                  <Zap className="w-3 h-3 text-primary group-hover:scale-125 transition-transform" />
                  REBOOT_TUNNEL
                </button>
                <button className="h-8 bg-accent/20 hover:bg-accent/30 border border-accent/30 text-[10px] font-bold uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2 group">
                  <AlertTriangle className="w-3 h-3 text-accent group-hover:scale-125 transition-transform" />
                  EMERGENCY_PURGE
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="text-white/40">SERVER_LOAD</span>
                  <span className="text-primary">12%</span>
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="text-white/40">PING_LATENCY</span>
                  <span className="text-primary">4.2ms</span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* FOOTER STATS BAR */}
      <footer className="h-6 mt-2 px-2 flex justify-between items-center text-[9px] font-mono text-primary/40">
        <div className="flex gap-4">
          <span>KERNEL: V.2.4.98-SECURE</span>
          <span>UPTIME: 14D_02H_44M</span>
          <span className="flex items-center gap-1">
            <Wifi className="w-3 h-3" /> SIGNAL_STRENGTH: 98%
          </span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-primary/80 neon-glow">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            SYSTEM_ALL_NOMINAL
          </span>
        </div>
      </footer>
    </div>
  );
}