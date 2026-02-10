
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, User, Shield, Undo2, Search, 
  Circle, BadgeCheck, UserPlus, Trash2, 
  Edit3, Eye, ArrowLeft, Calendar, 
  MapPin, HardDrive, Terminal,
  Lock, Activity, Mail, Loader2
} from 'lucide-react';
import { useCollection, initializeFirebase } from '@/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

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

const DoubleBorderPanel = ({ children, title, className = "", isAccent = false }: { children: React.ReactNode, title?: string, className?: string, isAccent?: boolean }) => (
  <div className={`relative border ${isAccent ? 'border-[#f43f5e]/40' : 'border-[#00f2ff]/30'} bg-[#050b1a]/80 backdrop-blur-md p-3 flex flex-col fui-corner-brackets overflow-hidden ${className}`}>
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
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- CONEXIÓN BACKEND (FIRESTORE) ---
  const { data: operators, loading } = useCollection<Operator>('operators');

  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    // --- MUTACIÓN BACKEND ---
    const { db } = initializeFirebase();
    await deleteDoc(doc(db, 'operators', id));
    setView('list');
    setSelectedOp(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const opId = `OP-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;
    
    const newOp: Operator = {
      id: opId,
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

    // --- GUARDADO EN BACKEND ---
    const { db } = initializeFirebase();
    await setDoc(doc(db, 'operators', opId), newOp);
    setView('list');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000508] text-[#00f2ff] p-4 flex flex-col gap-4 font-mono relative">
      <div className="scanline-effect opacity-10 pointer-events-none" />
      <div className="vignette" />
      <div className="dot-matrix absolute inset-0 opacity-10 pointer-events-none" />

      <header className="flex justify-between items-center z-20 shrink-0 h-10">
        <div className="flex items-center gap-3">
          <div className="p-1.5 border border-[#00f2ff]/40 bg-[#00f2ff]/10">
            <Users className="w-5 h-5 text-[#00f2ff]" />
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
              className="flex items-center gap-2 px-3 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[7px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
            >
              <UserPlus className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Register_New</span>
            </button>
          ) : (
            <button 
              onClick={() => setView('list')}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[7px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>Back_to_List</span>
            </button>
          )}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[7px] font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/15 transition-all tactic-clip group"
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
              className="h-full flex flex-col gap-4 overflow-hidden"
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

              <DoubleBorderPanel title="[ OPERATOR_DATA_STREAM ]" className="flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto terminal-scroll pr-2">
                  {loading ? (
                    <div className="flex items-center justify-center h-full gap-3 text-[#00f2ff]/40">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[8px] tracking-[0.4em] uppercase">Fetching_Registry...</span>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse table-fixed">
                      <thead>
                        <tr className="border-b border-[#00f2ff]/10 text-[6px] text-[#00f2ff]/40 uppercase tracking-[0.3em] font-bold sticky top-0 bg-[#050b1a] z-10">
                          <th className="py-2 px-3 w-[40%]">Identity</th>
                          <th className="py-2 px-3 w-[20%]">Role</th>
                          <th className="py-2 px-3 w-[15%]">Clearance</th>
                          <th className="py-2 px-3 w-[15%]">Status</th>
                          <th className="py-2 px-3 w-[10%] text-right">Access</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#00f2ff]/5">
                        {filteredOperators.map((op, i) => (
                          <motion.tr 
                            key={op.id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                            className="group hover:bg-[#00f2ff]/5 transition-colors cursor-pointer"
                            onClick={() => { setSelectedOp(op); setView('details'); }}
                          >
                            <td className="py-2 px-3 overflow-hidden">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 shrink-0 border border-[#00f2ff]/20 bg-[#00f2ff]/5 flex items-center justify-center relative">
                                  <User className="w-4 h-4 text-[#00f2ff]/40 group-hover:text-[#00f2ff]" />
                                  {op.clearance === 5 && <BadgeCheck className="absolute -top-1 -right-1 w-3 h-3 text-[#00f2ff] fill-black" />}
                                </div>
                                <div className="flex min-w-0">
                                  <span className="text-[10px] font-black text-white group-hover:text-[#00f2ff] transition-colors truncate">{op.name}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-3 overflow-hidden">
                              <span className="text-[8px] font-bold uppercase opacity-70 truncate block">{op.role}</span>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex gap-0.5 items-center">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <div key={idx} className={`w-1.5 h-1 ${idx < op.clearance ? 'bg-[#00f2ff] shadow-[0_0_5px_#00f2ff]' : 'bg-[#00f2ff]/10'}`} />
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
                               <div className="p-1 hover:bg-[#00f2ff]/20 transition-all rounded-none inline-block">
                                  <Eye className="w-3.5 h-3.5 text-[#00f2ff] opacity-60 group-hover:opacity-100" />
                               </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </DoubleBorderPanel>
            </motion.div>
          )}

          {view === 'details' && selectedOp && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              className="h-full grid grid-cols-12 gap-4 min-h-0 overflow-hidden"
            >
              <div className="col-span-4 flex flex-col gap-4 h-full min-h-0 overflow-hidden">
                <DoubleBorderPanel title="[ BIOMETRIC_IDENT ]" className="shrink-0 items-center py-4">
                  <div className="w-16 h-16 border border-[#00f2ff]/40 bg-[#00f2ff]/5 p-2 relative group overflow-hidden shrink-0">
                    <User className="w-full h-full text-[#00f2ff]/20" />
                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                  </div>
                  <h2 className="mt-2 text-[11px] font-black text-white tracking-[0.2em] truncate w-full text-center px-4">{selectedOp.name}</h2>
                  <span className="text-[6px] opacity-40 font-mono truncate w-full text-center px-2">UUID: {selectedOp.id}</span>
                </DoubleBorderPanel>

                <DoubleBorderPanel title="[ SECURITY_STATUS ]" className="flex-1 min-h-0">
                  <div className="space-y-3 p-1">
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[6px] opacity-40 uppercase truncate">Clearance</span>
                      <span className="text-[8px] font-black truncate text-white ml-2">LEVEL_{selectedOp.clearance}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[6px] opacity-40 uppercase truncate">State</span>
                      <span className={`text-[8px] font-black truncate ml-2 ${selectedOp.status === 'ACTIVE' ? 'text-emerald-400' : 'text-red-500'}`}>{selectedOp.status}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#00f2ff]/10 pb-1">
                      <span className="text-[6px] opacity-40 uppercase truncate">Sector</span>
                      <span className="text-[8px] font-black truncate text-white ml-2">{selectedOp.sector}</span>
                    </div>
                  </div>
                </DoubleBorderPanel>
              </div>

              <div className="col-span-8 flex flex-col gap-4 h-full min-h-0 overflow-hidden">
                <DoubleBorderPanel title="[ EXTENDED_DOSSIER ]" className="flex-1 min-h-0">
                  <div className="grid grid-cols-2 gap-4 p-2 h-full overflow-hidden">
                    <div className="space-y-4 overflow-y-auto terminal-scroll pr-2 h-full">
                      <div className="flex items-start gap-3 min-w-0">
                        <Mail className="w-3 h-3 text-[#00f2ff]/40 shrink-0 mt-0.5" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[5px] opacity-30 uppercase">Secure_Comm</span>
                          <span className="text-[8px] font-bold text-white truncate w-full">{selectedOp.email}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 min-w-0">
                        <Calendar className="w-3 h-3 text-[#00f2ff]/40 shrink-0 mt-0.5" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[5px] opacity-30 uppercase">Induction</span>
                          <span className="text-[8px] font-bold text-white truncate w-full">{selectedOp.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 min-w-0">
                        <HardDrive className="w-3 h-3 text-[#00f2ff]/40 shrink-0 mt-0.5" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[5px] opacity-30 uppercase">Authorized_Dev</span>
                          <span className="text-[8px] font-bold text-white truncate w-full">{selectedOp.deviceId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DoubleBorderPanel>

                <div className="grid grid-cols-3 gap-3 shrink-0 h-14">
                   <DoubleBorderPanel title="ADMIN" className="bg-[#00f2ff]/5">
                      <button className="w-full h-full flex items-center justify-center gap-2 text-[7px] font-black border border-[#00f2ff]/30 py-1 hover:bg-[#00f2ff]/10 transition-all uppercase tracking-widest group">
                        <Edit3 className="w-2.5 h-2.5 group-hover:scale-110" />
                        <span className="truncate">Edit</span>
                      </button>
                   </DoubleBorderPanel>
                   
                   <DoubleBorderPanel title="AUTH">
                      <button className="w-full h-full flex items-center justify-center gap-2 text-[7px] font-black border border-[#00f2ff]/30 py-1 hover:bg-[#00f2ff]/10 transition-all uppercase tracking-widest group">
                        <Lock className="w-2.5 h-2.5 group-hover:scale-110" />
                        <span className="truncate">Revoke</span>
                      </button>
                   </DoubleBorderPanel>

                   <DoubleBorderPanel title="DANGER" className="bg-red-500/5" isAccent>
                      <button 
                        onClick={() => handleDelete(selectedOp.id)}
                        className="w-full h-full flex items-center justify-center gap-2 text-[7px] font-black border border-red-500/30 text-red-500 py-1 hover:bg-red-500/20 transition-all uppercase tracking-widest group"
                      >
                        <Trash2 className="w-2.5 h-2.5 group-hover:scale-110" />
                        <span className="truncate">Purge</span>
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
              className="h-full flex items-center justify-center overflow-hidden"
            >
              <DoubleBorderPanel title="[ REGISTER_NEW_OPERATOR ]" className="w-[320px] shrink-0">
                <form onSubmit={handleCreate} className="space-y-3 py-1">
                  <div className="space-y-1">
                    <label className="text-[6px] opacity-40 uppercase">Full_Name_Designation</label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00f2ff]/30" />
                      <input name="name" required placeholder="OPERATOR_OMEGA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-8 py-1.5 text-[8px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[6px] opacity-40 uppercase">Role</label>
                      <input name="role" required placeholder="ANALYST" className="w-full bg-black/40 border border-[#00f2ff]/20 px-2 py-1.5 text-[8px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[6px] opacity-40 uppercase">Clearance</label>
                      <select name="clearance" className="w-full bg-black/40 border border-[#00f2ff]/20 px-2 py-1.5 text-[8px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all">
                        <option value="1">L-1</option>
                        <option value="2">L-2</option>
                        <option value="3">L-3</option>
                        <option value="4">L-4</option>
                        <option value="5">L-5</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[6px] opacity-40 uppercase">Operation_Sector</label>
                    <input name="sector" required placeholder="SECTOR_ALPHA" className="w-full bg-black/40 border border-[#00f2ff]/20 px-2 py-1.5 text-[8px] text-[#00f2ff] outline-none focus:border-[#00f2ff]/60 transition-all uppercase" />
                  </div>
                  <button type="submit" className="w-full py-2 bg-[#00f2ff] text-black font-black text-[8px] uppercase tracking-widest hover:bg-[#00f2ff]/80 transition-all shadow-[0_0_10px_rgba(0,242,255,0.3)] mt-2">
                    Finalize_Registration
                  </button>
                </form>
              </DoubleBorderPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="h-5 shrink-0 border border-[#00f2ff]/20 bg-black/40 flex items-center px-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap">
           <motion.span 
             animate={{ opacity: [0.4, 1, 0.4] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="text-[5px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]"
           >
             DIRECTORATE_LINK_STABLE...
           </motion.span>
           <span className="text-[5px] font-bold text-[#00f2ff]/40 uppercase tracking-[0.2em]">SYNCHRONIZING_PERSONNEL_INDEX...</span>
        </div>
      </footer>
    </div>
  );
}
