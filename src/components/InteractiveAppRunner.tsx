import React, { useState } from 'react';
import { DeviceType, StitchScreen } from '../types';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Search, 
  Heart, 
  SlidersHorizontal, 
  ArrowLeft, 
  Activity, 
  Share2, 
  CheckCircle2, 
  Code2, 
  Sparkles,
  RefreshCw,
  Plus,
  Compass,
  Bookmark
} from 'lucide-react';

interface InteractiveAppRunnerProps {
  screens: StitchScreen[];
  activeScreenId: string;
  onSelectScreen: (screenId: string) => void;
  onOpenImportModal: () => void;
}

interface FeedItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  saved: boolean;
  summary: string;
}

const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: 'item-1',
    title: 'Moroccan Riad & Courtyard Escape',
    category: 'Retreats',
    location: 'Atlas Foothills, Marrakech',
    image: '/src/assets/images/screen_preview_mobile_1793279022768.jpg',
    rating: 4.96,
    reviewsCount: 142,
    pricePerNight: 280,
    saved: true,
    summary: 'A serene sanctuary featuring handcrafted zellij tilework, reflecting pool, and panoramic mountain views.'
  },
  {
    id: 'item-2',
    title: 'Minimalist Studio & Architectural Loft',
    category: 'Architecture',
    location: 'Kreuzberg, Berlin',
    image: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg',
    rating: 4.91,
    reviewsCount: 89,
    pricePerNight: 195,
    saved: false,
    summary: 'Exposed concrete ceilings, bespoke walnut workstations, and filtered diffused northern light.'
  },
  {
    id: 'item-3',
    title: 'Nordic Culinary Lab & Forest Tasting Room',
    category: 'Culinary',
    location: 'Bornholm Archipelago, Denmark',
    image: '/src/assets/images/screen_preview_analytics_1793279021632.jpg',
    rating: 4.98,
    reviewsCount: 215,
    pricePerNight: 340,
    saved: false,
    summary: 'Micro-seasonal 12-course foraging experience set within coastal pine groves and granite rocks.'
  }
];

