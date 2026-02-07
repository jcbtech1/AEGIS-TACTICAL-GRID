
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cpu, Terminal, Fingerprint, AlertCircle } from 'lucide-react';

interface AegisLoginScreenProps {
  onLogin: () => void;
}

export default function AegisLoginScreen({ onLogin }: AegisLoginScreenProps) {
  const [id, setId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "[SYS] KERNEL_INIT_OK",
      "[SEC] ENCRYPTION_LAYER_ACTIVE",
      "[NET] ESTABLISHING_SECURE_TUNNEL...",
      "[AUTH] WAITING_FOR_CREDENTIALS"
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !accessCode) return;

    setStatus("scanning");
    
    // Simulación de validación táctica
    setTimeout(() => {
      if (accessCode === "AEGIS-2024" || accessCode === "admin") {
        setStatus("granted");
        setTimeout(onLogin, 1200);
      } else {
        setStatus("denied");
        setTimeout(() => setStatus("idle"), 2000);
      }
    }, 2000);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-[#020617] overflow-hidden dot-matrix font-mono">
      <div className="scanline-effect opacity-20" />
      <div className="vignette" />

      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Shield className="w-[600px] h-[600px] text-[#00f2ff] animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-[320px] p-6 border border-[#00f2ff]/30 bg-[#050b1a]/90 backdrop-blur-2xl fui-corner-brackets shadow-[0_0_50px_rgba(0,242,255,0.1)]"
      >
        <div className="fui-corner-brackets-inner" />
        
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-[#00f2ff]/40 rounded-full mb-4 bg-[#00f2ff]/5">
            <Cpu className="w-6 h-6 text-[#00f2ff]" />
          </div>
          <h1 className="text-sm font-black tracking-[0.4em] text-[#00f2ff] uppercase mb-1">Aegis Tactical</h1>
          <p className="text-[8px] text-[#00f2ff]/40 tracking-widest uppercase">Grid Control Terminal // v2.0</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[7px] text-[#00f2ff]/60 uppercase tracking-widest ml-1">Operator_ID</label>
            <div className="relative">
              <Terminal className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="USER_ALPHA_01"
                className="w-full bg-black/40 border border-[#00f2ff]/20 rounded-none px-8 py-2 text-[10px] text-[#00f2ff] focus:outline-none focus:border-[#00f2ff]/60 transition-colors placeholder:text-[#00f2ff]/10"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] text-[#00f2ff]/60 uppercase tracking-widest ml-1">Access_Code</label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
              <input 
                type="password" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-[#00f2ff]/20 rounded-none px-8 py-2 text-[10px] text-[#00f2ff] focus:outline-none focus:border-[#00f2ff]/60 transition-colors placeholder:text-[#00f2ff]/10"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={status === "scanning" || status === "granted"}
            className={`w-full py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] border transition-all relative overflow-hidden group ${
              status === "denied" ? "border-red-500 bg-red-500/10 text-red-500" :
              status === "granted" ? "border-green-500 bg-green-500/10 text-green-500" :
              "border-[#00f2ff]/30 bg-[#00f2ff]/10 text-[#00f2ff] hover:bg-[#00f2ff]/20"
            }`}
          >
            {status === "idle" && "Initiate_Sequence"}
            {status === "scanning" && (
              <span className="flex items-center justify-center gap-2">
                <Fingerprint className="w-3 h-3 animate-pulse" />
                Authenticating...
              </span>
            )}
            {status === "denied" && "Access_Denied"}
            {status === "granted" && "Access_Granted"}
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </form>

        <footer className="mt-8 pt-4 border-t border-[#00f2ff]/10">
          <div className="h-16 overflow-y-auto terminal-scroll space-y-1">
            {bootLogs.map((log, i) => (
              <div key={i} className="text-[7px] text-[#00f2ff]/40">
                <span className="text-[#00f2ff]/20 mr-1">{">"}</span> {log}
              </div>
            ))}
            {status === "denied" && (
              <div className="text-[7px] text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-2 h-2" />
                ERROR_AUTH_FAIL: INVALID_SECURITY_TOKEN
              </div>
            )}
            {status === "scanning" && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-[1px] bg-[#00f2ff] shadow-[0_0_5px_#00f2ff]" 
              />
            )}
          </div>
        </footer>
      </motion.div>

      {/* ELEMENTOS DECORATIVOS EXTREMOS */}
      <div className="absolute top-4 left-4 text-[6px] text-[#00f2ff]/20 uppercase tracking-[0.5em]">
        System_Guard_Active // No_Unauthorized_Access
      </div>
      <div className="absolute bottom-4 right-4 text-[6px] text-[#00f2ff]/20 uppercase tracking-[0.5em]">
        Encryption: MIL_SPEC_AES_256
      </div>
    </div>
  );
}
