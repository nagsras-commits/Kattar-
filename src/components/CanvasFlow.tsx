import React, { useState } from 'react';
import { StitchScreen } from '../types';
import { ZoomIn, ZoomOut, Maximize2, Play, Plus, ArrowRight, Layers } from 'lucide-react';

interface CanvasFlowProps {
  screens: StitchScreen[];
  onLaunchScreen: (screenId: string) => void;
  onOpenNewScreenModal: () => void;
}

export const CanvasFlow: React.FC<CanvasFlowProps> = ({
  screens,
  onLaunchScreen,
  onOpenNewScreenModal,
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 overflow-hidden relative min-h-[calc(100vh-65px)]">
      {/* Canvas Top Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 px-6 py-3 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Stitch Infinite Canvas</h2>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs font-mono text-neutral-400">Project 15422726667412879968</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono tabular-nums px-2 text-neutral-300">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors border-l border-neutral-800 ml-1"
              title="Reset Zoom (100%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onOpenNewScreenModal}
            className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Screen</span>
          </button>
        </div>
      </div>

      {/* Canvas Grid Background */}
      <div 
        className="flex-1 overflow-auto p-12 flex items-center justify-start relative select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        <div 
          className="flex items-start gap-16 transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {screens.map((screen, idx) => (
            <div key={screen.id} className="flex items-center gap-8">
              {/* Screen Card Representation */}
              <div className="w-[320px] rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col">
                {/* Screen Header Bar */}
                <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-600" />
                    <span className="text-xs font-semibold text-white truncate max-w-[170px]">
                      {screen.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    {screen.type}
                  </span>
                </div>

                {/* Screen Visual Thumbnail */}
                <div className="aspect-[4/3] bg-neutral-950 relative overflow-hidden group">
                  <img
                    src={screen.thumbnail}
                    alt={screen.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onLaunchScreen(screen.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center gap-2 shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch In Runner</span>
                    </button>
                  </div>
                </div>

                {/* Screen Metadata */}
                <div className="p-4 space-y-2">
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {screen.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-mono text-neutral-400">{screen.slug}</span>
                    <span>{screen.componentsCount} components</span>
                  </div>
                </div>
              </div>

              {/* Connector Arrow to next screen if not last */}
              {idx < screens.length - 1 && (
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <div className="w-8 h-[1px] bg-neutral-800" />
                  <ArrowRight className="w-4 h-4 text-neutral-600" />
                  <span className="text-[9px] font-mono text-neutral-400">flow</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
