
"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Globe as GlobeIcon, Activity, Zap, Lock, AlertTriangle, Terminal as TerminalIcon, BarChart3, Settings, User } from 'lucide-react';
import GlobeView from './globe-view';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  threats: Math.floor(Math.random() * 100) + 20,
  traffic: Math.floor(Math.random() * 50) + 40,
}));

export default function CyberDashboard() {
  const [time, setTime] = useState(new Date());
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Inicializando Red Global de Ciberdefensa...",
    "[AUTH] Usuario validado: NIVEL DE ACCESO ALPHA",
    "[SECURITY] Cortafuegos activos en nodos de Europa",
    "[THREAT] Escaneo de vulnerabilidades detectado en IP 192.168.1.102",
    "[NODES] 98% de la red operativa",
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const logInterval = setInterval(() => {
      const newLog = `[INFO] ${new Date().toLocaleTimeString()} - Paquete analizado: ${Math.random().toString(16).substr(2, 8)}`;
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#000810] grid-bg overflow-hidden flex flex-col p-6 gap-6">
      {/* Background Image / Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src="https://picsum.photos/seed/cybercity/1920/1080" 
          alt="Cyber Background" 
          className="w-full h-full object-cover grayscale"
          data-ai-hint="futuristic city"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000810] via-transparent to-transparent" />
      </div>

      <div className="scanline" />

      {/* Top HUD Panel */}
      <div className="z-10 flex flex-col gap-6 h-[70vh]">
        <header className="flex justify-between items-end border-b border-primary/20 pb-2">
          <div>
            <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary glow-text uppercase">
              Global Cyberdefense Grid
            </h1>
            <p className="text-xs text-primary/60 font-mono">
              SISTEMA ACTIVO // PROTOCOLO DE SEGURIDAD 7B // {time.toLocaleDateString()} {time.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-xs font-mono text-primary/60">ESTADO DEL SISTEMA</p>
              <Badge variant="outline" className="text-primary border-primary bg-primary/10">NOMINAL</Badge>
            </div>
            <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Left HUD - Globe and Stats */}
          <Card className="col-span-4 glass-panel flex flex-col p-4 relative overflow-hidden">
            <div className="absolute top-2 left-2 flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            </div>
            <div className="flex-1 min-h-0">
              <GlobeView />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span>INTEGRIDAD DEL NODO</span>
                <span className="text-primary">99.4%</span>
              </div>
              <Progress value={99.4} className="h-1 bg-primary/10" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border border-primary/20 p-2 rounded">
                  <p className="text-[10px] text-primary/60 font-mono">NODOS ACTIVOS</p>
                  <p className="text-xl font-headline text-primary">12,482</p>
                </div>
                <div className="border border-primary/20 p-2 rounded">
                  <p className="text-[10px] text-primary/60 font-mono">AMENAZAS BLOQUEADAS</p>
                  <p className="text-xl font-headline text-destructive">452</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Center HUD - Global Map & Monitoring */}
          <Card className="col-span-5 glass-panel p-4 flex flex-col gap-4 relative">
             <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <GlobeIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest">Monitoreo de Tráfico Global</span>
                </div>
                <div className="flex gap-1">
                   <div className="w-3 h-1 bg-primary" />
                   <div className="w-3 h-1 bg-primary/30" />
                   <div className="w-3 h-1 bg-primary/10" />
                </div>
             </div>
             <div className="flex-1 border border-primary/10 rounded bg-primary/5 p-2 flex flex-col">
                <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1000')] bg-contain bg-center bg-no-repeat opacity-40 grayscale contrast-150" />
                <div className="h-32 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" vertical={false} />
                      <Area type="monotone" dataKey="threats" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorThreats)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </Card>

          {/* Right HUD - Security Status & Terminal */}
          <div className="col-span-3 flex flex-col gap-6">
            <Card className="flex-1 glass-panel p-4 flex flex-col overflow-hidden">
               <div className="flex items-center gap-2 mb-4">
                  <TerminalIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase">Log del Sistema</span>
               </div>
               <div className="flex-1 font-mono text-[10px] space-y-1 overflow-y-auto custom-scrollbar text-primary/80">
                  {logs.map((log, i) => (
                    <div key={i} className="border-l border-primary/20 pl-2 leading-tight">
                      {log}
                    </div>
                  ))}
               </div>
            </Card>
            <Card className="h-40 glass-panel p-4 flex flex-col justify-center items-center gap-2 border-primary/40 bg-primary/5">
                <Shield className="w-12 h-12 text-primary animate-pulse" />
                <p className="text-xs font-mono glow-text">ESCUDO ACTIVADO</p>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/40">NIVEL 5 PROTECCIÓN</Badge>
            </Card>
          </div>
        </div>
      </div>

      {/* Lower Touch Panel (Bottom Console) */}
      <div className="z-20 h-[25vh] mt-auto">
        <div className="h-full glass-panel rounded-t-[2rem] border-t-2 border-primary/50 shadow-[0_-10px_40px_rgba(0,255,255,0.1)] p-8 grid grid-cols-4 gap-8">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary/60">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Frecuencia del Núcleo</span>
              </div>
              <div className="flex gap-1 h-12 items-end">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
           </div>

           <div className="col-span-2 flex justify-center gap-12 items-center px-12 border-x border-primary/10">
              <button className="group relative">
                <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                  <Lock className="w-6 h-6 text-primary/40 group-hover:text-primary" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary/40 group-hover:text-primary whitespace-nowrap">BLOQUEAR NODOS</span>
              </button>
              
              <button className="group relative">
                <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)] bg-primary/10 group-active:scale-95 transition-all">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary font-bold whitespace-nowrap tracking-widest uppercase">Escanear</span>
              </button>

              <button className="group relative">
                <div className="w-16 h-16 rounded-full border-2 border-destructive/20 flex items-center justify-center group-hover:border-destructive group-hover:bg-destructive/10 transition-all duration-300">
                  <AlertTriangle className="w-6 h-6 text-destructive/40 group-hover:text-destructive" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-destructive/40 group-hover:text-destructive whitespace-nowrap uppercase">Purga</span>
              </button>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-center gap-2">
                 <div className="h-2 w-full bg-primary/10 rounded overflow-hidden">
                    <div className="h-full bg-primary w-2/3" />
                 </div>
                 <div className="h-2 w-full bg-primary/10 rounded overflow-hidden">
                    <div className="h-full bg-primary w-1/2" />
                 </div>
                 <div className="h-2 w-full bg-primary/10 rounded overflow-hidden">
                    <div className="h-full bg-primary w-4/5" />
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex-1 bg-primary text-background text-[10px] font-bold uppercase rounded flex items-center justify-center hover:opacity-90 transition-opacity">
                  Configuracion
                </button>
                <button className="flex-1 border border-primary/40 text-primary text-[10px] font-bold uppercase rounded flex items-center justify-center hover:bg-primary/5 transition-colors">
                  Reportes
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
