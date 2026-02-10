'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Shield, Undo2, Search, Filter, Circle, MoreVertical, BadgeCheck } from 'lucide-react';

interface Operator {
  id: string;
  name: string;
  role: string;
  clearance: number;
  status: 'ACTIVE' | 'INACTIVE' | 'STANDBY';
  lastActive: string;
}

const mockOperators: Operator[] = [
  { id: 'OP-001', name: 'ADMIN_PRIME', role: 'System Architect', clearance: 5, status: 'ACTIVE', lastActive: 'NOW' },
  { id: 'OP-042', name: 'SEC_ALFA_09', role: 'Network Sentinel', clearance: 3, status: 'ACTIVE', lastActive: '12m ago' },
  { id: 'OP-117', name: 'GHOST_RECON', role: 'Infiltration Specialist', clearance: 4, status: 'STANDBY', lastActive: '2h ago' },
  { id: 'OP-088', name: 'CYBER_VANGUARD', role: 'Threat Analyst', clearance: 3, status: 'ACTIVE', lastActive: '5m ago' },
  { id: 'OP-203', name: 'NEURAL_LINK', role: 'AI Integration', clearance: 4, status: 'INACTIVE', lastActive: '1d ago' },
  { id: 'OP-512', name: 'LOG_MASTER', role: 'Data Auditor', clearance: 2, status: 'ACTIVE', lastActive: '1h ago' },
];

const DoubleBorderPanel = ({ children, title, className = "" }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={`relative border border-[#00f2ff]/30 bg-[#050b1a]/80 backdrop-blur-md p-4 flex flex-col fui-corner-brackets overflow-hidden ${className}`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className="absolute -top-2 left-4 px-2 bg-[#020814] text-[8px] font-bold tracking-[0.3em] uppercase z-10 text-[#00f2ff] border border-[#00f2ff]/30">
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative z-10">
      {children}
    </div>
  </div>
);

export default function AegisUsersScreen({ onBack }: { onBack: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOperators = mockOperators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-6 flex flex-col gap-6 font-mono relative">
      <div className="scanline-effect opacity-10 pointer-events-none" />
      <div className="vignette" />
      <div className="dot-matrix absolute inset-0 opacity-20 pointer-events-none" />

      <header className="flex justify-between items-center z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 border border-[#00f2ff]/40 bg-[#00f2ff]/10">
            <Users className="w-8 h-8 text-[#00f2ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-[0.4em] uppercase text-[#00f2ff] glitch-text">Personnel_Registry</h1>
            <span className="text-[8px] opacity-40 uppercase tracking-widest font-bold">Aegis_Security_Directorate // Auth_Level_5</span>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="flex items-center gap-3 px-6 py-3 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
        >
          <Undo2 className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return_to_Hub</span>
        </button>
      </header>

      <main className="flex-1 min-h-0 z-20 flex flex-col gap-6">
        <div className="flex gap-4 shrink-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00f2ff]/40" />
            <input 
              type="text" 
              placeholder="SEARCH_OPERATOR_BY_ID_OR_NAME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-[#00f2ff]/20 px-10 py-3 text-[10px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase placeholder:text-[#00f2ff]/10"
            />
          </div>
          <button className="px-6 py-3 border border-[#00f2ff]/20 bg-black/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#00f2ff]/10 transition-all">
            <Filter className="w-4 h-4" />
            Filter_Status
          </button>
        </div>

        <DoubleBorderPanel title="[ OPERATOR_DATA_STREAM ]" className="flex-1">
          <div className="flex-1 overflow-y-auto terminal-scroll pr-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#00f2ff]/10 text-[7px] text-[#00f2ff]/40 uppercase tracking-[0.3em] font-bold">
                  <th className="py-4 px-4">Operator_Identity</th>
                  <th className="py-4 px-4">Role_Designation</th>
                  <th className="py-4 px-4">Clearance_Tier</th>
                  <th className="py-4 px-4">Current_Status</th>
                  <th className="py-4 px-4">Activity_Log</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOperators.map((op, i) => (
                  <motion.tr 
                    key={op.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group border-b border-[#00f2ff]/5 hover:bg-[#00f2ff]/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-[#00f2ff]/20 bg-[#00f2ff]/5 flex items-center justify-center relative">
                          <User className="w-5 h-5 text-[#00f2ff]/40 group-hover:text-[#00f2ff] transition-colors" />
                          {op.clearance === 5 && <BadgeCheck className="absolute -top-1 -right-1 w-4 h-4 text-[#00f2ff] fill-black" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-white group-hover:text-[#00f2ff] transition-colors">{op.name}</span>
                          <span className="text-[7px] opacity-40 font-mono">ID: {op.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[9px] font-bold uppercase tracking-tighter opacity-70">{op.role}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1 items-center">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-3 h-1.5 ${idx < op.clearance ? 'bg-[#00f2ff] shadow-[0_0_5px_rgba(0,242,255,0.5)]' : 'bg-[#00f2ff]/10'}`} 
                          />
                        ))}
                        <span className="ml-2 text-[9px] font-black text-[#00f2ff]">LVL_{op.clearance}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Circle className={`w-1.5 h-1.5 fill-current ${
                          op.status === 'ACTIVE' ? 'text-emerald-400 animate-pulse' : 
                          op.status === 'STANDBY' ? 'text-amber-400' : 'text-red-500'
                        }`} />
                        <span className={`text-[8px] font-black tracking-widest ${
                          op.status === 'ACTIVE' ? 'text-emerald-400' : 
                          op.status === 'STANDBY' ? 'text-amber-400' : 'text-red-500'
                        }`}>
                          {op.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[9px] font-mono opacity-40 group-hover:opacity-100 transition-opacity uppercase">{op.lastActive}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 hover:bg-[#00f2ff]/10 transition-colors">
                        <MoreVertical className="w-4 h-4 opacity-40" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#00f2ff]/10 flex justify-between items-center text-[7px] uppercase tracking-widest opacity-40">
             <span>Displaying {filteredOperators.length} active operator profiles</span>
             <span>Security_Encryption: ACTIVE // RSA_4096</span>
          </div>
        </DoubleBorderPanel>
      </main>

      <footer className="h-8 shrink-0 border border-[#00f2ff]/20 bg-black/40 flex items-center px-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-scan-slow">
           <span className="text-[7px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]">ACCESS_CONTROL_LIST_SYNCHRONIZED...</span>
           <span className="text-[7px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]">MONITORING_PERSONNEL_TRAFFIC...</span>
           <span className="text-[7px] font-bold text-[#00f2ff]/60 uppercase tracking-[0.2em]">ENFORCING_CLEARANCE_PROTOCOL_7B...</span>
        </div>
      </footer>
    </div>
  );
}
