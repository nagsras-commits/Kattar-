import React, { useState } from 'react';
import { CommunityNewsItem } from '../types/kattar';
import { DevineIntelligenceSeal } from './OrgBadges';
import { 
  Bell, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Share2, 
  Heart,
  X
} from 'lucide-react';

interface CommunityNewsModuleProps {
  newsItems: CommunityNewsItem[];
  onOpenArticle: (item: CommunityNewsItem) => void;
}

export const CommunityNewsModule: React.FC<CommunityNewsModuleProps> = ({
  newsItems,
  onOpenArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<CommunityNewsItem | null>(null);
  const [attendingEvents, setAttendingEvents] = useState<string[]>([]);
  const [sharedNotice, setSharedNotice] = useState<string | null>(null);

  const categories = ['All', 'Urgent Alert', 'Temple & Dharma', 'Events'];

  const filteredNews = newsItems.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const toggleAttend = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttendingEvents(prev =>
      prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-5 h-5 text-orange-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">
                Community News & Local Announcements
              </h1>
            </div>
            <p className="text-xs text-neutral-400">
              Verified local bulletins, temple updates, and emergency notices for 5-10km Indiranagar residents.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-orange-400 border border-orange-500/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Urgent Alert Banner if present */}
        {newsItems.filter(n => n.isUrgent).map(urgent => (
          <div
            key={urgent.id}
            onClick={() => setActiveArticle(urgent)}
            className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-red-950/70 to-neutral-900 border border-red-500/40 shadow-xl flex items-start justify-between gap-4 group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase font-mono">
                    High-Priority Alert
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{urgent.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                  {urgent.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                  {urgent.summary}
                </p>
              </div>
            </div>

            <button className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shrink-0 transition-colors">
              Help Now
            </button>
          </div>
        ))}

        {/* News & Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map(item => {
            const isAttending = attendingEvents.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setActiveArticle(item)}
                className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all overflow-hidden flex flex-col justify-between"
              >
                {item.imageUrl && (
                  <div className="aspect-[16/9] relative overflow-hidden bg-neutral-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-medium text-orange-400 border border-neutral-800">
                      {item.category}
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                      <span className="text-orange-400 font-semibold">{item.source}</span>
                      <span className="font-mono">{item.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-orange-400 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="truncate max-w-[180px]">{item.location}</span>
                    </div>

                    <button
                      onClick={e => toggleAttend(item.id, e)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        isAttending
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{isAttending ? 'Attending' : 'RSVP'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ARTICLE DETAIL MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {activeArticle.imageUrl && (
              <div className="aspect-[16/9] relative overflow-hidden bg-neutral-950">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-orange-400 font-bold">{activeArticle.source}</span>
                <span className="font-mono text-neutral-400">{activeArticle.date}</span>
              </div>

              <h2 className="text-lg font-bold text-white mb-3">{activeArticle.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                <DevineIntelligenceSeal size="sm" />
                <span className="text-xs text-neutral-400">· {activeArticle.location}</span>
              </div>

              <div className="text-xs text-neutral-300 leading-relaxed space-y-3 mb-6 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
                <p>{activeArticle.content}</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setSharedNotice(`Article shared with Indiranagar community!`);
                    setTimeout(() => setSharedNotice(null), 2500);
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{sharedNotice ? 'Shared!' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
