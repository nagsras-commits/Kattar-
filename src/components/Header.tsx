import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenSyncModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenSyncModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onSelectView('runner')}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
      >
        <span>Stitch Studio</span>
        <span className="text-xs font-mono font-normal text-neutral-400">#15422726667412879968</span>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
        <button
          onClick={() => onSelectView('runner')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentView === 'runner'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          App Runner
        </button>
        <button
          onClick={() => onSelectView('canvas')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentView === 'canvas'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Canvas Flow
        </button>
        <button
          onClick={() => onSelectView('tokens')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentView === 'tokens'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Design Tokens
        </button>
        <button
          onClick={() => onSelectView('code')}
          className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
            currentView === 'code'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Code Export
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSyncModal}
          className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          Sync Project
        </button>
      </div>
    </header>
  );
};
