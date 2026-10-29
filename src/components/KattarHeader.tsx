import React from 'react';
import { AppTab } from '../types/kattar';
import { MapPin, ShieldAlert, Sparkles, Radio } from 'lucide-react';

interface KattarHeaderProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  activeLocation: string;
  onOpenLocationPicker: () => void;
  unreadTotal: number;
  onTriggerSOS: () => void;
  isSOSActive?: boolean;
}

export const KattarHeader: React.FC<KattarHeaderProps> = ({
  currentTab,
  onSelectTab,
  activeLocation,
  onOpenLocationPicker,
  unreadTotal,
  onTriggerSOS,
  isSOSActive = false,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand Wordmark & Location Context */}
      <div className="flex items-center gap-4 shrink-0">
        <div 
          onClick={() => onSelectTab('chats')}
          className="cursor-pointer flex items-center gap-2 select-none"
        >
          <img
            src="/assets/aistudio/screen_0dd7bf8b.png"
            alt="KATTAR Logo"
            className="w-9 h-9 object-contain drop-shadow"
          />
          <span className="text-lg font-black tracking-wider text-white">
            KATTAR
          </span>
        </div>

        {/* Location selector trigger */}
        <button
          onClick={onOpenLocationPicker}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
          title="Change community location radius"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-medium truncate max-w-[140px]">{activeLocation}</span>
          <span className="text-[10px] text-neutral-400 font-mono">5-10km</span>
        </button>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => onSelectTab('chats')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
            currentTab === 'chats'
              ? 'text-orange-400 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <span>Community Chats</span>
          {unreadTotal > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-orange-600 text-white">
              {unreadTotal}
            </span>
          )}
        </button>

        <button
          onClick={() => onSelectTab('services')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentTab === 'services'
              ? 'text-orange-400 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Local Services & Map
        </button>

        <button
          onClick={() => onSelectTab('news')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentTab === 'news'
              ? 'text-orange-400 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Community News
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentTab === 'profile'
              ? 'text-orange-400 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Profile & Register
        </button>

        <button
          onClick={() => onSelectTab('admin')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
            currentTab === 'admin'
              ? 'text-orange-400 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Devine Admin</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action — EMERGENCY SOS BUTTON */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTriggerSOS}
          className={`px-4 py-2 text-xs font-black text-white rounded-xl shadow-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 uppercase tracking-wider ${
            isSOSActive
              ? 'bg-red-600 animate-pulse ring-4 ring-red-500/40 shadow-red-600/50'
              : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-red-600/20 hover:scale-102'
          }`}
          title="Send immediate location-based emergency broadcast"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Radio className="w-3.5 h-3.5" />
          <span>Emergency SOS</span>
        </button>
      </div>
    </header>
  );
};
