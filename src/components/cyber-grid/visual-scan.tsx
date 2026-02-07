
"use client";

/**
 * @fileOverview VisualScanModule - Módulo de reconocimiento facial táctico.
 * 
 * Implementa una interfaz de vigilancia con seguimiento de objetivos,
 * escaneo láser y telemetría de identidad.
 * Optimizado para ajustarse al contenedor padre sin desbordar.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Cpu, Activity, UserCheck, Target } from 'lucide-react';

export default function VisualScanModule() {
  const [targetPos, setTargetPos] = useState({ x: 30, y: 25, w: 20, h: 30 });
  const [identity, setIdentity] = useState({ 
    name: "IDENT_SCANNING...", 
    threat: "UNCERTAIN", 
    confidence: 0,
    id: "0x000000"
  });

  // Simulación de seguimiento y detección
  useEffect(() => {
    const interval = setInterval(() => {
      // Movimiento aleatorio suave del objetivo
      setTargetPos(prev => ({
        x: Math.max(10, Math.min(70, prev.x + (Math.random() - 0.5) * 5)),
        y: Math.max(10, Math.min(50, prev.y + (Math.random() - 0.5) * 5)),
        w: 15 + Math.random() * 10,
        h: 25 + Math.random() * 10
      }));

      // Simulación de reconocimiento intermitente
      if (Math.random() > 0.8) {
        setIdentity({
          name: "OPERATOR_ALFA_09",
          threat: "LOW",
          confidence: 94 + Math.random() * 5,
          id: "SEC_ID_8842"
        });
      } else if (Math.random() > 0.95) {
        setIdentity({
          name: "UNKNOWN_ENTITY",
          threat: "CRITICAL",
          confidence: 88 + Math.random() * 10,
          id: "ERR_0x404"
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const isCritical = identity.threat === "CRITICAL";

  return (
    <div className={`flex gap-4 h-full p-2 border transition-colors duration-500 min-h-0 overflow-hidden ${isCritical ? 'border-[#f43f5e] animate-pulse' : 'border-[#00f2ff]/20'}`}>
      
      {/* INTERFAZ DE VIDEO CENTRAL */}
      <div className="flex-[3] relative bg-black overflow-hidden border border-[#00f2ff]/30 min-h-0">
        {/* Feed de Video (Placeholder con filtros) */}
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 grayscale"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800)',
            filter: 'sepia(0.2) brightness(1.1) contrast(1.2) hue-rotate(180deg) saturate(2)'
          }}
        />
        
        {/* Overlay de Red Táctica */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#00f2ff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* LÁSER DE ESCANEO */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-[#f43f5e] shadow-[0_0_15px_#f43f5e] z-10"
        />

        {/* RETÍCULA DE SEGUIMIENTO (TRACKING BOX) */}
        <motion.div 
          animate={{ 
            left: `${targetPos.x}%`, 
            top: `${targetPos.y}%`, 
            width: `${targetPos.w}%`, 
            height: `${targetPos.h}%` 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute z-20"
        >
          {/* Esquinas en L */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />

          {/* Etiqueta flotante del objetivo */}
          <div className="absolute -top-6 left-0 flex flex-col gap-0.5 whitespace-nowrap">
             <span className="text-[5px] font-black bg-[#00f2ff] text-black px-1 uppercase tracking-tighter">FACE_LOCKED</span>
             <span className="text-[7px] text-[#00f2ff] font-bold drop-shadow-md">OBJ_0x{targetPos.x.toFixed(0)}</span>
          </div>
        </motion.div>

        {/* Marcas de Agua HUD */}
        <div className="absolute top-3 left-3 text-[6px] text-[#00f2ff]/60 uppercase tracking-[0.3em] font-bold">
          [ LIVE_FEED // SECURE_CHANNEL_01 ]
        </div>
        <div className="absolute bottom-3 right-3 text-[6px] text-[#00f2ff]/60 uppercase font-mono">
          COORD: {targetPos.x.toFixed(2)}N / {targetPos.y.toFixed(2)}E
        </div>
      </div>

      {/* PANELES LATERALES DE DATOS */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        
        {/* PANEL DE IDENTIDAD */}
        <div className="border border-[#00f2ff]/30 bg-[#00f2ff]/5 p-2 flex flex-col gap-1 shrink-0">
           <div className="flex items-center gap-2 border-b border-[#00f2ff]/20 pb-1 mb-1">
              <UserCheck className="w-2.5 h-2.5 text-[#00f2ff]" />
              <span className="text-[7px] font-black uppercase tracking-widest text-[#00f2ff]">Ident_Panel</span>
           </div>
           
           <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-[5px] opacity-40 uppercase">Subject_Identity</span>
                <span className="text-[9px] font-bold text-[#00f2ff] truncate">{identity.name}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[5px] opacity-40 uppercase">Threat_Classification</span>
                <span className={`text-[9px] font-black ${isCritical ? 'text-[#f43f5e]' : 'text-amber-400'}`}>
                  [{identity.threat}]
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[5px] opacity-40 uppercase">Match_Confidence</span>
                <div className="flex items-center gap-2">
                   <div className="flex-1 h-1 bg-black/40 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${identity.confidence}%` }}
                        className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" 
                      />
                   </div>
                   <span className="text-[7px] font-mono">{identity.confidence.toFixed(1)}%</span>
                </div>
              </div>
           </div>
        </div>

        {/* PANEL TÉCNICO DE TELEMETRÍA */}
        <div className="border border-[#00f2ff]/30 bg-black/40 p-2 flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
           <div className="flex items-center gap-2 border-b border-[#00f2ff]/20 pb-1 shrink-0">
              <Activity className="w-2.5 h-2.5 text-[#00f2ff]" />
              <span className="text-[7px] font-black uppercase tracking-widest opacity-60">Tech_Specs</span>
           </div>

           <div className="flex-1 flex flex-col gap-3 justify-center min-h-0">
              {/* Gráfico de Barras Signal */}
              <div className="space-y-1">
                <span className="text-[5px] opacity-30 uppercase tracking-widest">Signal_Intensity</span>
                <div className="flex gap-0.5 h-4 items-end">
                   {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: `${20 + Math.random() * 80}%` }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                        className="flex-1 bg-[#00f2ff]/40" 
                      />
                   ))}
                </div>
              </div>

              <div className="flex justify-between items-end">
                 <div className="flex flex-col">
                    <span className="text-[5px] opacity-30 uppercase tracking-widest">Data_Ingestion</span>
                    <span className="text-[10px] font-black font-mono">{(800 + Math.random() * 200).toFixed(1)} kB/s</span>
                 </div>
                 <Target className="w-4 h-4 text-[#00f2ff]/20 animate-pulse" />
              </div>
           </div>

           <div className="mt-auto pt-1 border-t border-[#00f2ff]/10 shrink-0">
              <div className="flex items-center justify-between text-[5px] opacity-40 uppercase">
                 <span>System_Load</span>
                 <span>4.2%</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
