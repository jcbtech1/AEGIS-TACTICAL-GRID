'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, User, Shield, Undo2, Search, 
  Filter, Circle, MoreVertical, BadgeCheck,
  UserPlus, Trash2, Edit3, Eye, ArrowLeft,
  Calendar, MapPin, HardDrive, Terminal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Operator {
  id: string;
  name: string;
  role: string;
  clearance: number;
  status: 'ACTIVE' | 'INACTIVE' | 'STANDBY';
  lastActive: string;
  sector: string;
  joinDate: string;
  deviceId: string;
}

const mockOperators: Operator[] = [
  { id: 'OP-001', name: 'ADMIN_PRIME', role: 'System Architect', clearance: 5, status: 'ACTIVE', lastActive: 'NOW', sector: 'CENTRAL_COMMAND', joinDate: '2022-05-12', deviceId: 'AEGIS-V2-01' },
  { id: 'OP-042', name: 'SEC_ALFA_09', role: 'Network Sentinel', clearance: 3, status: 'ACTIVE', lastActive: '12m ago', sector: 'NETWORK_PERIMETER', joinDate: '2023-01-20', deviceId: 'SENTINEL-X9' },
  { id: 'OP-117', name: 'GHOST_RECON', role: 'Infiltration Specialist', clearance: 4, status: 'STANDBY', lastActive: '2h ago', sector: 'STEALTH_OPS', joinDate: '2021-11-05', deviceId: 'VOID-WALKER' },
  { id: 'OP-088', name: 'CYBER_VANGUARD', role: 'Threat Analyst', clearance: 3, status: 'ACTIVE', lastActive: '5m ago', sector: 'THREAT_DETECTION', joinDate: '2023-08-14', deviceId: 'ANALYST-B4' },
  { id: 'OP-203', name: 'NEURAL_LINK', role: 'AI Integration', clearance: 4, status: 'INACTIVE', lastActive: '1d ago', sector: 'AI_LABS', joinDate: '2024-02-10', deviceId: 'NEURAL-BRIDGE' },
  { id: 'OP-512', name: 'LOG_MASTER', role: 'Data Auditor', clearance: 2, status: 'ACTIVE', lastActive: '1h ago', sector: 'ARCHIVE_VAULT', joinDate: '2022-12-01', deviceId: 'AUDIT-UNIT' },
];

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative border ${isAccent ? 'border-[#f43f5e]/40' : 'border-[#00f2ff]/30'} bg-[#050b1a]/80 backdrop-blur-md p-4 flex flex-col fui-corner-brackets overflow-hidden ${className}`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-[#020814] text-[8px] font-bold tracking-[0.3em] uppercase z-10 ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative z-10">
      {children}
    </div>
  </div>
);

