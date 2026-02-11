
"use client";

/**
 * @fileOverview VisualScanModule - Reconocimiento facial táctico avanzado de Aegis.
 * 
 * Interfaz de vigilancia dividida:
 * - Izquierda: Módulo de comparación con base de datos de operadores.
 * - Derecha: Feed de video táctico con seguimiento de objetivos en tiempo real.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, ShieldAlert, Cpu, Activity, 
  UserCheck, Target, Database,
  Search, Fingerprint, Lock,
  RefreshCw, Camera
} from 'lucide-react';
import { useCollection } from '@/firebase';

interface MatchCandidate {
  id: string;
  name: string;
  confidence: number;
  image: string;
}

export default function VisualScanModule() {
  const [targetPos, setTargetPos] = useState({ x: 40, y: 30, w: 25, h: 35 });
  const [activeMatch, setActiveMatch] = useState<MatchCandidate | null>(null);
  const [comparing, setComparing] = useState(true);
  
  // Obtenemos operadores reales para simular la comparación
  const { data: operators } = useCollection<any>('operators');

  useEffect(() => {
    const interval = setInterval(() => {
      // Movimiento aleatorio del tracking box
      setTargetPos(prev => ({
        x: Math.max(15, Math.min(65, prev.x + (Math.random() - 0.5) * 4)),
        y: Math.max(15, Math.min(45, prev.y + (Math.random() - 0.5) * 4)),
        w: 20 + Math.random() * 8,
        h: 30 + Math.random() * 8
      }));

      // Simulación de comparación de candidatos
      if (operators && operators.length > 0) {
        const randomIndex = Math.floor(Math.random() * operators.length);
        const op = operators[randomIndex];
        setActiveMatch({
          id: op.id,
          name: op.name,
          confidence: 85 + Math.random() * 14,
          image: `https://picsum.photos/seed/${op.id}/100/100`
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [operators]);

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative">
      
      {/* PANEL IZQUIERDO: BASE DE DATOS Y COMPARACIÓN */}
      <div className="flex-[2] flex flex-col gap-3 min-w-0">
        <div className="relative flex-1 border border-[#00f2ff]/30 bg-[#050b1a]/80 backdrop-blur-md p-3 flex flex-col fui-corner-brackets overflow-hidden">
          <div className="fui-corner-brackets-inner" />
          
          <div className="flex items-center gap-3 border-b border-[#00f2ff]/20 pb-2 mb-3">
             <Database className="w-4 h-4 text-[#00f2ff]" />
             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#00f2ff]">Database_Comparison</span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            <AnimatePresence mode="wait">
              {activeMatch ? (
                <motion.div 
                  key={activeMatch.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full space-y-4"
                >
                  <div className="flex items-center justify-center gap-8">
                    {/* Imagen de la base de datos */}
                    <div className="relative group">
                       <div className="w-24 h-24 border-2 border-[#00f2ff]/40 bg-black p-1 relative overflow-hidden">
                          <img src={activeMatch.image} alt="DB" className="w-full h-full object-cover grayscale opacity-60" />
                          <div className="absolute inset-0 bg-[#00f2ff]/5" />
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
                          />
                       </div>
                       <span className="absolute -bottom-4 left-0 right-0 text-[6px] text-center opacity-40 uppercase">Archive_Ref</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1">
                       <RefreshCw className="w-4 h-4 text-[#00f2ff] animate-spin" />
                       <span className="text-[7px] font-black text-[#00f2ff]">{activeMatch.confidence.toFixed(1)}%</span>
                       <span className="text-[5px] opacity-40 uppercase">Confidence</span>
                    </div>

                    {/* Captura en vivo (Simulada) */}
                    <div className="relative group">
                       <div className="w-24 h-24 border-2 border-[#f43f5e]/40 bg-black p-1 relative overflow-hidden">
                          <img src={activeMatch.image} alt="Live" className="w-full h-full object-cover contrast-150 saturate-0" />
                          <div className="absolute inset-0 bg-[#f43f5e]/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Target className="w-12 h-12 text-[#f43f5e]/30" />
                          </div>
                       </div>
                       <span className="absolute -bottom-4 left-0 right-0 text-[6px] text-center opacity-40 uppercase">Live_Capture</span>
                    </div>
                  </div>

                  <div className="bg-[#00f2ff]/5 border border-[#00f2ff]/20 p-3 mt-4">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                           <span className="text-[5px] opacity-40 uppercase">Subject_Identity</span>
                           <span className="text-[10px] font-black text-[#00f2ff]">{activeMatch.name}</span>
                        </div>
                        <div className="px-2 py-0.5 border border-[#00f2ff]/40 text-[7px] font-bold bg-[#00f2ff]/10">
                           ID: {activeMatch.id}
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="flex flex-col gap-1">
                           <span className="text-[5px] opacity-30 uppercase">Biometric_Match</span>
                           <div className="h-1 bg-white/5 w-full relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${activeMatch.confidence}%` }} className="h-full bg-[#00f2ff]" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-[5px] opacity-30 uppercase">Threat_Analysis</span>
                           <span className="text-[8px] font-bold text-emerald-400">CLEAR_LEVEL_AUTHORIZED</span>
                        </div>
                     </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#00f2ff]/20">
                   <Search className="w-12 h-12 animate-pulse" />
                   <span className="text-[8px] font-black tracking-[0.4em]">SCANNING_DATABASE...</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto border-t border-[#00f2ff]/10 pt-3 flex justify-between items-end">
             <div className="flex flex-col gap-1">
                <span className="text-[5px] opacity-40 uppercase tracking-widest">Processing_Core</span>
                <span className="text-[9px] font-black">AEGIS_HEURISTIC_v4</span>
             </div>
             <Activity className="w-5 h-5 text-[#00f2ff]/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: FEED DE VIDEO TÁCTICO */}
      <div className="flex-[3] relative bg-black overflow-hidden border border-[#00f2ff]/40 fui-corner-brackets min-h-0">
        <div className="fui-corner-brackets-inner" />
        
        {/* Feed de Video con Filtros Digitales */}
        <div 
          className="w-full h-full bg-cover bg-center grayscale contrast-150 saturate-200"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200)',
            filter: 'hue-rotate(180deg) brightness(0.8) contrast(1.4)'
          }}
        />

        {/* Overlay de Interferencia y Cuadrícula */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-full dot-matrix" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent animate-scan" />
        </div>

        {/* LÁSER DE ESCANEO VERTICAL */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-[#f43f5e] shadow-[0_0_20px_#f43f5e] z-10 opacity-60"
        />

        {/* RETÍCULA DE SEGUIMIENTO DINÁMICA */}
        <motion.div 
          animate={{ 
            left: `${targetPos.x}%`, 
            top: `${targetPos.y}%`, 
            width: `${targetPos.w}%`, 
            height: `${targetPos.h}%` 
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute z-20"
        >
          {/* Esquinas de Tracking */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f2ff] shadow-[0_0_15px_#00f2ff]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f2ff] shadow-[0_0_15px_#00f2ff]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f2ff] shadow-[0_0_15px_#00f2ff]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f2ff] shadow-[0_0_15px_#00f2ff]" />

          {/* Etiqueta del Objetivo */}
          <div className="absolute -top-7 left-0 flex flex-col gap-0.5">
             <span className="text-[6px] font-black bg-[#00f2ff] text-black px-1.5 py-0.5 uppercase tracking-tighter">FACE_LOCK_ESTABLISHED</span>
             <div className="flex items-center gap-2">
                <span className="text-[8px] text-[#00f2ff] font-black drop-shadow-lg">TARGET_01</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
             </div>
          </div>

          {/* Líneas de telemetría internas */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <div className="w-full h-[1px] bg-[#00f2ff]/40" />
             <div className="h-full w-[1px] bg-[#00f2ff]/40 absolute" />
          </div>
        </motion.div>

        {/* Marcas de Agua HUD y Telemetría */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
           <div className="flex items-center gap-2">
              <Camera className="w-3 h-3 text-[#f43f5e] animate-pulse" />
              <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">REC_LIVE_FEED</span>
           </div>
           <span className="text-[6px] text-[#00f2ff]/60 uppercase font-mono">ENCRYPTED_SIGNAL_STREAM</span>
        </div>

        <div className="absolute bottom-4 right-4 text-right bg-black/60 p-2 border border-[#00f2ff]/20 backdrop-blur-md">
           <span className="text-[5px] opacity-40 uppercase block mb-1">Visual_Telemetrics</span>
           <div className="flex flex-col gap-0.5 text-[8px] font-bold font-mono">
              <span className="text-[#00f2ff]">X: {targetPos.x.toFixed(2)}N</span>
              <span className="text-[#00f2ff]">Y: {targetPos.y.toFixed(2)}E</span>
              <span className="text-[#f43f5e]">ZOOM: 2.4X</span>
           </div>
        </div>

        {/* Brackets de bordes externos (Decorativo) */}
        <div className="absolute inset-4 border border-[#00f2ff]/5 pointer-events-none" />
      </div>

    </div>
  );
}
