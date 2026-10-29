import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Phone, 
  Radio, 
  CheckCircle2, 
  Navigation, 
  Users, 
  X,
  Volume2,
  VolumeX,
  HeartPulse,
  Flame,
  Shield
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: string;
  onBroadcastSOS: (sosData: {
    type: string;
    location: string;
    description: string;
  }) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  activeLocation,
  onBroadcastSOS,
}) => {
  const [selectedType, setSelectedType] = useState<string>('Physical Threat / Security');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isBroadcastActive, setIsBroadcastActive] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [respondersCount, setRespondersCount] = useState<number>(4);

  // Sound generator using Web Audio API
  const playSirenChirp = () => {
    if (isAudioMuted || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      playSirenChirp();
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      triggerActiveBroadcast();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const emergencyTypes = [
    {
      id: 'Physical Threat / Security',
      label: 'Security & Physical Threat',
      icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
      desc: 'Dispatches Police Liaison, VHP & Bajrang Dal Youth Seva'
    },
    {
      id: 'Medical Emergency / Ambulance',
      label: 'Medical / Ambulance Needed',
      icon: <HeartPulse className="w-4 h-4 text-emerald-400" />,
      desc: 'Dispatches 108 Ambulance + Hindu Seva Samiti First Responders'
    },
    {
      id: 'Critical Blood / Organ Requirement',
      label: 'Urgent Blood Requirement',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      desc: 'Broadcasts emergency notification to verified donors in 5-10km'
    },
    {
      id: 'Accident / Rescue',
      label: 'Road Accident / Rescue',
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      desc: 'Alerts nearest KATTAR riders and volunteers on two-wheelers'
    }
  ];

  const handleStartCountdown = () => {
    setCountdown(3);
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
  };

  const triggerActiveBroadcast = () => {
    setCountdown(null);
    setIsBroadcastActive(true);
    playSirenChirp();
    onBroadcastSOS({
      type: selectedType,
      location: `${activeLocation} (12.9716° N, 77.6412° E)`,
      description: `Immediate emergency assistance requested for: ${selectedType}.`
    });
  };

  const handleResolveSOS = () => {
    setIsBroadcastActive(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-red-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border-2 border-red-500/80 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-5 border-b border-red-500/30 bg-gradient-to-r from-red-950 via-neutral-900 to-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/screen_0dd7bf8b.png"
              alt="KATTAR App Icon"
              className="w-9 h-9 object-contain drop-shadow"
            />
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-wider text-white flex items-center gap-2">
                <span>EMERGENCY SOS BROADCAST</span>
              </h2>
              <p className="text-[11px] text-red-300 font-mono">
                Local 5-10km Community Rapid Response Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              title={isAudioMuted ? 'Unmute siren sound' : 'Mute siren sound'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isBroadcastActive ? (
            <div className="space-y-5">
              {/* Live Location Stamp */}
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Broadcast Origin</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      GPS LOCKED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-0.5 font-medium">{activeLocation}</p>
                  <p className="text-[10px] text-neutral-500 font-mono">12.9716° N, 77.6412° E · 5-10km Radius</p>
                </div>
              </div>

              {/* Emergency Category Selector */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-2">
                  Select Emergency Category:
                </label>
                <div className="space-y-2">
                  {emergencyTypes.map(t => {
                    const isSelected = selectedType === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-red-950/40 border-red-500 text-white shadow-md'
                            : 'bg-neutral-950 border-neutral-800 hover:bg-neutral-800/60 text-neutral-300'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 mt-0.5">
                          {t.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold">{t.label}</h4>
                          <p className="text-[11px] text-neutral-400 mt-0.5">{t.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                          isSelected ? 'bg-red-600 border-red-500' : 'border-neutral-700'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Countdown or Trigger Button */}
              {countdown !== null ? (
                <div className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 text-center space-y-3 animate-pulse">
                  <div className="text-4xl font-black text-white font-mono">{countdown}</div>
                  <p className="text-xs font-bold text-red-200">
                    Broadcasting SOS to nearby Police & Verified Community in {countdown}s...
                  </p>
                  <button
                    onClick={handleCancelCountdown}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    Cancel (False Alarm)
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={handleStartCountdown}
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-500 hover:to-orange-500 text-white text-sm font-black rounded-2xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <Radio className="w-5 h-5 animate-pulse" />
                    <span>Send Immediate SOS Broadcast</span>
                  </button>
                  <p className="text-center text-[10px] text-neutral-400 font-mono">
                    Notifies Police Liaison, Hindu Welfare Agency, and nearby 5-10km verified members.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE BROADCAST LIVE TRACKER */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-red-950 border border-red-500/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <div>
                    <h3 className="text-sm font-bold text-white">SOS BROADCAST ACTIVE</h3>
                    <p className="text-[11px] text-red-300">
                      Dispatched across 5-10km {activeLocation}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-white bg-red-600 px-2.5 py-1 rounded-md">
                  LIVE
                </span>
              </div>

              {/* Responders En Route */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-white">Community Responders Dispatched:</span>
                  <span className="font-mono text-emerald-400 font-bold">{respondersCount} Acknowledged</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Inspector Vikram Patil</h4>
                        <p className="text-[10px] text-neutral-400">Police Liaison · 2.9km away</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">En Route (3m)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <HeartPulse className="w-4 h-4 text-red-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Hindu Seva Samiti Emergency Cell</h4>
                        <p className="text-[10px] text-neutral-400">Ambulance Unit · 3.8km away</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">En Route (5m)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-orange-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Bajrang Dal Yuva Seva Team</h4>
                        <p className="text-[10px] text-neutral-400">4 Community Volunteers · Indiranagar</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">Arriving</span>
                  </div>
                </div>
              </div>

              {/* Direct Emergency Dials */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:100"
                  className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Call 100 (Police)</span>
                </a>
                <a
                  href="tel:108"
                  className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>Call 108 (Ambulance)</span>
                </a>
              </div>

              {/* Resolve Button */}
              <button
                onClick={handleResolveSOS}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Emergency as Resolved (I Am Safe)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