export default function AegisUsersScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'list' | 'details' | 'create'>('list');
  const [selectedOp, setSelectedOp] = useState<Operator | null>(null);
  const [operators, setOperators] = useState<Operator[]>(mockOperators);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setOperators(prev => prev.filter(op => op.id !== id));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newOp: Operator = {
      id: `OP-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      clearance: Number(formData.get('clearance')),
      status: 'ACTIVE',
      lastActive: 'JUST_NOW',
      sector: formData.get('sector') as string,
      joinDate: new Date().toISOString().split('T')[0],
      deviceId: `DEV-${Math.random().toString(36).substring(7).toUpperCase()}`
    };
    setOperators(prev => [newOp, ...prev]);
    setView('list');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-4 flex flex-col gap-4 font-mono relative">
      <div className="scanline-effect opacity-10 pointer-events-none" />
      <div className="vignette" />
      <div className="dot-matrix absolute inset-0 opacity-10 pointer-events-none" />

      <header className="flex justify-between items-center z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-[#00f2ff]/40 bg-[#00f2ff]/10">
            <Users className="w-6 h-6 text-[#00f2ff]" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.4em] uppercase text-[#00f2ff] glitch-text leading-none">Personnel_Directorate</h1>
            <span className="text-[6px] opacity-40 uppercase tracking-widest font-bold mt-1 block">Aegis_Secure_Registry // AUTH_REQUIRED</span>
          </div>
        </div>

        <div className="flex gap-2">
          {view === 'list' ? (
            <button 
              onClick={() => setView('create')}
              className="flex items-center gap-2 px-4 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
            >
              <UserPlus className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Register_New</span>
            </button>
          ) : (
            <button 
              onClick={() => setView('list')}
              className="flex items-center gap-2 px-4 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>Back_to_List</span>
            </button>
          )}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[8px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
          >
            <Undo2 className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span>Return_Hub</span>
          </button>
        </div>
      </header>

      <main className="flex-1 min-h-0 z-20 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="h-full flex flex-col gap-4"
            >
              <div className="flex gap-4 shrink-0">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#00f2ff]/40" />
                  <input 
                    type="text" 
                    placeholder="SEARCH_OPERATOR_BY_ID_OR_NAME..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/40 border border-[#00f2ff]/20 px-10 py-2 text-[9px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase placeholder:text-[#00f2ff]/10"
                  />
                </div>
              </div>

              <DoubleBorderPanel title="[ OPERATOR_DATA_STREAM ]" className="flex-1">
                <div className="flex-1 overflow-y-auto terminal-scroll pr-2">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#00f2ff]/10 text-[6px] text-[#00f2ff]/40 uppercase tracking-[0.3em] font-bold">
                        <th className="py-2 px-3">Identity</th>
                        <th className="py-2 px-3">Role</th>
                        <th className="py-2 px-3">Clearance</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOperators.map((op, i) => (
                        <motion.tr 
                          key={op.id}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                          className="group border-b border-[#00f2ff]/5 hover:bg-[#00f2ff]/5 transition-colors"
                        >
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 border border-[#00f2ff]/20 bg-[#00f2ff]/5 flex items-center justify-center relative">
                                <User className="w-4 h-4 text-[#00f2ff]/40 group-hover:text-[#00f2ff]" />
                                {op.clearance === 5 && <BadgeCheck className="absolute -top-1 -right-1 w-3 h-3 text-[#00f2ff] fill-black" />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white group-hover:text-[#00f2ff] transition-colors">{op.name}</span>
                                <span className="text-[6px] opacity-40 font-mono">{op.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <span className="text-[8px] font-bold uppercase opacity-70">{op.role}</span>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex gap-0.5 items-center">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <div key={idx} className={`w-2 h-1 ${idx < op.clearance ? 'bg-[#00f2ff] shadow-[0_0_5px_#00f2ff]' : 'bg-[#00f2ff]/10'}`} />
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-1.5">
                              <Circle className={`w-1 h-1 fill-current ${op.status === 'ACTIVE' ? 'text-emerald-400 animate-pulse' : 'text-red-500'}`} />
                              <span className={`text-[7px] font-black ${op.status === 'ACTIVE' ? 'text-emerald-400' : 'text-red-500'}`}>{op.status}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1 hover:bg-[#00f2ff]/20 transition-all rounded outline-none">
                                  <MoreVertical className="w-3 h-3 opacity-40" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#050b1a] border-[#00f2ff]/50 rounded-none tactic-clip p-1 min-w-[120px]">
                                <DropdownMenuItem 
                                  onClick={() => { setSelectedOp(op); setView('details'); }}
                                  className="text-[7px] font-bold uppercase tracking-widest text-[#00f2ff] focus:bg-[#00f2ff]/10 flex gap-2"
                                >
                                  <Eye className="w-3 h-3" /> Full_Record
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[7px] font-bold uppercase tracking-widest text-[#00f2ff] focus:bg-[#00f2ff]/10 flex gap-2">
                                  <Edit3 className="w-3 h-3" /> Edit_Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(op.id)}
                                  className="text-[7px] font-bold uppercase tracking-widest text-red-500 focus:bg-red-500/10 flex gap-2"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete_Entry
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DoubleBorderPanel>
            </motion.div>
          )}

          {view === 'details' && selectedOp && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              className="h-full grid grid-cols-12 gap-4 overflow-hidden"
            >
              <div className="col-span-4 flex flex-col gap-4">
                <DoubleBorderPanel title="[ BIOMETRIC_IDENT ]" className="flex-none items-center py-6">
                  <div className="w-24 h-24 border border-[#00f2ff]/40 bg-[#00f2ff]/5 p-2 relative group overflow-hidden">
                    <User className="w-full h-full text-[#00f2ff]/20" />
                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                  </div>
                  <h2 className="mt-4 text-sm font-black text-white tracking-[0.2em]">{selectedOp.name}</h2>
                  <span className="text-[8px] opacity-40 font-mono">UUID: {selectedOp.id}</span>
                </DoubleBorderPanel>

                <DoubleBorderPanel title="[ SECURITY_STATUS ]" className="flex-1">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40">CLEARANCE_TIER</span>
                      <span className="text-[9px] font-black">LEVEL_{selectedOp.clearance}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40">OPERATIONAL_STATE</span>
                      <span className="text-[9px] font-black text-emerald-400">{selectedOp.status}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40">ASSIGNED_SECTOR</span>
                      <span className="text-[9px] font-black">{selectedOp.sector}</span>
                    </div>
                  </div>
                </DoubleBorderPanel>
              </div>

              <div className="col-span-8 flex flex-col gap-4">
                <DoubleBorderPanel title="[ EXTENDED_DOSSIER ]" className="flex-1">
                  <div className="grid grid-cols-2 gap-6 p-2">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-[#00f2ff]/40" />
                        <div className="flex flex-col">
                          <span className="text-[6px] opacity-30 uppercase">Induction_Date</span>
                          <span className="text-[9px] font-bold">{selectedOp.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#00f2ff]/40" />
                        <div className="flex flex-col">
                          <span className="text-[6px] opacity-30 uppercase">Main_Base_Access</span>
                          <span className="text-[9px] font-bold">{selectedOp.sector} GRID_NODE</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <HardDrive className="w-4 h-4 text-[#00f2ff]/40" />
                        <div className="flex flex-col">
                          <span className="text-[6px] opacity-30 uppercase">Authorized_Device</span>
                          <span className="text-[9px] font-bold">{selectedOp.deviceId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-l border-[#00f2ff]/10 pl-6">
                      <span className="text-[6px] opacity-30 uppercase flex items-center gap-1">
                        <Terminal className="w-2.5 h-2.5" /> Recent_System_Logs
                      </span>
                      <div className="text-[7px] space-y-2 opacity-60 font-mono">
                        <div>[2h ago] SYSTEM_LOGIN_GRANTED_0x884</div>
                        <div>[5h ago] KERNEL_PARAMETER_ACCESS</div>
                        <div>[12h ago] ENCRYPTED_STREAM_STARTED</div>
                        <div>[1d ago] SECURITY_PROTOCOL_VERIFIED</div>
                      </div>
                    </div>
                  </div>
                </DoubleBorderPanel>

                <div className="grid grid-cols-2 gap-4 h-24">
                   <DoubleBorderPanel title="VAULT_ACCESS" className="flex items-center justify-center">
                      <button className="text-[8px] font-black border border-[#00f2ff]/30 px-4 py-1 hover:bg-[#00f2ff]/10">OPEN_ARCHIVE</button>
                   </DoubleBorderPanel>
                   <DoubleBorderPanel title="COMM_LINK" className="flex items-center justify-center">
                      <button className="text-[8px] font-black border border-[#00f2ff]/30 px-4 py-1 hover:bg-[#00f2ff]/10">ESTABLISH_PING</button>
                   </DoubleBorderPanel>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'create' && (
            <motion.div 
              key="create"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="h-full flex items-center justify-center"
            >
              <DoubleBorderPanel title="[ REGISTER_NEW_OPERATOR ]" className="w-[400px]">
                <form onSubmit={handleCreate} className="space-y-4 py-2">
                  <div className="space-y-1">
                    <label className="text-[7px] opacity-40 uppercase">Full_Name_Designation</label>
                    <input name="name" required placeholder="p. ej. OPERATOR_OMEGA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-3 py-2 text-[9px] text-[#00f2ff] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[7px] opacity-40 uppercase">Role_Classification</label>
                      <input name="role" required placeholder="p. ej. ANALYST" className="w-full bg-black/40 border border-[#00f2ff]/20 px-3 py-2 text-[9px] text-[#00f2ff] outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[7px] opacity-40 uppercase">Auth_Level (1-5)</label>
                      <select name="clearance" className="w-full bg-black/40 border border-[#00f2ff]/20 px-3 py-2 text-[9px] text-[#00f2ff] outline-none">
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                        <option value="4">Level 4</option>
                        <option value="5">Level 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[7px] opacity-40 uppercase">Operation_Sector</label>
                    <input name="sector" required placeholder="p. ej. SECTOR_ALPHA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-3 py-2 text-[9px] text-[#00f2ff] outline-none" />
                  </div>
                  <button type="submit" className="w-full py-2 bg-[#00f2ff] text-black font-black text-[9px] uppercase tracking-widest hover:bg-[#00f2ff]/80 transition-all">
                    Finalize_Registration
                  </button>
                </form>
              </DoubleBorderPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="h-6 shrink-0 border border-[#00f2ff]/20 bg-black/40 flex items-center px-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap">
           <span className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">DIRECTORATE_LINK_STABLE...</span>
           <span className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">SYNCHRONIZING_PERSONNEL_INDEX...</span>
           <span className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">PROTOCOL_7B_ENFORCED...</span>
        </div>
      </footer>
    </div>
  );
}
