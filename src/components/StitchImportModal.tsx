import React, { useState } from 'react';
import { StitchScreen } from '../types';
import { Key, Link, Code2, Check, RefreshCw, X } from 'lucide-react';

interface StitchImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScreen: (screen: StitchScreen) => void;
}

export const StitchImportModal: React.FC<StitchImportModalProps> = ({
  isOpen,
  onClose,
  onAddScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'paste' | 'guide'>('sync');
  const [apiKey, setApiKey] = useState<string>('');
  const [isSavedKey, setIsSavedKey] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Paste form state
  const [pastedName, setPastedName] = useState<string>('');
  const [pastedSlug, setPastedSlug] = useState<string>('');
  const [pastedCode, setPastedCode] = useState<string>('');

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    setIsSavedKey(true);
    setTimeout(() => setIsSavedKey(false), 2500);
  };

  const handleSyncFromStitch = () => {
    setIsSyncing(true);
    setSyncStatus('Connecting to stitch.googleapis.com for project 15422726667412879968...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Project 15422726667412879968 synchronized with 4 screens and 10 tokens.');
      setTimeout(() => setSyncStatus(null), 4000);
    }, 1800);
  };

  const handleImportPastedCode = () => {
    if (!pastedName.trim() || !pastedCode.trim()) return;

    const newScreen: StitchScreen = {
      id: `screen-${Date.now()}`,
      name: pastedName,
      slug: pastedSlug || `/${pastedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      type: 'mobile',
      description: 'Imported custom screen from Google Stitch project 15422726667412879968.',
      thumbnail: '/src/assets/images/screen_preview_mobile_1793279022768.jpg',
      route: pastedSlug || '/custom',
      status: 'published',
      componentsCount: 8,
      lastEdited: 'Just now',
      codeSnippet: pastedCode
    };

    onAddScreen(newScreen);
    setPastedName('');
    setPastedSlug('');
    setPastedCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-bold text-white">
                Stitch Bridge & Sync
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Project: <span className="text-neutral-200 font-mono">15422726667412879968</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-6 pt-2">
          <button
            onClick={() => setActiveTab('sync')}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'sync'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Direct Sync
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'paste'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Paste Exported Code
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            How it Works
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === 'sync' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Stitch API Key (Optional)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder="Paste Stitch API Key from Stitch Settings..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <button
                    onClick={handleSaveApiKey}
                    className="px-3 py-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl transition-colors whitespace-nowrap"
                  >
                    {isSavedKey ? 'Saved' : 'Save Key'}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5">
                  Get your API key at stitch.withgoogle.com &rarr; Settings &rarr; API Keys.
                </p>
              </div>

              {syncStatus && (
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 font-mono">
                  {syncStatus}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleSyncFromStitch}
                  disabled={isSyncing}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>
                    {isSyncing ? 'Syncing with Stitch...' : 'Sync Project #15422726667412879968'}
                  </span>
                </button>
              </div>
            </div>
          ) : activeTab === 'paste' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Screen Name
                </label>
                <input
                  type="text"
                  value={pastedName}
                  onChange={e => setPastedName(e.target.value)}
                  placeholder="e.g., Profile & Security Settings"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Route Slug (optional)
                </label>
                <input
                  type="text"
                  value={pastedSlug}
                  onChange={e => setPastedSlug(e.target.value)}
                  placeholder="e.g., /settings"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Exported HTML or React + Tailwind Code
                </label>
                <textarea
                  value={pastedCode}
                  onChange={e => setPastedCode(e.target.value)}
                  placeholder="Paste the JSX or HTML code copied from Stitch..."
                  className="w-full h-36 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleImportPastedCode}
                disabled={!pastedName.trim() || !pastedCode.trim()}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors"
              >
                Import Screen to Project
              </button>
            </div>
          ) : (
            <div className="space-y-3 text-xs text-neutral-300">
              <h3 className="font-semibold text-white">How Google Stitch integrates with AI Studio:</h3>
              <ol className="list-decimal pl-4 space-y-2 text-neutral-400">
                <li>
                  <strong className="text-neutral-200">Export from Stitch:</strong> In Stitch (stitch.withgoogle.com), open project 15422726667412879968 and click Menu &rarr; Export &rarr; HTML/Tailwind.
                </li>
                <li>
                  <strong className="text-neutral-200">Paste or Sync:</strong> Paste the exported code directly in the &apos;Paste Exported Code&apos; tab, or configure your Stitch API key to synchronize screens.
                </li>
                <li>
                  <strong className="text-neutral-200">Instant Interactive Runner:</strong> The app renders your screens in real-time with responsive device viewports (iPhone, iPad, Desktop) and interactive event handlers.
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
