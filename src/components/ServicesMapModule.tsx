import React, { useState } from 'react';
import { ServiceProvider, ProfessionCategory } from '../types/kattar';
import { OrgBadge, DevineIntelligenceSeal } from './OrgBadges';
import { 
  MapPin, 
  Search, 
  Star, 
  Phone, 
  MessageSquare, 
  Navigation, 
  SlidersHorizontal, 
  Clock, 
  CheckCircle2, 
  Shield, 
  Compass, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ServicesMapModuleProps {
  providers: ServiceProvider[];
  onStartChatWithProvider: (provider: ServiceProvider) => void;
  activeLocation: string;
}

export const ServicesMapModule: React.FC<ServicesMapModuleProps> = ({
  providers,
  onStartChatWithProvider,
  activeLocation,
}) => {
  const [availableOnly, setAvailableOnly] = useState<boolean>(true);
  const [selectedProfession, setSelectedProfession] = useState<string>('All');
  const [radiusKm, setRadiusKm] = useState<number>(8);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProviderId, setSelectedProviderId] = useState<string>(providers[0]?.id || '');
  const [isLiveTrackingActive, setIsLiveTrackingActive] = useState<boolean>(false);
  const [trackingEta, setTrackingEta] = useState<number>(6);

  const professions = [
    'All',
    'Plumbing',
    'Electrician',
    'Priest',
    'Police',
    'Rider',
    'Education / Tutoring',
    'Hindu Welfare Agency'
  ];

  const filteredProviders = providers.filter(p => {
    if (availableOnly && !p.isAvailableNow) return false;
    if (selectedProfession !== 'All' && p.profession !== selectedProfession) return false;
    if (p.distanceKm > radiusKm) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchProf = p.profession.toLowerCase().includes(q);
      const matchArea = p.area.toLowerCase().includes(q);
      if (!matchName && !matchProf && !matchArea) return false;
    }
    return true;
  });

  const selectedProvider = providers.find(p => p.id === selectedProviderId) || filteredProviders[0];

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 overflow-hidden min-h-[calc(100vh-65px)]">
      {/* Top Filter & Radius Controls Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">{activeLocation}</h2>
          </div>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs font-mono text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
            Radius: {radiusKm} km
          </span>
        </div>

        {/* Real-Time "Available Now" Toggle Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Radius Filter:</span>
            <input
              type="range"
              min="3"
              max="10"
              value={radiusKm}
              onChange={e => setRadiusKm(Number(e.target.value))}
              className="w-24 accent-orange-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono tabular-nums text-white">{radiusKm}km</span>
          </div>

          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
              availableOnly
                ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${availableOnly ? 'bg-emerald-300 animate-ping' : 'bg-neutral-500'}`} />
            <span>Available Now</span>
          </button>
        </div>
      </div>

      {/* Main Split: Left Map Visualization, Right Service Provider Directory */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT: Spatial Interactive Map Canvas */}
        <div className="flex-1 bg-neutral-950 relative flex items-center justify-center p-6 overflow-hidden border-r border-neutral-800">
          {/* Concentric 5-10km radius circles overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[520px] h-[520px] rounded-full border border-orange-500/10 flex items-center justify-center">
              <span className="text-[10px] font-mono text-orange-500/40 absolute top-2">10 km boundary</span>
              <div className="w-[380px] h-[380px] rounded-full border border-orange-500/15 flex items-center justify-center">
                <span className="text-[10px] font-mono text-orange-500/40 absolute top-2">7 km radius</span>
                <div className="w-[240px] h-[240px] rounded-full border border-orange-500/20 flex items-center justify-center bg-orange-500/5">
                  <span className="text-[10px] font-mono text-orange-500/50 absolute top-2">5 km local core</span>
                  {/* User central location pin */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center shadow-lg shadow-orange-600/40 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1 bg-neutral-900/90 px-2 py-0.5 rounded shadow">
                      You (Indiranagar)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Service Provider Pins */}
          <div className="relative w-full h-full max-w-2xl max-h-[550px] pointer-events-auto">
            {filteredProviders.map((p, idx) => {
              const isSelected = p.id === selectedProviderId;
              // deterministic positioning on map
              const angles = [45, 120, 210, 290, 80, 160, 340];
              const angle = angles[idx % angles.length] * (Math.PI / 180);
              const distanceRatio = (p.distanceKm / 10) * 220;
              const x = Math.cos(angle) * distanceRatio;
              const y = Math.sin(angle) * distanceRatio;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProviderId(p.id)}
                  style={{
                    transform: `translate(calc(50% + ${x}px), calc(50% + ${y}px))`
                  }}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-115 group -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className={`flex flex-col items-center ${isSelected ? 'scale-110' : ''}`}>
                    <div className={`p-1.5 rounded-full border-2 transition-all shadow-xl ${
                      isSelected
                        ? 'bg-orange-600 border-white ring-4 ring-orange-500/30'
                        : 'bg-neutral-900 border-orange-500 hover:border-white'
                    }`}>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-md bg-neutral-950/90 border border-neutral-800 text-[10px] font-bold text-white whitespace-nowrap shadow">
                      {p.name.split(' ')[0]} ({p.distanceKm}km)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Selected Provider Card at bottom of map */}
          {selectedProvider && (
            <div className="absolute bottom-6 left-6 right-6 max-w-xl mx-auto bg-neutral-900/95 border border-neutral-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md z-30 animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedProvider.avatar}
                      alt={selectedProvider.name}
                      className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                    />
                    {selectedProvider.isAvailableNow && (
                      <span className="w-3 h-3 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-neutral-900" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{selectedProvider.name}</h3>
                      {selectedProvider.verifiedByDevine && (
                        <DevineIntelligenceSeal size="sm" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                      <span className="text-orange-400 font-medium">{selectedProvider.profession}</span>
                      <span>·</span>
                      <span>{selectedProvider.area}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums text-white">★ {selectedProvider.rating} ({selectedProvider.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-orange-400 block">
                    {selectedProvider.distanceKm} km away
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {selectedProvider.hourlyRateInr > 0 ? `₹${selectedProvider.hourlyRateInr}/hr` : 'Free Seva'}
                  </span>
                </div>
              </div>

              {/* Specializations & Badge */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 mb-3">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {selectedProvider.organization && (
                    <OrgBadge type={selectedProvider.organization} size="sm" />
                  )}
                  <span className="text-[11px] text-neutral-400 truncate max-w-[240px]">
                    {selectedProvider.specializations.slice(0, 2).join(' · ')}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>{selectedProvider.availabilityTime.start} - {selectedProvider.availabilityTime.end}</span>
                </div>
              </div>

              {/* Action Buttons: Quick Chat, Call, and Live Tracking */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onStartChatWithProvider(selectedProvider)}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Quick Chat</span>
                </button>

                <a
                  href={`tel:${selectedProvider.phone}`}
                  className="py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => setIsLiveTrackingActive(true)}
                  className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5"
                  title="Watch provider rushing to your location"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Live</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Service Provider Directory & Category Filtering (400px) */}
        <div className="w-full lg:w-[420px] bg-neutral-950 flex flex-col shrink-0">
          {/* Header & Category Pills */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/40">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">Local Service Directory</h3>
              <span className="text-xs font-mono text-neutral-400">{filteredProviders.length} nearby</span>
            </div>

            {/* Profession Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
              {professions.map(prof => (
                <button
                  key={prof}
                  onClick={() => setSelectedProfession(prof)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedProfession === prof
                      ? 'bg-neutral-800 text-orange-400 border border-orange-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {prof}
                </button>
              ))}
            </div>
          </div>

          {/* List of Nearby Providers */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-900 p-3 space-y-2">
            {filteredProviders.map(p => {
              const isSelected = p.id === selectedProviderId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProviderId(p.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-orange-500/60 shadow-lg'
                      : 'bg-neutral-900/30 border-neutral-800/80 hover:bg-neutral-900/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {p.isAvailableNow && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-neutral-950" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{p.name}</h4>
                          {p.verifiedByDevine && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                          )}
                        </div>
                        <p className="text-[11px] text-orange-400 font-medium">{p.profession}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white tabular-nums">
                        {p.distanceKm} km
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        ★ {p.rating}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 mb-2 leading-relaxed">
                    {p.about}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 text-xs">
                    {p.organization ? (
                      <OrgBadge type={p.organization} size="sm" />
                    ) : (
                      <span className="text-[10px] text-neutral-400">{p.area}</span>
                    )}

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onStartChatWithProvider(p);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Connect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIVE SERVICE TRACKING OVERLAY */}
      {isLiveTrackingActive && selectedProvider && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Service Rush Tracker</h3>
              </div>
              <button
                onClick={() => setIsLiveTrackingActive(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={selectedProvider.avatar}
                alt={selectedProvider.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{selectedProvider.name}</h4>
                  <DevineIntelligenceSeal size="sm" />
                </div>
                <p className="text-xs text-orange-400 font-medium">{selectedProvider.profession}</p>
                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{selectedProvider.phone}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 mb-6 text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono tabular-nums mb-1">
                {trackingEta} Mins
              </div>
              <p className="text-xs text-neutral-300 font-medium">Estimated Arrival Time</p>
              <p className="text-[11px] text-neutral-400 mt-1">
                Navigating via Indiranagar 100ft Road on two-wheeler
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Job confirmed and tools prepared</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>En route in your 5-10km service area</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-neutral-800 flex gap-3">
              <a
                href={`tel:${selectedProvider.phone}`}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl text-center transition-colors"
              >
                Call Provider
              </a>
              <button
                onClick={() => {
                  setIsLiveTrackingActive(false);
                  onStartChatWithProvider(selectedProvider);
                }}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl transition-colors text-center"
              >
                Open Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
