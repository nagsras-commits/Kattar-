import React, { useState } from 'react';
import { DesignToken } from '../types';
import { Copy, Check, FileText } from 'lucide-react';

interface DesignTokensViewProps {
  tokens: DesignToken[];
}

export const DesignTokensView: React.FC<DesignTokensViewProps> = ({ tokens }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const handleCopyToken = (cssVar: string) => {
    navigator.clipboard.writeText(`var(${cssVar})`);
    setCopiedToken(cssVar);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleCopyAllCSS = () => {
    const cssContent = `:root {\n${tokens
      .map(t => `  ${t.cssVariable}: ${t.value}; /* ${t.name} */`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(cssContent);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const colorTokens = tokens.filter(t => t.category === 'color');
  const typographyTokens = tokens.filter(t => t.category === 'typography');
  const layoutTokens = tokens.filter(t => t.category === 'spacing' || t.category === 'radius');

  return (
    <div className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-blue-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">DESIGN.md System Tokens</h1>
            </div>
            <p className="text-xs text-neutral-400">
              Extracted design system for Stitch project 15422726667412879968 adhering to the 60-30-10 palette and typography rules.
            </p>
          </div>

          <button
            onClick={handleCopyAllCSS}
            className="px-4 py-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied All CSS!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy CSS Tokens</span>
              </>
            )}
          </button>
        </div>

        {/* Color Palette (60-30-10) */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Color Palette (60-30-10 System)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Strictly allocated across neutral canvas, structural surfaces, and 10% primary action budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map(token => (
              <div
                key={token.cssVariable}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white">{token.name}</span>
                    <button
                      onClick={() => handleCopyToken(token.cssVariable)}
                      className="text-neutral-400 hover:text-white p-1 rounded"
                      title="Copy CSS variable"
                    >
                      {copiedToken === token.cssVariable ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg border border-neutral-700 shadow-inner shrink-0"
                      style={{ backgroundColor: token.value }}
                    />
                    <div className="font-mono text-xs text-neutral-300 tabular-nums">
                      {token.value}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-neutral-400 mb-2 leading-relaxed">
                    {token.description}
                  </p>
                  <div className="text-[10px] font-mono text-blue-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-800/80">
                    var({token.cssVariable})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Typography System
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              The 2+1 rule pairing an expressive display face with a readable body face and tabular monospace figures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {typographyTokens.map(token => (
              <div
                key={token.cssVariable}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">{token.name}</span>
                    <button
                      onClick={() => handleCopyToken(token.cssVariable)}
                      className="text-neutral-400 hover:text-white p-1 rounded"
                    >
                      {copiedToken === token.cssVariable ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs font-mono text-neutral-300 mb-3 bg-neutral-950 p-2 rounded border border-neutral-800">
                    {token.value}
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {token.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Layout & Radii */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Spatial Math & Radii
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Outer container padding $\ge$ inner padding, nested radius formula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {layoutTokens.map(token => (
              <div
                key={token.cssVariable}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-white block mb-1">{token.name}</span>
                  <p className="text-[11px] text-neutral-400">{token.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-white tabular-nums mb-1">
                    {token.value}
                  </div>
                  <button
                    onClick={() => handleCopyToken(token.cssVariable)}
                    className="text-[10px] text-blue-400 hover:underline font-mono"
                  >
                    var({token.cssVariable})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
