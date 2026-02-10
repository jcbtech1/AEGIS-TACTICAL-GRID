
"use client";

/**
 * @fileOverview AdvancedOpsScreen - Rediseño de alta fidelidad basado en la estética Aegis Command.
 * 
 * Versión compactada para evitar desbordamientos en pantalla.
 * Actualizado: AEGIS_IA ahora con soporte de VOZ (Micrófono + Audio) e instrucciones de BACKEND.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Trash2, Brain, 
  Globe, Lock, Cpu, 
  Undo2, HardDrive, Eye,
  Fingerprint, ShieldCheck,
  List, Radar, Radio, Loader2,
  Sparkles, Zap, Activity,
  Database, Terminal as TerminalIcon,
  Mic, Send, Power, ShieldAlert,
  ArrowLeft, Cloud, Thermometer,
  Wind, Gauge, MicOff, Volume2
} from 'lucide-react';
import VisualScanModule from './visual-scan';
import { sendTacticalCommand } from '@/app/actions';

type ModuleType = 'STRATEGIC_INTELLIGENCE' | 'SECURITY_MANAGEMENT' | 'RECONNAISSANCE' | 'VISUAL_SCAN' | 'COUNTERMEASURES' | 'DATA_PURGE' | 'AEGIS_IA' | 'SYSTEM_LOGS' | 'INFRASTRUCTURE';

interface AdvancedOpsProps {
  onBack: () => void;
  initialModule?: ModuleType;
}

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative ${isAccent ? 'border-[#f43f5e]' : 'border-[#00f2ff]/40'} border bg-black/40 backdrop-blur-md p-2 flex flex-col ${className} fui-corner-brackets overflow-hidden`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-[#020814] text-[6px] font-bold tracking-[0.2em] uppercase z-10 ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative">
      {children}
    </div>
  </div>
);

const ClearanceOverlay = ({ requiredLevel, currentLevel, children }: { requiredLevel: number, currentLevel: number, children: React.ReactNode }) => {
  const isLocked = currentLevel < requiredLevel;

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      <div className="w-full h-full blur-lg grayscale opacity-30 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-[#f43f5e]/20">
        <Lock className="w-8 h-8 text-[#f43f5e] mb-2 animate-pulse" />
        <span className="text-[8px] font-black text-[#f43f5e] tracking-[0.3em] uppercase text-center px-6">
          LEVEL_{requiredLevel}_REQUIRED
        </span>
      </div>
    </div>
  );
};

export default function AdvancedOpsScreen({ onBack, initialModule }: AdvancedOpsProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>(initialModule || 'STRATEGIC_INTELLIGENCE');
  const [currentClearance, setCurrentClearance] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (initialModule) {
      setActiveModule(initialModule);
    }
  }, [initialModule]);

  if (!isMounted) return null;

  const showSidebar = activeModule !== 'AEGIS_IA';

  const NavButton = ({ type, label, icon: Icon }: { type: ModuleType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveModule(type)}
      className={`relative w-full flex items-center gap-2 px-3 py-1.5 text-[7px] font-bold tracking-[0.15em] uppercase transition-all overflow-hidden group scan-hover-item ${
        activeModule === type 
          ? 'text-[#00f2ff] bg-[#00f2ff]/5' 
          : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/80'
      }`}
    >
      <Icon className={`w-3 h-3 ${activeModule === type ? 'text-[#00f2ff]' : 'text-[#00f2ff]/40'}`} />
      <span className="flex-1 text-left truncate">{label}</span>
      {activeModule === type && (
        <motion.div 
          layoutId="active-nav-indicator"
          className="absolute left-0 w-0.5 h-3/4 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
        />
      )}
    </button>
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-3 flex gap-4 font-mono relative box-border">
      <div className="scanline-effect opacity-5 pointer-events-none" />
      <div className="vignette" />

      {showSidebar && (
        <aside className="w-[160px] flex flex-col gap-3 z-20 h-full shrink-0">
          <DoubleBorderPanel className="flex-none py-2 px-3">
            <h1 className="text-[9px] font-black tracking-[0.3em] uppercase text-[#00f2ff] leading-none">AEGIS:MODULE</h1>
          </DoubleBorderPanel>

          <DoubleBorderPanel className="flex-1 p-0 flex flex-col">
            <nav className="flex-1 py-1 overflow-y-auto terminal-scroll">
              <NavButton type="STRATEGIC_INTELLIGENCE" label="STRATEGIC_INTEL" icon={Radar} />
              <NavButton type="SECURITY_MANAGEMENT" label="SECURITY_MGMT" icon={ShieldCheck} />
              <NavButton type="RECONNAISSANCE" label="RECON_GRID" icon={Globe} />
              <NavButton type="VISUAL_SCAN" label="VISUAL_SCAN" icon={Eye} />
              <NavButton type="COUNTERMEASURES" label="COUNTERMEASURES" icon={Shield} />
              <NavButton type="DATA_PURGE" label="DATA_PURGE" icon={Trash2} />
              <NavButton type="AEGIS_IA" label="AEGIS_IA" icon={Brain} />
              <NavButton type="INFRASTRUCTURE" label="INFRASTRUCTURE" icon={HardDrive} />
              <NavButton type="SYSTEM_LOGS" label="SYSTEM_LOGS" icon={List} />
            </nav>

            <div className="mt-auto border-t border-[#00f2ff]/10 p-2">
              <button 
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 py-1.5 text-[7px] font-black text-[#00f2ff] uppercase border border-[#00f2ff]/30 bg-[#00f2ff]/5 hover:bg-[#00f2ff]/10 transition-all tactic-clip"
              >
                <Undo2 className="w-3 h-3" />
                <span>RETURN_HUB</span>
              </button>
            </div>
          </DoubleBorderPanel>
        </aside>
      )}

      <main className="flex-1 flex flex-col gap-3 z-20 overflow-hidden h-full">
        <header className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            {!showSidebar && (
              <button 
                onClick={onBack}
                className="p-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-[10px] font-black tracking-widest uppercase text-[#00f2ff]">
                [{activeModule.replace('_', ' ')}]
              </h2>
              {showSidebar && (
                <div className="flex gap-3 text-[5px] uppercase tracking-widest opacity-40">
                  <span>Auth: OPERATOR_LEVEL_{currentClearance}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 flex items-center justify-center">
                <Shield className="w-3 h-3 animate-pulse" />
             </div>
          </div>
        </header>

        <section className="flex-1 min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full flex flex-col min-h-0"
            >
              {activeModule === 'STRATEGIC_INTELLIGENCE' && <StrategicIntelligenceModule />}
              {activeModule === 'SECURITY_MANAGEMENT' && <SecurityManagementModule currentClearance={currentClearance} onLevelChange={setCurrentClearance} />}
              {activeModule === 'RECONNAISSANCE' && <ReconModule />}
              {activeModule === 'VISUAL_SCAN' && <VisualScanModule />}
              {activeModule === 'COUNTERMEASURES' && (
                <ClearanceOverlay requiredLevel={4} currentLevel={currentClearance}>
                  <CountermeasuresModule />
                </ClearanceOverlay>
              )}
              {activeModule === 'DATA_PURGE' && (
                <ClearanceOverlay requiredLevel={5} currentLevel={currentClearance}>
                  <DataPurgeModule />
                </ClearanceOverlay>
              )}
              {activeModule === 'AEGIS_IA' && <AegisIAModule currentLevel={currentClearance} />}
              {activeModule === 'SYSTEM_LOGS' && <SystemLogsModule />}
              {activeModule === 'INFRASTRUCTURE' && <InfrastructureModule />}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="h-4 shrink-0 bg-black/80 border border-[#00f2ff]/20 overflow-hidden flex items-center">
          <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center">
            <motion.div 
              animate={{ x: [0, -500] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-12 text-[5px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]"
            >
              <span>PROTOCOL_7B_ACTIVE... STATUS: SECURE</span>
              <span>SCANNING_SECTOR_9... NO_INTRUSIONS_DETECTION</span>
              <span>ENCRYPTION_LAYER_8_REINFORCED</span>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- MÓDULOS ---

function AegisIAModule({ currentLevel }: { currentLevel: number }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { role: 'ai', text: 'AEGIS_TACTICAL_AI_CONNECTED. STANDING BY FOR OPERATOR COMMANDS.', timestamp: '00:00:00' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 45, load: 22, sync: 99.9 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- CONFIGURACIÓN DE VOZ (TTS) ---
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Detener cualquier audio previo
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Configura el idioma de la IA
      utterance.rate = 1.1;     // Velocidad ligeramente más rápida para toque tech
      utterance.pitch = 0.8;    // Tono más bajo para sonar más serio/militar
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- RECONOCIMIENTO DE VOZ (STT) ---
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript.toUpperCase());
        // Enviar automáticamente si se desea
        // handleSend(transcript.toUpperCase()); 
      };
      
      recognition.start();
    } else {
      alert("Tu navegador no soporta reconocimiento de voz.");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(10 + Math.random() * 20),
        ram: Math.floor(40 + Math.random() * 10),
        load: Math.floor(20 + Math.random() * 15),
        sync: 99.8 + Math.random() * 0.2
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (forcedInput?: string) => {
    const messageToSend = forcedInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg = { 
      role: 'operator', 
      text: messageToSend.toUpperCase(),
      timestamp: new Date().toLocaleTimeString().slice(0, 8)
    };
    
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      /**
       * --- CONEXIÓN A BACKEND ---
       * Aquí es donde tu frontend se comunica con el servidor.
       * Actualmente usa una Server Action de Next.js (sendTacticalCommand).
       * 
       * Puedes reemplazar 'sendTacticalCommand' por:
       * 1. Una llamada fetch a tu API: fetch('/api/tactical', { method: 'POST', body: JSON.stringify(...) })
       * 2. Un socket: socket.emit('command', userMsg)
       * 3. Conexión directa a base de datos (si usas Firestore/Firebase SDK)
       */
      const result = await sendTacticalCommand({
        message: userMsg.text,
        systemStatus: { 
          threatLevel: "ALPHA_ZONE", 
          activeNodes: 14, 
          throughput: `${metrics.load} Mb/s` 
        }
      });

      const aiResponse = { 
        role: 'ai', 
        text: result.response,
        timestamp: new Date().toLocaleTimeString().slice(0, 8)
      };

      setHistory(prev => [...prev, aiResponse]);
      
      // La IA habla después de recibir la respuesta del backend
      speak(aiResponse.text);

    } catch (error) {
      console.error("Critical System Failure:", error);
      const errorMsg = "ERROR_CRÍTICO: FALLO EN EL NÚCLEO DE PROCESAMIENTO.";
      setHistory(prev => [...prev, { role: 'ai', text: errorMsg, timestamp: 'ERROR' }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full gap-4 min-h-0 overflow-hidden relative">
      {/* HUD CIRCULAR CENTRAL (STARK STYLE) */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
        
        {/* ELEMENTOS PERIFÉRICOS (TOP LEFT) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[8px] font-black text-[#00f2ff]">
            <Cpu className="w-3 h-3" />
            <span>CPU: {metrics.cpu}%</span>
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black text-[#00f2ff]">
            <Database className="w-3 h-3" />
            <span>RAM: {metrics.ram}%</span>
          </div>
          <div className="mt-4 flex flex-col gap-1">
             <span className="text-[6px] opacity-40 uppercase tracking-widest">Neural_Sync</span>
             <div className="w-24 h-1 bg-[#00f2ff]/10">
                <motion.div animate={{ width: `${metrics.sync}%` }} className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
             </div>
          </div>
        </div>

        {/* ELEMENTOS PERIFÉRICOS (TOP RIGHT - WEATHER/SECTOR) */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 text-[#00f2ff]/80">
          <div className="text-[12px] font-black tracking-tighter">13°C</div>
          <div className="flex items-center gap-2 text-[6px] uppercase font-bold tracking-widest">
            <Cloud className="w-3 h-3" />
            <span>Clear_Sky</span>
          </div>
          <div className="text-[5px] opacity-40 uppercase tracking-widest mt-2">Sector_9_Russia</div>
          <div className="flex flex-col gap-1 mt-4">
            <div className="flex justify-between w-24 text-[5px] uppercase"><span>Humidity</span><span>77%</span></div>
            <div className="flex justify-between w-24 text-[5px] uppercase"><span>Visibility</span><span>10km</span></div>
          </div>
        </div>

        {/* NÚCLEO CENTRAL ANIMADO */}
        <div className="relative w-[320px] h-[320px] flex items-center justify-center pointer-events-none">
          {/* Anillos SVG */}
          <svg className="absolute w-full h-full animate-spin-slow opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="5,10" />
          </svg>
          <svg className="absolute w-[80%] h-[80%] animate-spin-reverse-slow opacity-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#00f2ff" strokeWidth="1" strokeDasharray="30,150" />
          </svg>
          <svg className="absolute w-[60%] h-[60%] animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="1,2" />
          </svg>
          
          {/* Centro del núcleo */}
          <div className="relative w-32 h-32 rounded-full border border-[#00f2ff]/40 bg-[#00f2ff]/5 flex flex-col items-center justify-center backdrop-blur-sm">
             <Brain className={`w-10 h-10 text-[#00f2ff] ${isLoading || isListening ? 'animate-pulse' : ''}`} />
             <div className="mt-2 text-[7px] font-black text-[#00f2ff] tracking-[0.3em] uppercase">
               {isListening ? 'LISTENING...' : isLoading ? 'THINKING...' : 'Core_Alpha'}
             </div>
          </div>

          {/* Brackets flotantes */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 border-[4px] border-[#00f2ff]/10 rounded-full border-dashed"
          />
        </div>

        {/* MÉTRICAS DE CARGA (BOTTOM) */}
        <div className="absolute bottom-12 w-full px-24 flex justify-between items-end">
           <div className="flex flex-col gap-1">
              <span className="text-[6px] opacity-40 uppercase tracking-widest">Active_Taskbar</span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 border border-[#00f2ff] bg-[#00f2ff]/20" />
                 <div className="w-2 h-2 border border-[#00f2ff] bg-[#00f2ff]/20" />
                 <div className="w-2 h-2 border border-[#00f2ff] bg-transparent" />
              </div>
           </div>
           <div className="text-right">
              <span className="text-[12px] font-black tracking-tighter text-[#00f2ff]">{metrics.load} Gb/s</span>
              <span className="text-[5px] opacity-40 uppercase block">Data_Throughput</span>
           </div>
        </div>
      </div>

      {/* CONSOLA DE COMANDOS (DERECHA - DENSITY) */}
      <div className="w-[300px] flex flex-col gap-3 h-full min-h-0 bg-black/40 border-l border-[#00f2ff]/10 z-10">
        <div className="p-3 border-b border-[#00f2ff]/10 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <TerminalIcon className="w-4 h-4 text-[#00f2ff]" />
             <span className="text-[8px] font-black tracking-widest uppercase">Comm_Interface</span>
           </div>
           {/* Indicador visual de voz activa */}
           {isListening && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />}
        </div>

        <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
           <AnimatePresence mode="popLayout">
              {history.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'ai' ? -5 : 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[90%] p-2 border ${
                    msg.role === 'ai' 
                    ? 'border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff]' 
                    : 'border-[#f43f5e]/30 bg-[#f43f5e]/5 text-[#f43f5e]'
                  } fui-corner-brackets relative`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[5px] font-black uppercase tracking-widest opacity-40">
                        {msg.role === 'ai' ? 'AEGIS_SYSTEM' : 'OPERATOR'}
                      </span>
                      {msg.role === 'ai' && (
                        <Volume2 className="w-2.5 h-2.5 opacity-40 cursor-pointer hover:opacity-100" onClick={() => speak(msg.text)} />
                      )}
                    </div>
                    <p className="text-[8px] font-mono uppercase leading-tight tracking-tight">
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex items-center gap-2 text-[#00f2ff]/40 p-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-[7px] font-black tracking-widest animate-pulse">PROCESSING...</span>
              </div>
            )}
            <div ref={chatEndRef} />
        </div>

        <div className="p-3 bg-black/60 border-t border-[#00f2ff]/10">
           <div className="flex gap-2">
              {/* Botón de Micrófono */}
              <button 
                onClick={startListening}
                disabled={isLoading}
                className={`w-8 h-8 flex items-center justify-center border ${
                  isListening 
                  ? 'border-red-500 bg-red-500/20 text-red-500 animate-pulse' 
                  : 'border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] hover:bg-[#00f2ff]/20'
                } transition-all`}
                title="Dictar Comando (VOZ)"
              >
                {isListening ? <Mic className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
              </button>

              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "ESCUCHANDO..." : "INPUT_COMMAND..."} 
                disabled={isLoading}
                className="flex-1 bg-[#00f2ff]/5 border border-[#00f2ff]/20 px-3 py-1.5 text-[8px] outline-none text-[#00f2ff] placeholder:text-[#00f2ff]/10 uppercase" 
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center bg-[#00f2ff] text-black hover:bg-[#00f2ff]/80 transition-all"
              >
                <Send className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function SecurityManagementModule({ currentClearance, onLevelChange }: { currentClearance: number, onLevelChange: (l: number) => void }) {
  return (
    <div className="flex flex-col h-full gap-3 min-h-0 overflow-hidden">
      <div className="flex-[2] grid grid-cols-12 gap-3 min-h-0">
        <DoubleBorderPanel title="[ CLEARANCE ]" className="col-span-5 flex flex-col items-center justify-center p-2">
            <span className="text-2xl font-black text-[#00f2ff]">{currentClearance}</span>
            <div className="mt-2 flex gap-1">
              {[1,2,3,4,5].map(l => (
                <button key={l} onClick={() => onLevelChange(l)} className={`w-5 h-5 border ${currentClearance === l ? 'bg-[#00f2ff] text-black' : 'bg-black text-[#00f2ff]'} text-[7px] font-bold`}>{l}</button>
              ))}
            </div>
        </DoubleBorderPanel>
        <DoubleBorderPanel title="[ BIOMETRIC_FEED ]" className="col-span-7 bg-black/40">
           <div className="w-full h-full bg-black/80 flex items-center justify-center border border-[#00f2ff]/10">
              <Fingerprint className="w-8 h-8 text-[#00f2ff]/20" />
           </div>
        </DoubleBorderPanel>
      </div>

      <DoubleBorderPanel title="[ SECURITY_LOGS ]" className="flex-[3] bg-black/60" isAccent>
          <div className="flex-1 overflow-y-auto terminal-scroll p-2 space-y-1 font-mono text-[6px]">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="opacity-40 truncate">[{10+i}:00:00] SYSTEM_CHECK_SECTOR_{i}_OK</div>
            ))}
          </div>
      </DoubleBorderPanel>
    </div>
  );
}

function StrategicIntelligenceModule() {
  return (
    <div className="flex flex-col h-full gap-3 min-h-0 overflow-hidden">
      <div className="grid grid-cols-12 gap-3 flex-[3] min-h-0">
        <DoubleBorderPanel title="[ GEO_TACTICAL ]" className="col-span-8 bg-[#000508]/60">
           <div className="w-full h-full flex items-center justify-center opacity-20">
              <Globe className="w-12 h-12" />
           </div>
        </DoubleBorderPanel>
        <div className="col-span-4 flex flex-col gap-2">
          <DoubleBorderPanel title="[ KERNEL ]" className="flex-1 flex flex-col items-center justify-center">
             <span className="text-xl font-black">98%</span>
             <span className="text-[5px] opacity-40 uppercase">STABILITY</span>
          </DoubleBorderPanel>
          <DoubleBorderPanel title="[ OFFENSIVE ]" className="flex-1 flex flex-col gap-2 p-2">
             <div className="w-full h-1 bg-[#00f2ff]/10 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-[#00f2ff]" />
             </div>
             <span className="text-[5px] opacity-40 uppercase">SYNCING...</span>
          </DoubleBorderPanel>
        </div>
      </div>
      <DoubleBorderPanel title="[ SECTOR_STREAM ]" className="flex-[2] bg-black/60">
         <div className="flex gap-2 p-2 overflow-x-auto terminal-scroll h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-20 h-full border border-[#00f2ff]/10 flex-shrink-0 bg-[#00f2ff]/5 flex items-center justify-center">
                 <Cpu className="w-3 h-3 opacity-20" />
              </div>
            ))}
         </div>
      </DoubleBorderPanel>
    </div>
  );
}

function SystemLogsModule() {
  return (
    <DoubleBorderPanel title="TACTICAL_AUDIT" className="h-full">
      <div className="flex-1 overflow-y-auto terminal-scroll p-2 font-mono text-[6px] space-y-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="opacity-50 truncate">[{new Date().toISOString().slice(11, 19)}] NODE_SYNC_OK_0x{i}</div>
        ))}
      </div>
    </DoubleBorderPanel>
  );
}

function ReconModule() {
  return (
    <div className="flex flex-col h-full gap-2">
       <DoubleBorderPanel title="RECON_MAP" className="flex-[3] flex items-center justify-center bg-black/40">
          <Radar className="w-12 h-12 text-[#00f2ff]/10 animate-spin-slow" />
       </DoubleBorderPanel>
       <DoubleBorderPanel title="DATA_STREAM" className="flex-[2] overflow-y-auto terminal-scroll p-1 text-[5px] opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>PACKET_NODE_{i}_0x{Math.random().toString(16).slice(2,6).toUpperCase()}</div>
          ))}
       </DoubleBorderPanel>
    </div>
  );
}

function CountermeasuresModule() {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
       <DoubleBorderPanel title="INJECTION" className="flex flex-col items-center justify-center p-4">
          <button className="w-full p-2 border border-[#00f2ff]/40 bg-[#00f2ff]/10 text-[7px] font-black uppercase tracking-widest hover:bg-[#00f2ff]/20 transition-all">Start_Payload</button>
       </DoubleBorderPanel>
       <DoubleBorderPanel title="SIGNAL_JAM" className="flex flex-col items-center justify-center p-4">
          <Radio className="w-8 h-8 text-[#00f2ff]/20 mb-2" />
          <span className="text-[6px] opacity-40">READY_FOR_JAMMING</span>
       </DoubleBorderPanel>
    </div>
  );
}

function DataPurgeModule() {
  return (
    <DoubleBorderPanel title="PURGE_SYSTEM" className="h-full flex flex-col items-center justify-center gap-4" isAccent>
       <span className="text-lg font-black text-[#f43f5e] animate-pulse uppercase tracking-[0.2em]">!! STANDBY_PURGE !!</span>
       <button className="px-6 py-2 border border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e] text-[8px] font-black uppercase tracking-[0.3em] hover:bg-[#f43f5e]/20">Initialize</button>
    </DoubleBorderPanel>
  );
}

function InfrastructureModule() {
  return (
    <div className="grid grid-cols-12 gap-2 h-full">
      <DoubleBorderPanel title="CPU_LOAD" className="col-span-4 flex items-center justify-center">
         <span className="text-xl font-black">42%</span>
      </DoubleBorderPanel>
      <DoubleBorderPanel title="VAULT" className="col-span-8 overflow-y-auto p-1.5 space-y-1">
         {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="text-[6px] border border-[#00f2ff]/10 p-1 flex justify-between">
               <span className="truncate">FILE_0{i}.BIN</span>
               <Lock className="w-2 h-2 opacity-40 shrink-0" />
            </div>
         ))}
      </DoubleBorderPanel>
    </div>
  );
}