export const InteractiveAppRunner: React.FC<InteractiveAppRunnerProps> = ({
  screens,
  activeScreenId,
  onSelectScreen,
  onOpenImportModal
}) => {
  const [device, setDevice] = useState<DeviceType>('mobile');
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<FeedItem | null>(null);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  
  // Custom pasted code runner state
  const [customCode, setCustomCode] = useState<string>('');
  const [isUsingCustomCode, setIsUsingCustomCode] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedSuccessNotice, setGeneratedSuccessNotice] = useState<string | null>(null);

  const categories = ['All', 'Retreats', 'Architecture', 'Culinary'];

  const filteredItems = feedItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, saved: !item.saved } : item))
    );
  };

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setActiveItem(null);
    }, 2200);
  };

  const currentScreen = screens.find(s => s.id === activeScreenId) || screens[0];

  return (
    <div className="flex flex-col flex-1 bg-neutral-950 min-h-[calc(100vh-65px)]">
      {/* Workspace Control Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Screen selector tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {screens.map(screen => (
            <button
              key={screen.id}
              onClick={() => {
                setIsUsingCustomCode(false);
                onSelectScreen(screen.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeScreenId === screen.id && !isUsingCustomCode
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <span>{screen.name}</span>
              <span className="text-[10px] uppercase font-mono text-neutral-400">
                {screen.type}
              </span>
            </button>
          ))}
          <button
            onClick={() => setIsUsingCustomCode(!isUsingCustomCode)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              isUsingCustomCode
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Pasted Stitch Code</span>
          </button>
        </div>

        {/* Viewport switcher & actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-md transition-colors ${
                device === 'mobile' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile (393px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-md transition-colors ${
                device === 'tablet' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-md transition-colors ${
                device === 'desktop' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenImportModal}
            className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Import from 15422726667412879968</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 p-6 md:p-10 flex items-center justify-center overflow-auto bg-neutral-950">
        {/* Device Frame */}
        <div
          className={`transition-all duration-300 flex flex-col bg-neutral-900 border border-neutral-800 shadow-2xl relative ${
            device === 'mobile'
              ? 'w-[393px] h-[830px] rounded-[48px] p-3 ring-8 ring-neutral-900/90'
              : device === 'tablet'
              ? 'w-[768px] h-[880px] rounded-[36px] p-4 ring-8 ring-neutral-900/90'
              : 'w-full max-w-5xl min-h-[750px] rounded-2xl border-neutral-800'
          }`}
        >
          {/* Mobile Island / Top Notch */}
          {device === 'mobile' && (
            <div className="w-full flex justify-between items-center px-6 pt-3 pb-2 text-neutral-400 text-xs font-mono select-none">
              <span>9:41</span>
              <div className="w-24 h-4 bg-neutral-950 rounded-full mx-auto" />
              <span>5G 100%</span>
            </div>
          )}

          {/* Screen Content Wrapper */}
          <div className="flex-1 overflow-y-auto bg-neutral-950 rounded-[32px] flex flex-col relative text-neutral-100">
            {/* If user enabled pasted Stitch code mode */}
            {isUsingCustomCode ? (
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">Custom Stitch Code Sandbox</h3>
                    <p className="text-xs text-neutral-400">
                      Paste HTML/Tailwind from Stitch project 15422726667412879968
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCustomCode(`
<div class="p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white min-h-full">
  <div class="flex items-center justify-between mb-6">
    <span class="text-xs font-mono text-blue-400 uppercase tracking-wider">Stitch Generation</span>
    <span class="text-xs text-neutral-400">Project 15422726667412879968</span>
  </div>
  <h2 class="text-2xl font-bold tracking-tight mb-2">Adaptive Creative Studio</h2>
  <p class="text-sm text-neutral-400 mb-6">Imported directly from Google Stitch canvas.</p>
  <div class="p-4 bg-neutral-900 border border-neutral-800 rounded-xl mb-4">
    <h3 class="font-medium text-white mb-1">Interactive Component</h3>
    <p class="text-xs text-neutral-400">Tailwind styles verified and active.</p>
  </div>
</div>
                      `.trim());
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 underline"
                  >
                    Load Sample Snippet
                  </button>
                </div>

                <textarea
                  value={customCode}
                  onChange={e => setCustomCode(e.target.value)}
                  placeholder="Paste HTML with Tailwind classes exported from Stitch project 15422726667412879968 here..."
                  className="w-full h-36 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500 mb-4"
                />

                <div className="flex-1 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  {customCode ? (
                    <div 
                      className="h-full overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: customCode }} 
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center text-neutral-500">
                      <Code2 className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-xs">No code pasted yet. Click &apos;Load Sample Snippet&apos; or paste code from Stitch.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : activeScreenId === 'screen-1' ? (
              /* SCREEN 1: DISCOVERY FEED */
              <div className="flex flex-col h-full">
                {/* Search & Top Action */}
                <div className="p-5 pb-3 border-b border-neutral-800/80 sticky top-0 bg-neutral-950/90 backdrop-blur-md z-10">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h2 className="text-lg font-bold tracking-tight text-white">Curated Spaces</h2>
                    <span className="text-xs text-neutral-400">14 spaces available</span>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search retreats, architecture, studios..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                    />
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-neutral-800 text-white border border-neutral-700'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feed Items */}
                <div className="p-5 space-y-5 flex-1 overflow-y-auto">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className="group cursor-pointer rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={e => toggleSave(item.id, e)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:scale-110 transition-transform"
                          aria-label="Save item"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              item.saved ? 'fill-red-500 text-red-500' : 'text-white'
                            }`}
                          />
                        </button>
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-medium text-neutral-200">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          <div className="text-xs font-mono tabular-nums text-neutral-300">
                            ★ {item.rating}
                          </div>
                        </div>

                        <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                          {item.summary}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 text-xs">
                          <span className="text-neutral-400">{item.location}</span>
                          <span className="font-semibold text-white">
                            ${item.pricePerNight} <span className="font-normal text-neutral-400">/ night</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredItems.length === 0 && (
                    <div className="py-12 text-center">
                      <p className="text-sm text-neutral-400 mb-2">No matching spaces found</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setSearchQuery('');
                        }}
                        className="text-xs text-blue-400 hover:underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom App Navigation Bar (inside mobile app) */}
                <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-3 flex items-center justify-around text-neutral-400">
                  <button 
                    onClick={() => onSelectScreen('screen-1')}
                    className="flex flex-col items-center gap-1 text-white"
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-[10px] font-medium">Discover</span>
                  </button>
                  <button 
                    onClick={() => onSelectScreen('screen-2')}
                    className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-medium">Telemetry</span>
                  </button>
                  <button 
                    onClick={() => onSelectScreen('screen-3')}
                    className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-medium">Studio</span>
                  </button>
                </div>
              </div>
            ) : activeScreenId === 'screen-2' ? (
              /* SCREEN 2: OPERATIONAL & TELEMETRY DASHBOARD */
              <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white">Operational Overview</h2>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <span>Stitch Project #15422726667412879968</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">Sync Latency: 42ms</span>
                    </div>
                  </div>

                  {/* Timeframe selector */}
                  <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                    {(['1h', '24h', '7d'] as const).map(tf => (
                      <button
                        key={tf}
                        onClick={() => setAnalyticsTimeframe(tf)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                          analyticsTimeframe === tf
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid with Tabular Numerals */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                    <div className="text-xs text-neutral-400 mb-1">Active Sessions</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-white">4,781</div>
                    <div className="text-[11px] text-emerald-400 mt-1 font-mono tabular-nums">+14.2% vs yesterday</div>
                  </div>
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                    <div className="text-xs text-neutral-400 mb-1">System Health</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-white">99.98%</div>
                    <div className="text-[11px] text-neutral-400 mt-1">Nominal state</div>
                  </div>
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                    <div className="text-xs text-neutral-400 mb-1">Data Throughput</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-white">1.62 TB/h</div>
                    <div className="text-[11px] text-neutral-400 mt-1 font-mono tabular-nums">Peak at 14:00</div>
                  </div>
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                    <div className="text-xs text-neutral-400 mb-1">Screens Rendered</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-white">14,290</div>
                    <div className="text-[11px] text-blue-400 mt-1">All cache hits</div>
                  </div>
                </div>

                {/* Telemetry Visual Graph */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">Traffic & Request Ingress</h3>
                    <span className="text-xs font-mono tabular-nums text-neutral-400">Sampling Interval: 60s</span>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="w-full h-44 relative flex items-end gap-1.5 pt-4">
                    {[38, 45, 42, 60, 54, 75, 82, 68, 92, 88, 95, 78, 84, 91, 89, 96, 85, 99].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div
                          style={{ height: `${val}%` }}
                          className="w-full bg-blue-600/70 hover:bg-blue-500 rounded-t transition-all group-hover:scale-y-105"
                          title={`Hour ${i}: ${val * 12} req/s`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-800/60 mt-2">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                  </div>
                </div>

                {/* Event Logs Table */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 overflow-hidden">
                  <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Recent Stitch Sync Events
                    </h3>
                    <span className="text-xs text-neutral-400">4 total</span>
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/20">
                        <th className="py-2.5 px-4 font-medium">Event Type</th>
                        <th className="py-2.5 px-4 font-medium">Target Screen</th>
                        <th className="py-2.5 px-4 font-medium">Payload Size</th>
                        <th className="py-2.5 px-4 font-medium">Timestamp</th>
                        <th className="py-2.5 px-4 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-white">Screen Generated</td>
                        <td className="py-2.5 px-4">/discover</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">24.5 KB</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">12m ago</td>
                        <td className="py-2.5 px-4 text-right text-emerald-400">Synchronized</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-white">Token Extracted</td>
                        <td className="py-2.5 px-4">DESIGN.md</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">8.2 KB</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">48m ago</td>
                        <td className="py-2.5 px-4 text-right text-emerald-400">Synchronized</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-white">Canvas Layout Saved</td>
                        <td className="py-2.5 px-4">Infinite Flow</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">16.8 KB</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">2h ago</td>
                        <td className="py-2.5 px-4 text-right text-emerald-400">Synchronized</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-white">Model Prompt Evaluated</td>
                        <td className="py-2.5 px-4">Workspace Flow</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">12.1 KB</td>
                        <td className="py-2.5 px-4 font-mono tabular-nums">3h ago</td>
                        <td className="py-2.5 px-4 text-right text-emerald-400">Synchronized</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeScreenId === 'screen-3' ? (
              /* SCREEN 3: STUDIO WORKSTATION & CREATION */
              <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
                <div className="pb-6 border-b border-neutral-800">
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">
                    Studio Workstation
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Generate screens, refine prompt specs, and configure component architecture for project 15422726667412879968.
                  </p>
                </div>

                {generatedSuccessNotice && (
                  <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{generatedSuccessNotice}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
                  {/* Studio Hero Feature */}
                  <div className="lg:col-span-2 rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/40 flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-neutral-900">
                      <img
                        src="/src/assets/images/hero_stitch_workspace_1793279020938.jpg"
                        alt="Studio Workspace"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                        <div>
                          <div className="text-xs font-mono text-neutral-300 mb-1">STITCH DESIGN AGENT</div>
                          <h3 className="text-lg font-bold text-white">Physical & Digital Design Bridge</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <label className="text-xs font-medium text-neutral-300 block mb-2">
                          Prompt Iteration on Project 15422726667412879968
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customPrompt}
                            onChange={e => setCustomPrompt(e.target.value)}
                            placeholder="e.g., Create a high-contrast minimalist audio playlist player with scrub bar..."
                            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={() => {
                              if (!customPrompt.trim()) return;
                              setGeneratedSuccessNotice(`Simulated prototype screen for "${customPrompt}" added to workspace!`);
                              setCustomPrompt('');
                              setTimeout(() => setGeneratedSuccessNotice(null), 4000);
                            }}
                            className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Iterate</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-neutral-400 pt-3 border-t border-neutral-800/80">
                        <span>Tokens Active: <strong className="text-white font-mono">10</strong></span>
                        <span>Separators: <strong className="text-white">Unboxed</strong></span>
                        <span>Engine: <strong className="text-white font-mono">Stitch boq-pitchfork</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Specs */}
                  <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/30 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Project Blueprint</h3>
                      <div className="space-y-3 text-xs text-neutral-300">
                        <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                          <span className="text-neutral-400">Project ID</span>
                          <span className="font-mono text-white">15422726667412879968</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                          <span className="text-neutral-400">Total Screens</span>
                          <span className="font-mono text-white">{screens.length}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                          <span className="text-neutral-400">Framework</span>
                          <span className="text-white">React 19 + Tailwind</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                          <span className="text-neutral-400">Design System</span>
                          <span className="text-white">DESIGN.md v1.2</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/80">
                      <button
                        onClick={onOpenImportModal}
                        className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl transition-colors text-center block"
                      >
                        Configure Stitch API Key
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* SCREEN 4: ITEM DETAIL & BOOKING FLOW */
              <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
                <button
                  onClick={() => onSelectScreen('screen-1')}
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white mb-4 w-fit transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Discover</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-square">
                    <img
                      src="/src/assets/images/screen_preview_mobile_1793279022768.jpg"
                      alt="Detail View"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
                        Curated Sanctuary
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                        Moroccan Riad & Courtyard Escape
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                        <span>Atlas Foothills, Marrakech</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">★ 4.96 (142 reviews)</span>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                        Designed with authentic hand-chiseled zellij tilework, restored cedar beam ceilings, and an interior fountain courtyard filled with olive and orange trees. Includes morning botanical tea service and access to the private hammam bathhouse.
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                          <span className="text-[11px] text-neutral-400 block mb-0.5">Atmosphere</span>
                          <span className="text-xs font-medium text-white">Quiet & Meditative</span>
                        </div>
                        <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                          <span className="text-[11px] text-neutral-400 block mb-0.5">Workspace</span>
                          <span className="text-xs font-medium text-white">Fiber Optic Wi-Fi</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-white font-mono tabular-nums">$280</div>
                        <div className="text-[11px] text-neutral-400">Total per night</div>
                      </div>

                      <button
                        onClick={handleBook}
                        className={`px-6 py-2.5 text-xs font-medium rounded-xl transition-all ${
                          isBooked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {isBooked ? 'Reservation Confirmed!' : 'Reserve Sanctuary'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Item Modal (from screen 1 click) */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="aspect-video relative overflow-hidden bg-neutral-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                <span className="text-xs font-mono tabular-nums text-neutral-300">
                  ★ {activeItem.rating}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">{activeItem.location}</p>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">{activeItem.summary}</p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div>
                  <span className="text-lg font-bold text-white font-mono tabular-nums">
                    ${activeItem.pricePerNight}
                  </span>
                  <span className="text-xs text-neutral-400"> / night</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onSelectScreen('screen-4');
                    }}
                    className="px-4 py-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-colors"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={handleBook}
                    className="px-5 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                  >
                    {isBooked ? 'Booked!' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
