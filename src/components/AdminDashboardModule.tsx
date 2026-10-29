import React, { useState } from 'react';
import { PendingVerification, ProfessionCategory } from '../types/kattar';
import { DevineIntelligenceSeal } from './OrgBadges';
import { 
  ShieldCheck, 
  Users, 
  FileCheck, 
  SlidersHorizontal, 
  Radio, 
  Send, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardModuleProps {
  pendingVerifications: PendingVerification[];
  onApproveVerification: (id: string) => void;
  onRejectVerification: (id: string) => void;
}

export const AdminDashboardModule: React.FC<AdminDashboardModuleProps> = ({
  pendingVerifications,
  onApproveVerification,
  onRejectVerification,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'professions' | 'broadcast'>('overview');
  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [isUrgentBroadcast, setIsUrgentBroadcast] = useState<boolean>(false);
  const [broadcastSentNotice, setBroadcastSentNotice] = useState<string | null>(null);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);
  const [newProfessionInput, setNewProfessionInput] = useState<string>('');
  const [isAddingProfession, setIsAddingProfession] = useState<boolean>(false);

  // Profession manager state
  const [professionList, setProfessionList] = useState<{ name: string; active: boolean; verifRequired: boolean }[]>([
    { name: 'Police Department Liaison', active: true, verifRequired: true },
    { name: 'RSS Representative', active: true, verifRequired: true },
    { name: 'VHP Sevadal', active: true, verifRequired: true },
    { name: 'Bajrang Dal Seva', active: true, verifRequired: true },
    { name: 'Priest / Vedacharya', active: true, verifRequired: true },
    { name: 'Electrician', active: true, verifRequired: true },
    { name: 'Plumbing', active: true, verifRequired: true },
    { name: 'Delivery Partner & Rider', active: true, verifRequired: false },
    { name: 'Hindu Welfare Agency', active: true, verifRequired: true },
    { name: 'ABVP / Student Unions', active: true, verifRequired: false },
  ]);

  const toggleProfessionActive = (name: string) => {
    setProfessionList(prev =>
      prev.map(p => (p.name === name ? { ...p, active: !p.active } : p))
    );
  };

  const toggleProfessionVerif = (name: string) => {
    setProfessionList(prev =>
      prev.map(p => (p.name === name ? { ...p, verifRequired: !p.verifRequired } : p))
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    setBroadcastSentNotice(`Urgent broadcast "${broadcastTitle}" broadcasted to 1,420 residents in 5-10km Indiranagar radius!`);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSentNotice(null), 4000);
  };

  return (
    <div className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">
                DEVINE INTELLIGENCE Admin Oversight
              </h1>
            </div>
            <p className="text-xs text-neutral-400">
              Community integrity, role permissions, and member verification engine for KATTAR.
            </p>
          </div>

          <DevineIntelligenceSeal size="md" />
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/60 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-neutral-800 text-orange-400 border border-orange-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'verifications'
                ? 'bg-neutral-800 text-orange-400 border border-orange-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Member Verifications</span>
            <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center font-mono">
              {pendingVerifications.filter(v => v.status === 'Pending').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('professions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'professions'
                ? 'bg-neutral-800 text-orange-400 border border-orange-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Profession Management
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'broadcast'
                ? 'bg-neutral-800 text-orange-400 border border-orange-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Broadcast Alerts
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Total Community Members</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">1,420</span>
                <span className="text-[10px] text-emerald-400 block mt-1 font-mono">+18% this month</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Verified Providers</span>
                <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">348</span>
                <span className="text-[10px] text-neutral-400 block mt-1">Devine Seal active</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Daily Active Users (DAU)</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">912</span>
                <span className="text-[10px] text-orange-400 block mt-1">Indiranagar 5km zone</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Pending Verifications</span>
                <span className="text-2xl font-black text-orange-500 font-mono tabular-nums">
                  {pendingVerifications.filter(v => v.status === 'Pending').length}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-1">Requires review</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-3">
              <h3 className="text-sm font-bold text-white">Platform Health & Security</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All accounts are restricted to verified local residents. Devine Intelligence automated document comparison cross-references identity cards with municipal directory data.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">Pending Document Reviews</h3>
              <span className="text-xs text-neutral-400 font-mono">
                {pendingVerifications.length} total applications
              </span>
            </div>

            <div className="divide-y divide-neutral-800/80 border border-neutral-800 rounded-2xl bg-neutral-900/30 overflow-hidden">
              {pendingVerifications.map(app => (
                <div key={app.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{app.applicantName}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {app.smartMatchPercent}% Smart Match
                      </span>
                    </div>
                    <p className="text-xs text-orange-400 font-medium mb-1">
                      {app.profession} · {app.organization}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Document: <strong className="text-neutral-200">{app.documentType}</strong> · Submitted: {app.submissionDate}
                    </p>
                    {app.notes && (
                      <p className="text-[11px] text-neutral-500 mt-1 italic">&quot;{app.notes}&quot;</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onApproveVerification(app.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRejectVerification(app.id)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        setAdminNotice(`Information request sent to ${app.applicantName}`);
                        setTimeout(() => setAdminNotice(null), 3000);
                      }}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-medium rounded-lg"
                    >
                      Request Info
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {adminNotice && (
              <div className="p-3 bg-neutral-900 border border-neutral-700 text-xs text-emerald-400 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{adminNotice}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFESSION MANAGEMENT */}
        {activeTab === 'professions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">Configured Service Professions</h3>
              <button
                onClick={() => setIsAddingProfession(!isAddingProfession)}
                className="px-3 py-1.5 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors"
              >
                {isAddingProfession ? 'Cancel' : '+ Add Profession'}
              </button>
            </div>

            {isAddingProfession && (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center gap-3">
                <input
                  type="text"
                  value={newProfessionInput}
                  onChange={e => setNewProfessionInput(e.target.value)}
                  placeholder="Enter profession title (e.g., Security Guard, Florist)..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => {
                    if (newProfessionInput.trim()) {
                      setProfessionList(prev => [...prev, { name: newProfessionInput.trim(), active: true, verifRequired: true }]);
                      setNewProfessionInput('');
                      setIsAddingProfession(false);
                    }
                  }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
                >
                  Save Role
                </button>
              </div>
            )}

            <div className="divide-y divide-neutral-800/80 border border-neutral-800 rounded-2xl bg-neutral-900/30 overflow-hidden">
              {professionList.map(item => (
                <div key={item.name} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {item.verifRequired ? 'Devine Verification Required' : 'Open Registration'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={() => toggleProfessionActive(item.name)}
                        className="rounded accent-orange-500"
                      />
                      <span>Active</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={item.verifRequired}
                        onChange={() => toggleProfessionVerif(item.name)}
                        className="rounded accent-amber-500"
                      />
                      <span>ID Required</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BROADCAST ALERTS */}
        {activeTab === 'broadcast' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 text-orange-500" />
                <h3 className="text-sm font-bold text-white">Draft Community Push Broadcast</h3>
              </div>

              {broadcastSentNotice && (
                <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-xs text-emerald-300 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{broadcastSentNotice}</span>
                </div>
              )}

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Broadcast Title / Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={e => setBroadcastTitle(e.target.value)}
                    placeholder="e.g., Heavy Rainfall Advisory in Indiranagar 12th Main"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Alert Content & Action Guidance
                  </label>
                  <textarea
                    required
                    value={broadcastMessage}
                    onChange={e => setBroadcastMessage(e.target.value)}
                    placeholder="Provide clear, calm instructions and emergency contact details..."
                    className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="urgentToggle"
                    checked={isUrgentBroadcast}
                    onChange={e => setIsUrgentBroadcast(e.target.checked)}
                    className="rounded accent-red-600"
                  />
                  <label htmlFor="urgentToggle" className="text-xs text-neutral-300 cursor-pointer">
                    Mark as Urgent (Triggers immediate audible notification on all devices)
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast to 5-10km Radius</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
