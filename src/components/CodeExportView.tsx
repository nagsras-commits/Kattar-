import React, { useState } from 'react';
import { StitchScreen } from '../types';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeExportViewProps {
  screens: StitchScreen[];
}

export const CodeExportView: React.FC<CodeExportViewProps> = ({ screens }) => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>(screens[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'react' | 'design_md' | 'tailwind'>('react');
  const [copied, setCopied] = useState<boolean>(false);

  const activeScreen = screens.find(s => s.id === selectedScreenId) || screens[0];

  const getExportContent = () => {
    if (activeTab === 'react') {
      return `/**
 * Generated from Google Stitch Project #15422726667412879968
 * Screen: ${activeScreen.name} (${activeScreen.slug})
 * Framework: React 19 + Tailwind CSS
 */

import React, { useState } from 'react';

${activeScreen.codeSnippet}
`;
    }

    if (activeTab === 'design_md') {
      return `# DESIGN.md — Stitch Project 15422726667412879968

## Architecture & Visual Hierarchy
- 60% Dominant Neutral Canvas (#090a0f)
- 30% Structural Surfaces (#13151b)
- 10% Primary Action Budget (#3b82f6)

## Typography (2+1 Rule)
- Display: Plus Jakarta Sans
- Body: DM Sans
- Tabular Figures: JetBrains Mono (font-mono tabular-nums)

## Spatial Math
- Outer Container Padding: 24px
- Inner Child Gap: 16px
- Base Radius: 12px (r_inner = r_outer - padding)
- Single-Elevation Depth: Flat surfaces with 1px hairline border

## Zero-Pill Rule
- Metadata rendered as unboxed text separated by · or /
- Filter controls rendered as functional segmented button elements
`;
    }

    return `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#090a0f",
        surface: {
          subtle: "#13151b",
          elevated: "#1c1f26"
        },
        accent: {
          primary: "#3b82f6",
          hover: "#2563eb"
        }
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      }
    }
  }
};
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const ext = activeTab === 'design_md' ? 'md' : activeTab === 'tailwind' ? 'js' : 'tsx';
    const filename = `${activeScreen.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileCode className="w-5 h-5 text-blue-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">Code & Asset Export</h1>
            </div>
            <p className="text-xs text-neutral-400">
              Export production-ready React components and design system files for project 15422726667412879968.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Tab & Screen Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/60 border border-neutral-800 rounded-xl p-2">
          {/* Format Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'react'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              React Component (.tsx)
            </button>
            <button
              onClick={() => setActiveTab('design_md')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'design_md'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              DESIGN.md Spec
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'tailwind'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              tailwind.config.js
            </button>
          </div>

          {/* Screen dropdown */}
          {activeTab === 'react' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Target Screen:</span>
              <select
                value={selectedScreenId}
                onChange={e => setSelectedScreenId(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-neutral-500"
              >
                {screens.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.slug})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Code Display Area */}
        <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/90 shadow-2xl">
          <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>
              {activeTab === 'react'
                ? `${activeScreen.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.tsx`
                : activeTab === 'design_md'
                ? 'DESIGN.md'
                : 'tailwind.config.js'}
            </span>
            <span className="text-neutral-400">UTF-8 · LF</span>
          </div>
          <pre className="p-6 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed selection:bg-blue-600/30">
            {getExportContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};
