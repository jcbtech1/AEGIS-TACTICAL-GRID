'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, User, Shield, Undo2, Search, 
  Circle, BadgeCheck, UserPlus, Trash2, 
  Edit3, Eye, ArrowLeft, Calendar, 
  MapPin, HardDrive, Terminal, Settings2,
  Lock, Activity, Mail
} from 'lucide-react';

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
  email: string;
}

const mockOperators: Operator[] = [
  { id: 'OP-001', name: 'ADMIN_PRIME', role: 'System Architect', clearance: 5, status: 'ACTIVE', lastActive: 'NOW', sector: 'CENTRAL_COMMAND', joinDate: '2022-05-12', deviceId: 'AEGIS-V2-01', email: 'admin@aegis.mil' },
  { id: 'OP-042', name: 'SEC_ALFA_09', role: 'Network Sentinel', clearance: 3, status: 'ACTIVE', lastActive: '12m ago', sector: 'NETWORK_PERIMETER', joinDate: '2023-01-20', deviceId: 'SENTINEL-X9', email: 'alfa09@aegis.mil' },
  { id: 'OP-117', name: 'GHOST_RECON', role: 'Infiltration Specialist', clearance: 4, status: 'STANDBY', lastActive: '2h ago', sector: 'STEALTH_OPS', joinDate: '2021-11-05', deviceId: 'VOID-WALKER', email: 'ghost@aegis.mil' },
  { id: 'OP-088', name: 'CYBER_VANGUARD', role: 'Threat Analyst', clearance: 3, status: 'ACTIVE', lastActive: '5m ago', sector: 'THREAT_DETECTION', joinDate: '2023-08-14', deviceId: 'ANALYST-B4', email: 'vanguard@aegis.mil' },
  { id: 'OP-203', name: 'NEURAL_LINK', role: 'AI Integration', clearance: 4, status: 'INACTIVE', lastActive: '1d ago', sector: 'AI_LABS', joinDate: '2024-02-10', deviceId: 'NEURAL-BRIDGE', email: 'neural@aegis.mil' },
  { id: 'OP-512', name: 'LOG_MASTER', role: 'Data Auditor', clearance: 2, status: 'ACTIVE', lastActive: '1h ago', sector: 'ARCHIVE_VAULT', joinDate: '2022-12-01', deviceId: 'AUDIT-UNIT', email: 'logs@aegis.mil' },
];

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative border ${isAccent ? 'border-[#f43f5e]/40' : 'border-[#00f2ff]/30'} bg-[#050b1a]/80 backdrop-blur-md p-4 flex flex-col fui-corner-brackets overflow-hidden ${className}`}>
    <div className="fui-corner-brackets-inner" />
    {title && (
      <div className={`absolute -top-2 left-4 px-2 bg-[#020814] text-[8px] font-bold tracking-[0.3em] uppercase z-10 ${isAccent ? 'text-[#f43f5e]' : 'text-[#00f2ff]'} border ${isAccent ? 'border-[#f43f5e]/30' : 'border-[#00f2ff]/30'}`}>
        {title}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col relative z-10 overflow-hidden">
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
    setView('list');
    setSelectedOp(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newOp: Operator = {
      id: `OP-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
      name: (formData.get('name') as string).toUpperCase(),
      role: (formData.get('role') as string).toUpperCase(),
      clearance: Number(formData.get('clearance')),
      status: 'ACTIVE',
      lastActive: 'JUST_NOW',
      sector: (formData.get('sector') as string).toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      deviceId: `DEV-${Math.random().toString(36).substring(7).toUpperCase()}`,
      email: `${formData.get('name')?.toString().toLowerCase().replace(/\s/g, '')}@aegis.mil`
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
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                      <tr className="border-b border-[#00f2ff]/10 text-[6px] text-[#00f2ff]/40 uppercase tracking-[0.3em] font-bold">
                        <th className="py-2 px-3 w-[40%]">Identity</th>
                        <th className="py-2 px-3 w-[20%]">Role</th>
                        <th className="py-2 px-3 w-[15%]">Clearance</th>
                        <th className="py-2 px-3 w-[15%]">Status</th>
                        <th className="py-2 px-3 w-[10%] text-right">Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOperators.map((op, i) => (
                        <motion.tr 
                          key={op.id}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                          className="group border-b border-[#00f2ff]/5 hover:bg-[#00f2ff]/5 transition-colors cursor-pointer"
                          onClick={() => { setSelectedOp(op); setView('details'); }}
                        >
                          <td className="py-2 px-3 overflow-hidden">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 shrink-0 border border-[#00f2ff]/20 bg-[#00f2ff]/5 flex items-center justify-center relative">
                                <User className="w-4 h-4 text-[#00f2ff]/40 group-hover:text-[#00f2ff]" />
                                {op.clearance === 5 && <BadgeCheck className="absolute -top-1 -right-1 w-3 h-3 text-[#00f2ff] fill-black" />}
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-[10px] font-black text-white group-hover:text-[#00f2ff] transition-colors truncate">{op.name}</span>
                                <span className="text-[6px] opacity-40 font-mono truncate">{op.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3 overflow-hidden">
                            <span className="text-[8px] font-bold uppercase opacity-70 truncate block">{op.role}</span>
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
                             <button className="p-1.5 hover:bg-[#00f2ff]/20 transition-all rounded-none border border-transparent hover:border-[#00f2ff]/30">
                                <Eye className="w-3.5 h-3.5 text-[#00f2ff] opacity-60 group-hover:opacity-100" />
                             </button>
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
              <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
                <DoubleBorderPanel title="[ BIOMETRIC_IDENT ]" className="flex-none items-center py-6">
                  <div className="w-24 h-24 border border-[#00f2ff]/40 bg-[#00f2ff]/5 p-2 relative group overflow-hidden">
                    <User className="w-full h-full text-[#00f2ff]/20" />
                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                  </div>
                  <h2 className="mt-4 text-sm font-black text-white tracking-[0.2em] truncate max-w-full px-4">{selectedOp.name}</h2>
                  <span className="text-[8px] opacity-40 font-mono truncate max-w-full px-2">UUID: {selectedOp.id}</span>
                </DoubleBorderPanel>

                <DoubleBorderPanel title="[ SECURITY_STATUS ]" className="flex-1">
                  <div className="space-y-3 overflow-hidden">
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40 uppercase shrink-0">Clearance_Tier</span>
                      <span className="text-[9px] font-black truncate ml-2">LEVEL_{selectedOp.clearance}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40 uppercase shrink-0">Operational_State</span>
                      <span className={`text-[9px] font-black truncate ml-2 ${selectedOp.status === 'ACTIVE' ? 'text-emerald-400' : 'text-red-500'}`}>{selectedOp.status}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40 uppercase shrink-0">Assigned_Sector</span>
                      <span className="text-[9px] font-black truncate ml-2">{selectedOp.sector}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[7px] opacity-40 uppercase shrink-0">Encryption_Key</span>
                      <span className="text-[9px] font-black opacity-30 font-mono truncate ml-2">0x{Math.random().toString(16).slice(2,8).toUpperCase()}</span>
                    </div>
                  </div>
                </DoubleBorderPanel>
              </div>

              <div className="col-span-8 flex flex-col gap-4 overflow-hidden">
                <DoubleBorderPanel title="[ EXTENDED_DOSSIER ]" className="flex-1">
                  <div className="grid grid-cols-2 gap-6 p-2 h-full overflow-hidden">
                    <div className="space-y-4 overflow-hidden">
                      <div className="flex items-start gap-3 overflow-hidden">
                        <Mail className="w-4 h-4 text-[#00f2ff]/40 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[6px] opacity-30 uppercase truncate">Secure_Communication</span>
                          <span className="text-[9px] font-bold truncate">{selectedOp.email}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 overflow-hidden">
                        <Calendar className="w-4 h-4 text-[#00f2ff]/40 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[6px] opacity-30 uppercase truncate">Induction_Date</span>
                          <span className="text-[9px] font-bold truncate">{selectedOp.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 overflow-hidden">
                        <MapPin className="w-4 h-4 text-[#00f2ff]/40 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[6px] opacity-30 uppercase truncate">Main_Base_Access</span>
                          <span className="text-[9px] font-bold truncate">{selectedOp.sector} GRID_NODE</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 overflow-hidden">
                        <HardDrive className="w-4 h-4 text-[#00f2ff]/40 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[6px] opacity-30 uppercase truncate">Authorized_Device</span>
                          <span className="text-[9px] font-bold truncate">{selectedOp.deviceId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-l border-[#00f2ff]/10 pl-6 overflow-hidden flex flex-col">
                      <span className="text-[6px] opacity-30 uppercase flex items-center gap-1 shrink-0">
                        <Terminal className="w-2.5 h-2.5" /> Recent_System_Logs
                      </span>
                      <div className="text-[7px] space-y-2 opacity-60 font-mono flex-1 overflow-y-auto terminal-scroll">
                        <div className="truncate">[2h ago] SYSTEM_LOGIN_GRANTED_0x884</div>
                        <div className="truncate">[5h ago] KERNEL_PARAMETER_ACCESS</div>
                        <div className="truncate">[12h ago] ENCRYPTED_STREAM_STARTED</div>
                        <div className="truncate">[1d ago] SECURITY_PROTOCOL_VERIFIED</div>
                        <div className="truncate">[2d ago] NODE_SYNCHRONIZATION_OK</div>
                        <div className="truncate">[3d ago] NEW_DEVICE_REGISTERED</div>
                      </div>
                    </div>
                  </div>
                </DoubleBorderPanel>

                <div className="grid grid-cols-3 gap-4 h-24 shrink-0">
                   <DoubleBorderPanel title="ADMIN_TOOLS" className="flex items-center justify-center bg-[#00f2ff]/5">
                      <button className="flex items-center gap-2 text-[8px] font-black border border-[#00f2ff]/30 px-4 py-2 hover:bg-[#00f2ff]/10 transition-all uppercase tracking-widest group truncate max-w-full">
                        <Edit3 className="w-3 h-3 group-hover:scale-110 shrink-0" />
                        <span className="truncate">Edit_Profile</span>
                      </button>
                   </DoubleBorderPanel>
                   
                   <DoubleBorderPanel title="SYSTEM_ACCESS" className="flex items-center justify-center">
                      <button className="flex items-center gap-2 text-[8px] font-black border border-[#00f2ff]/30 px-4 py-2 hover:bg-[#00f2ff]/10 transition-all uppercase tracking-widest group truncate max-w-full">
                        <Lock className="w-3 h-3 group-hover:scale-110 shrink-0" />
                        <span className="truncate">Revoke_Access</span>
                      </button>
                   </DoubleBorderPanel>

                   <DoubleBorderPanel title="PURGE_RECORD" className="flex items-center justify-center bg-red-500/5" isAccent>
                      <button 
                        onClick={() => handleDelete(selectedOp.id)}
                        className="flex items-center gap-2 text-[8px] font-black border border-red-500/30 text-red-500 px-4 py-2 hover:bg-red-500/20 transition-all uppercase tracking-widest group truncate max-w-full"
                      >
                        <Trash2 className="w-3 h-3 group-hover:scale-110 shrink-0" />
                        <span className="truncate">Delete_Entry</span>
                      </button>
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
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
                      <input name="name" required placeholder="OPERATOR_OMEGA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-8 py-2 text-[9px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[7px] opacity-40 uppercase">Role_Classification</label>
                      <div className="relative">
                        <Activity className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
                        <input name="role" required placeholder="ANALYST" className="w-full bg-black/40 border border-[#00f2ff]/20 px-8 py-2 text-[9px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[7px] opacity-40 uppercase">Auth_Level</label>
                      <div className="relative">
                        <Shield className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
                        <select name="clearance" className="w-full bg-black/40 border border-[#00f2ff]/20 px-8 py-2 text-[9px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all">
                          <option value="1">L-1 (BASIC)</option>
                          <option value="2">L-2 (AUDIT)</option>
                          <option value="3">L-3 (SECURITY)</option>
                          <option value="4">L-4 (OFFENSIVE)</option>
                          <option value="5">L-5 (ADM_PRIME)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[7px] opacity-40 uppercase">Operation_Sector</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
                      <input name="sector" required placeholder="SECTOR_ALPHA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-8 py-2 text-[9px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2 bg-[#00f2ff] text-black font-black text-[9px] uppercase tracking-widest hover:bg-[#00f2ff]/80 transition-all shadow-[0_0_15px_rgba(0,242,255,0.4)]">
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
           <motion.span 
             animate={{ opacity: [0.4, 1, 0.4] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]"
           >
             DIRECTORATE_LINK_STABLE...
           </motion.span>
           <span className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">SYNCHRONIZING_PERSONNEL_INDEX...</span>
           <span className="text-[6px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">PROTOCOL_7B_ENFORCED...</span>
        </div>
      </footer>
    </div>
  );
}
