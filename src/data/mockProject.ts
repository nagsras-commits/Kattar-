import { ProjectMetadata } from '../types';

export const INITIAL_PROJECT: ProjectMetadata = {
  id: '15422726667412879968',
  url: 'https://stitch.withgoogle.com/projects/15422726667412879968',
  title: 'Stitch Studio Experience',
  version: '1.2.0',
  author: 'Elena Vance',
  authorRole: 'Principal Product Designer',
  authorAvatar: '/src/assets/images/designer_avatar_1793279022211.jpg',
  createdDate: '2026-10-18',
  updatedDate: '2026-10-29',
  activeScreenId: 'screen-1',
  screens: [
    {
      id: 'screen-1',
      name: 'Discover & Curation Feed',
      slug: '/discover',
      type: 'mobile',
      description: 'Primary mobile discovery feed with curated editorial items, search filters, and smooth card transitions.',
      thumbnail: '/src/assets/images/screen_preview_mobile_1793279022768.jpg',
      route: '/',
      status: 'published',
      componentsCount: 14,
      lastEdited: '12 mins ago',
      codeSnippet: `export function DiscoverFeed() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold tracking-tight">Discover</h1>
        <button className="text-xs text-neutral-400 hover:text-white">Filter</button>
      </header>
      <div className="space-y-4">
        {/* Curated Feed Items */}
      </div>
    </div>
  );
}`
    },
    {
      id: 'screen-2',
      name: 'Operational & Telemetry Overview',
      slug: '/analytics',
      type: 'web',
      description: 'High-density operational monitoring dashboard with data throughput, system health, and traffic curves.',
      thumbnail: '/src/assets/images/screen_preview_analytics_1793279021632.jpg',
      route: '/analytics',
      status: 'published',
      componentsCount: 22,
      lastEdited: '1 hour ago',
      codeSnippet: `export function TelemetryDashboard() {
  return (
    <div className="p-8 bg-neutral-900 text-neutral-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Operational Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Metric cards with tabular-nums */}
      </div>
    </div>
  );
}`
    },
    {
      id: 'screen-3',
      name: 'Studio Workstation & Creation',
      slug: '/studio',
      type: 'web',
      description: 'Physical & digital workspace interface with multi-modal inputs, layout balancing, and prompt engineering.',
      thumbnail: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg',
      route: '/studio',
      status: 'published',
      componentsCount: 18,
      lastEdited: '3 hours ago',
      codeSnippet: `export function StudioWorkspace() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="border border-neutral-800 rounded-xl p-8 bg-neutral-900/60">
        <h3 className="text-xl font-semibold mb-2">Hardware Studio Flow</h3>
        <p className="text-sm text-neutral-400">Tactile workstation integration.</p>
      </div>
    </div>
  );
}`
    },
    {
      id: 'screen-4',
      name: 'Item Detail & Interaction View',
      slug: '/detail',
      type: 'mobile',
      description: 'Deep-dive detail sheet featuring high-res imagery, tactile attributes, user reviews, and instant checkout action.',
      thumbnail: '/src/assets/images/screen_preview_mobile_1793279022768.jpg',
      route: '/items/:id',
      status: 'draft',
      componentsCount: 11,
      lastEdited: 'Yesterday',
      codeSnippet: `export function ItemDetailModal({ item, onClose }: DetailProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6">
        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
        <p className="text-sm text-neutral-400 mb-6">{item.summary}</p>
      </div>
    </div>
  );
}`
    }
  ],
  tokens: [
    {
      name: 'Canvas Background',
      category: 'color',
      value: '#090a0f',
      cssVariable: '--color-bg-canvas',
      description: '60% dominant canvas tone providing high-contrast depth without harsh black clipping.'
    },
    {
      name: 'Surface Subtle',
      category: 'color',
      value: '#13151b',
      cssVariable: '--color-surface-subtle',
      description: '30% structural surface for panels, card containers, and toolbars.'
    },
    {
      name: 'Surface Elevated',
      category: 'color',
      value: '#1c1f26',
      cssVariable: '--color-surface-elevated',
      description: 'Modal and dropdown elevated surfaces with single-elevation depth.'
    },
    {
      name: 'Primary Accent',
      category: 'color',
      value: '#3b82f6',
      cssVariable: '--color-accent-primary',
      description: '10% accent budget for primary interactive actions and active filter states.'
    },
    {
      name: 'Hairline Border',
      category: 'color',
      value: 'rgba(255, 255, 255, 0.08)',
      cssVariable: '--color-border-hairline',
      description: 'Subtle 1px edge definition replacing thick card shadows.'
    },
    {
      name: 'Display Face',
      category: 'typography',
      value: 'Plus Jakarta Sans, sans-serif',
      cssVariable: '--font-display',
      description: 'Expressive neo-grotesque display face for headlines and brand mark.'
    },
    {
      name: 'Body Face',
      category: 'typography',
      value: 'DM Sans, sans-serif',
      cssVariable: '--font-body',
      description: 'High-legibility humanist sans for body prose and scannable interface text.'
    },
    {
      name: 'Tabular Numerals',
      category: 'typography',
      value: 'JetBrains Mono, monospace',
      cssVariable: '--font-mono',
      description: 'Vertical figure alignment for metrics, latency, and counts.'
    },
    {
      name: 'Base Radius',
      category: 'radius',
      value: '12px',
      cssVariable: '--radius-base',
      description: 'Standard container outer radius adhering to r_inner = r_outer - padding math.'
    },
    {
      name: 'Container Padding',
      category: 'spacing',
      value: '24px',
      cssVariable: '--spacing-container',
      description: 'Outer container padding ensuring outer padding >= inner child gap.'
    }
  ]
};
