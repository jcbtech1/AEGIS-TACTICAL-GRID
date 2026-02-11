
"use client";

/**
 * @fileOverview VisualScanModule - Reconocimiento facial táctico avanzado de Aegis.
 * 
 * Interfaz de vigilancia dividida:
 * - Izquierda: Módulo de comparación con base de datos de operadores y métricas biométricas.
 * - Derecha: Feed de video táctico con seguimiento de objetivos, telemetría y escaneo láser.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, ShieldAlert, Cpu, Activity, 
  UserCheck, Target, Database,
  Search, Fingerprint, Lock,
  RefreshCw, Camera, Scan,
  Crosshair, Zap, AlertCircle
} from 'lucide-react';
import { useCollection } from '@/firebase';

interface MatchCandidate {
  id: string;
  name: string;
  confidence: number;
  image: string;
  clearance: number;
}

export default function VisualScanModule() {
  const [targetPos, setTargetPos] = useState({ x: 40, y: 30, w: 25, h: 35 });
  const [activeMatch, setActiveMatch] = useState<MatchCandidate | null>(null);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SCANNING' | 'MATCH_FOUND'>('SCANNING');
  const [telemetry, setTelemetry] = useState({ alt: 450, zoom: 2.4, temp: 36.5 });
  
  // Obtenemos operadores reales de Firestore para la simulación
  const { data: operators } = useCollection<any>('operators');

  useEffect(() => {
    const interval = setInterval(() => {
      // Movimiento aleatorio del tracking box (simulando seguimiento de rostro)
      setTargetPos(prev => ({
        x: Math.max(15, Math.min(65, prev.x + (Math.random() - 0.5) * 8)),
        y: Math.max(15, Math.min(45, prev.y + (Math.random() - 0.5) * 8)),
        w: 20 + Math.random() * 8,
        h: 30 + Math.random() * 8
      }));

      // Telemetría cambiante
      setTelemetry({
        alt: 440 + Math.random() * 20,
        zoom: 2.4 + (Math.random() * 0.2),
        temp: 36.4 + (Math.random() * 0.4)
      });

      // Simulación de comparación cíclica
      if (operators && operators.length > 0) {
        setScanStatus('SCANNING');
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * operators.length);
          const op = operators[randomIndex];
          setActiveMatch({
            id: op.id,
            name: op.name,
            confidence: 88 + Math.random() * 11,
            image: `https://picsum.photos/seed/${op.id}/200/200`,
            clearance: op.clearance || 1
          });
          setScanStatus('MATCH_FOUND');
        }, 1200);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [operators]);

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative p-2 bg-[#000810]/40">
      
      {/* PANEL IZQUIERDO: ANÁLISIS BIOMÉTRICO Y BASE DE DATOS */}
      <div className="flex-[2] flex flex-col gap-3 min-w-0 h-full overflow-hidden">
        <div className="relative flex-1 border border-[#00f2ff]/30 bg-[#050b1a]/95 backdrop-blur-md p-4 flex flex-col fui-corner-brackets overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.05)]">
          <div className="fui-corner-brackets-inner" />
          
          <header className="flex justify-between items-center border-b border-[#00f2ff]/20 pb-3 mb-4">
             <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-[#00f2ff] animate-pulse" />
                <div className="flex flex-col">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00f2ff]">Personnel_Database_Link</span>
                   <span className="text-[6px] text-[#00f2ff]/40 uppercase tracking-widest">Protocol_Heuristic_Comparison</span>
                </div>
             </div>
             <div className={`px-2 py-0.5 border text-[7px] font-bold ${scanStatus === 'MATCH_FOUND' ? 'border-[#00f2ff] text-[#00f2ff] bg-[#00f2ff]/10' : 'border-amber-500 text-amber-500 animate-pulse'}`}>
                {scanStatus}
             </div>
          </header>

          <div className="flex-1 flex flex-col justify-center items-center gap-8 py-4 overflow-y-auto terminal-scroll pr-2">
            <AnimatePresence mode="wait">
              {activeMatch && scanStatus === 'MATCH_FOUND' ? (
                <motion.div 
                  key={activeMatch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-center gap-10">
                    {/* Imagen de Referencia de Archivo */}
                    <div className="relative group flex flex-col items-center">
                       <div className="w-28 h-28 border-2 border-[#00f2ff]/40 bg-black p-1 relative overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.1)]">
                          <img src={activeMatch.image} alt="DB" className="w-full h-full object-cover grayscale opacity-70" />
                          <div className="absolute inset-0 bg-[#00f2ff]/5" />
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_15px_#00f2ff] z-10"
                          />
                       </div>
                       <span className="mt-2 text-[6px] text-[#00f2ff]/60 uppercase tracking-widest font-black">Archive_Record_{activeMatch.id}</span>
                    </div>

                    {/* Nucleo de Comparación */}
                    <div className="flex flex-col items-center justify-center gap-2">
                       <div className="relative w-12 h-12 flex items-center justify-center">
                          <RefreshCw className="w-full h-full text-[#00f2ff] animate-spin opacity-20" style={{ animationDuration: '3s' }} />
                          <Zap className="absolute w-5 h-5 text-[#00f2ff]" />
                       </div>
                       <div className="text-center">
                          <span className="text-[12px] font-black text-[#00f2ff] block leading-none">{activeMatch.confidence.toFixed(1)}%</span>
                          <span className="text-[5px] opacity-40 uppercase tracking-widest">Similarity_Index</span>
                       </div>
                    </div>

                    {/* Captura de Video Táctico */}
                    <div className="relative group flex flex-col items-center">
                       <div className="w-28 h-28 border-2 border-[#f43f5e]/40 bg-black p-1 relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                          <img src={activeMatch.image} alt="Live" className="w-full h-full object-cover contrast-150 saturate-0 brightness-110" />
                          <div className="absolute inset-0 bg-[#f43f5e]/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Target className="w-14 h-14 text-[#f43f5e]/30 animate-pulse" />
                          </div>
                       </div>
                       <span className="mt-2 text-[6px] text-[#f43f5e]/60 uppercase tracking-widest font-black">Tactical_Live_Capture</span>
                    </div>
                  </div>

                  <div className="bg-[#00f2ff]/5 border border-[#00f2ff]/20 p-4 relative overflow-hidden">
                     <div className="fui-corner-brackets-inner" />
                     <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-3">
                           <div>
                              <span className="text-[5px] opacity-40 uppercase block mb-1">Subject_Identity</span>
                              <span className="text-[11px] font-black text-[#00f2ff] tracking-tight uppercase">{activeMatch.name}</span>
                           </div>
                           <div className="flex gap-4">
                              <div>
                                 <span className="text-[5px] opacity-40 uppercase block mb-1">Clearance</span>
                                 <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                       <div key={i} className={`w-2 h-1 ${i <= activeMatch.clearance ? 'bg-[#00f2ff]' : 'bg-[#00f2ff]/10'}`} />
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <span className="text-[5px] opacity-40 uppercase block mb-1">Registry_ID</span>
                                 <span className="text-[8px] font-bold text-white font-mono">{activeMatch.id}</span>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div>
                              <span className="text-[5px] opacity-40 uppercase block mb-1">Biometric_Markers</span>
                              <div className="grid grid-cols-2 gap-1">
                                 <div className="flex justify-between items-center text-[6px] border-b border-[#00f2ff]/10">
                                    <span className="opacity-40">RETINAL</span>
                                    <span className="text-emerald-400 font-bold">MATCH</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[6px] border-b border-[#00f2ff]/10">
                                    <span className="opacity-40">FACIAL_ST</span>
                                    <span className="text-emerald-400 font-bold">MATCH</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[6px] border-b border-[#00f2ff]/10">
                                    <span className="opacity-40">SKIN_T</span>
                                    <span className="text-[#00f2ff] font-bold">{telemetry.temp.toFixed(1)}°C</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[6px] border-b border-[#00f2ff]/10">
                                    <span className="opacity-40">VOICE_P</span>
                                    <span className="text-amber-500 font-bold">PENDING</span>
                                 </div>
                              </div>
                           </div>
                           <button className="w-full py-2 border border-[#00f2ff]/40 bg-[#00f2ff]/10 text-[7px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/20 transition-all">
                              Download_Dossier_Alpha
                           </button>
                        </div>
                     </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-[#00f2ff]/20">
                   <div className="relative">
                      <Search className="w-16 h-16 animate-pulse" />
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-[#00f2ff] rounded-full blur-2xl"
                      />
                   </div>
                   <div className="text-center">
                      <span className="text-[10px] font-black tracking-[0.6em] block mb-2">SCANNING_GRID_0x88...</span>
                      <span className="text-[6px] opacity-40 uppercase">Analyzing_Facial_Topography_Patterns</span>
                   </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <footer className="mt-auto border-t border-[#00f2ff]/10 pt-4 flex justify-between items-end">
             <div className="flex gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-[5px] opacity-40 uppercase tracking-widest">Logic_Node</span>
                   <span className="text-[9px] font-black text-[#00f2ff]">AEGIS_BRAIN_V7</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[5px] opacity-40 uppercase tracking-widest">Latency</span>
                   <span className="text-[9px] font-black text-emerald-400">0.02ms</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00f2ff]/20 animate-pulse" />
                <div className="flex gap-0.5">
                   {[1,2,3,4,5,6,7,8].map(i => (
                     <div key={i} className={`w-1 h-3 border border-[#00f2ff]/20 ${i < 6 ? 'bg-[#00f2ff]/60' : ''}`} />
                   ))}
                </div>
             </div>
          </footer>
        </div>
      </div>

      {/* PANEL DERECHO: FEED DE VIGILANCIA TÁCTICA */}
      <div className="flex-[3] relative bg-[#000508] border border-[#00f2ff]/40 fui-corner-brackets shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden h-full group">
        <div className="fui-corner-brackets-inner" />
        
        {/* Background Video Simulada */}
        <div 
          className="w-full h-full bg-cover bg-center grayscale contrast-[1.8] saturate-[1.5] brightness-[0.7]"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200)',
            filter: 'hue-rotate(190deg) sepia(0.2) contrast(1.5)'
          }}
        />

        {/* Overlay de Interferencia Digital */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="w-full h-full dot-matrix opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/5 to-transparent animate-scan" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* LÁSER DE ESCANEO VERTICAL (ACTIVO) */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-[#f43f5e] shadow-[0_0_30px_#f43f5e] z-30 opacity-40"
        />

        {/* HUD DE TELEMETRÍA SUPERIOR */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-40">
           <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 border-l-4 border-[#f43f5e] backdrop-blur-md">
                 <Camera className="w-4 h-4 text-[#f43f5e] animate-pulse" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">LIVE_FEED_01 // SECURE_LINK</span>
              </div>
              <div className="flex gap-4 px-3 text-[6px] font-mono text-[#00f2ff]/60 uppercase">
                 <span>ALT: {telemetry.alt.toFixed(1)}m</span>
                 <span>ZOOM: {telemetry.zoom.toFixed(1)}X</span>
                 <span>COORD: 52.5200° N, 13.4050° E</span>
              </div>
           </div>
           
           <div className="flex flex-col items-end gap-1">
              <div className="bg-black/40 border border-[#00f2ff]/20 px-2 py-1 flex items-center gap-3">
                 <div className="flex flex-col items-end">
                    <span className="text-[5px] opacity-40 uppercase">Signal_Strength</span>
                    <div className="flex gap-0.5">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-2 h-1 bg-[#00f2ff]" />
                       ))}
                    </div>
                 </div>
                 <Radio className="w-3 h-3 text-[#00f2ff]" />
              </div>
              <span className="text-[6px] text-white/40 uppercase font-mono mt-1">UTC: {new Date().toLocaleTimeString()}</span>
           </div>
        </div>

        {/* RETÍCULA DE SEGUIMIENTO (TRACKING BOX) */}
        <motion.div 
          animate={{ 
            left: `${targetPos.x}%`, 
            top: `${targetPos.y}%`, 
            width: `${targetPos.w}%`, 
            height: `${targetPos.h}%` 
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute z-50 pointer-events-none"
        >
          {/* Esquinas de Tracking Reforzadas */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00f2ff] shadow-[0_0_20px_#00f2ff]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00f2ff] shadow-[0_0_20px_#00f2ff]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00f2ff] shadow-[0_0_20px_#00f2ff]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00f2ff] shadow-[0_0_20px_#00f2ff]" />

          {/* Marcador Central (Crosshair) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
             <div className="w-10 h-[1px] bg-[#00f2ff]/80" />
             <div className="h-10 w-[1px] bg-[#00f2ff]/80 absolute" />
             <div className="w-2 h-2 rounded-full border border-[#00f2ff] animate-ping" />
          </div>

          {/* Etiqueta Flotante de Objetivo */}
          <div className="absolute -top-10 left-0 flex flex-col gap-1 min-w-[120px]">
             <div className="bg-[#00f2ff] text-black px-2 py-0.5 text-[8px] font-black uppercase tracking-widest flex justify-between items-center">
                <span>LOCK: ESTABLISHED</span>
                <Scan className="w-2 h-2" />
             </div>
             <div className="bg-black/60 backdrop-blur-md border border-[#00f2ff]/40 p-1.5 flex flex-col">
                <span className="text-[9px] font-black text-white tracking-tighter">TARGET_ALPHA_0x{activeMatch?.id.slice(-4) || 'NULL'}</span>
                <span className="text-[5px] text-[#00f2ff] font-bold uppercase">{activeMatch?.name || 'ANALYZING...'}</span>
             </div>
          </div>

          {/* Telemetría Dinámica del Objetivo */}
          <div className="absolute -bottom-12 right-0 text-right flex flex-col gap-0.5">
             <span className="text-[7px] text-[#f43f5e] font-black">THREAT: STABLE</span>
             <span className="text-[6px] text-white/40 font-mono">X: {targetPos.x.toFixed(2)} Y: {targetPos.y.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* HUD INFERIOR: METADATOS Y ESTADO GLOBAL */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-40">
           <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-[#00f2ff]/20 p-3">
              <div className="flex flex-col">
                 <span className="text-[6px] opacity-40 uppercase tracking-widest">Global_Status</span>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                    <span className="text-[9px] font-black text-white uppercase">SURVEILLANCE_OK</span>
                 </div>
              </div>
              <div className="w-[1px] h-8 bg-[#00f2ff]/20 mx-2" />
              <div className="flex flex-col">
                 <span className="text-[6px] opacity-40 uppercase tracking-widest">Active_Points</span>
                 <span className="text-[12px] font-black text-[#00f2ff]">1,402</span>
              </div>
           </div>

           <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1">
                 {[1,2,3,4,5,6,7,8,9,10].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-[#00f2ff]/40"
                    />
                 ))}
              </div>
              <span className="text-[6px] font-black text-[#00f2ff] tracking-[0.4em] uppercase">Visual_Stream_Active</span>
           </div>
        </div>

        {/* Viñeta HUD Interna */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      </div>

    </div>
  );
}
