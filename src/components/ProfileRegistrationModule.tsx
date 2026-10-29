import React, { useState } from 'react';
import { ServiceProvider, ProfessionCategory, OrganizationType } from '../types/kattar';
import { OrgBadge, DevineIntelligenceSeal } from './OrgBadges';
import { 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  Sun, 
  Moon, 
  Check, 
  ShieldCheck, 
  Upload, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ProfileRegistrationModuleProps {
  onRegisterNewProvider: (provider: ServiceProvider) => void;
}

export const ProfileRegistrationModule: React.FC<ProfileRegistrationModuleProps> = ({
  onRegisterNewProvider,
}) => {
  const [activeMode, setActiveMode] = useState<'view' | 'register'>('view');
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('Rahul Sharma');
  const [phone, setPhone] = useState<string>('+91 98450 77123');
  const [religion, setReligion] = useState<'Hindu'>('Hindu');
  const [organization, setOrganization] = useState<OrganizationType>('rss');
  const [profession, setProfession] = useState<ProfessionCategory>('Rider');
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [startTime, setStartTime] = useState<string>('08:00 AM');
  const [endTime, setEndTime] = useState<string>('08:00 PM');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(150);
  const [about, setAbout] = useState<string>('Dedicated community logistics rider for medicine, food drops, and emergency assistance.');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([
    'Instant Medicine Drop',
    'Elderly Assistance',
    'Express Delivery'
  ]);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const allProfessions: ProfessionCategory[] = [
    'Electrician',
    'Priest',
    'Plumbing',
    'Maintenance',
    'Health / Medical Services',
    'Education / Tutoring',
    'Legal / Advisory',
    'Delivery Partner',
    'Rider',
    'Porter',
    'Driver',
    'Police',
    'RSS Representative',
    'VHP Sevadal',
    'Bajrang Dal Seva',
    'ABVP Student Lead',
    'AISF Student Lead',
    'Hindu Welfare Agency'
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const newProv: ServiceProvider = {
      id: `prov-${Date.now()}`,
      name,
      phone,
      profession,
      organization,
      orgBadgeLabel: organization.toUpperCase(),
      religion: 'Hindu',
      avatar: '/src/assets/images/designer_avatar_1793279022211.jpg',
      rating: 5.0,
      reviewCount: 1,
      distanceKm: 2.1,
      area: 'Indiranagar 5-10km',
      isAvailableNow: true,
      serviceRadiusKm: radiusKm,
      availabilityDays: selectedDays,
      availabilityTime: { start: startTime, end: endTime },
      experienceYears,
      specializations: selectedSpecializations,
      hourlyRateInr: hourlyRate,
      verifiedByDevine: true,
      about,
      completedJobsCount: 1,
      communityHelpsCount: 1,
      coordinates: { lat: 12.9716, lng: 77.6412 }
    };

    onRegisterNewProvider(newProv);
    setIsSuccess(true);
  };

  return (
    <div className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="max-w-4xl mx-auto">
        {/* Toggle between viewing existing profile and progressive registration */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-1">
              {activeMode === 'view' ? 'User Profile & Identity' : 'Provider Registration'}
            </h1>
            <p className="text-xs text-neutral-400">
              Verified local 5-10km community service network with Devine Intelligence verification.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              onClick={() => {
                setActiveMode('view');
                setIsSuccess(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeMode === 'view'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => {
                setActiveMode('register');
                setIsSuccess(false);
                setStep(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeMode === 'register'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Register as Provider
            </button>
          </div>
        </div>

        {/* MODE 1: USER PROFILE VIEW (Rahul's verified profile as requested in transcript) */}
        {activeMode === 'view' && (
          <div className="space-y-6">
            {/* Main Profile Header Card */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src="/src/assets/images/designer_avatar_1793279022211.jpg"
                    alt="Rahul"
                    className="w-20 h-20 rounded-full object-cover border-2 border-orange-500 shadow-xl"
                  />
                  <span className="w-4 h-4 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-4 ring-neutral-900" title="Available Now" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">Rahul Verma</h2>
                    <DevineIntelligenceSeal size="sm" />
                  </div>
                  <p className="text-xs text-orange-400 font-semibold mb-2">
                    Verified Community Provider · Logistics & Support
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <OrgBadge type="rss" label="RSS Swayamsevak" size="sm" />
                    <OrgBadge type="vhp" label="VHP Sevadal" size="sm" />
                    <span className="text-xs text-neutral-400 font-mono">Religion: Hindu</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="text-xs text-neutral-400">Indiranagar 12th Main · 5-10km Radius</div>
                <button
                  onClick={() => {
                    setActiveMode('register');
                    setStep(1);
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Edit Provider Settings
                </button>
              </div>
            </div>

            {/* Trust-Building Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Completed Services</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">120+</span>
                <span className="text-[10px] text-emerald-400 block mt-1">100% verified</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Community Helps</span>
                <span className="text-2xl font-black text-orange-400 font-mono tabular-nums">50+</span>
                <span className="text-[10px] text-neutral-400 block mt-1">Free dharmic seva</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Community Rating</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">★ 4.96</span>
                <span className="text-[10px] text-neutral-400 block mt-1">84 reviews</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                <span className="text-[11px] text-neutral-400 block mb-1">Service Radius</span>
                <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">10 km</span>
                <span className="text-[10px] text-neutral-400 block mt-1">Concentric coverage</span>
              </div>
            </div>

            {/* Professional Details & Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-3">
                <h3 className="text-sm font-bold text-white mb-2">Availability & Timings</h3>
                <div className="flex justify-between py-2 border-b border-neutral-800/80 text-xs">
                  <span className="text-neutral-400">Active Days</span>
                  <span className="font-semibold text-white">Mon, Tue, Wed, Thu, Fri, Sat, Sun</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800/80 text-xs">
                  <span className="text-neutral-400">Operational Hours</span>
                  <span className="font-semibold text-white font-mono">07:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800/80 text-xs">
                  <span className="text-neutral-400">Current Live State</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available Now for Requests
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30">
                <h3 className="text-sm font-bold text-white mb-3">Verified Specializations</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    'Instant Medicine Drop',
                    'Elderly Assistance',
                    'Express Document Delivery',
                    'Temple Prasad Transit',
                    'Neighborhood Emergency Aid'
                  ].map(spec => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-neutral-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  &quot;Always available on two-wheeler across Indiranagar, Domlur, and HAL. Quick turnarounds for community needs.&quot;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: MULTI-STEP PROGRESSIVE REGISTRATION FLOW */}
        {activeMode === 'register' && !isSuccess && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-8">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                        step === s
                          ? 'bg-orange-600 text-white ring-4 ring-orange-500/20'
                          : step > s
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-xs font-medium ${step === s ? 'text-white' : 'text-neutral-500'}`}>
                      {s === 1 ? 'Identity' : s === 2 ? 'Area & Timings' : 'Profession'}
                    </span>
                    {s < 3 && <div className="w-8 h-[1px] bg-neutral-800" />}
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono text-neutral-400">Step {step} of 3</div>
            </div>

            <form onSubmit={step === 3 ? handleCompleteRegistration : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* STEP 1: IDENTITY & RELIGION */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Full Name (as on Government ID)
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Mobile Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98450 12345"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Religion (Community Criteria)
                      </label>
                      <select
                        value={religion}
                        onChange={e => setReligion(e.target.value as 'Hindu')}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="Hindu">Hindu (Sanatan Dharma)</option>
                      </select>
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Verified per KATTAR community charter.
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Organization Affiliation (Optional Badge)
                      </label>
                      <select
                        value={organization}
                        onChange={e => setOrganization(e.target.value as OrganizationType)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="rss">RSS (Rashtriya Swayamsevak Sangh)</option>
                        <option value="vhp">VHP (Vishwa Hindu Parishad)</option>
                        <option value="bajrangdal">Bajrang Dal Seva</option>
                        <option value="police">Police Department Liaison</option>
                        <option value="abvp">ABVP Student Union</option>
                        <option value="aisf">AISF Student Lead</option>
                        <option value="welfare">Hindu Welfare Agency</option>
                      </select>
                    </div>
                  </div>

                  {/* Document upload slot */}
                  <div className="pt-2">
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      Identity Document for Devine Intelligence Verification
                    </label>
                    <div className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 text-center cursor-pointer bg-neutral-950/50">
                      <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2 opacity-80" />
                      <p className="text-xs font-semibold text-white">Upload Aadhaar, Voter ID, or License</p>
                      <p className="text-[11px] text-neutral-500 mt-1">PNG, JPG, PDF up to 10MB (Automated 98% Smart Match)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SERVICE AREA & TIMINGS */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Service Radius Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-neutral-300">
                        Service Radius Coverage
                      </label>
                      <span className="text-sm font-bold text-orange-400 font-mono tabular-nums">
                        {radiusKm} km radius
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="10"
                      step="1"
                      value={radiusKm}
                      onChange={e => setRadiusKm(Number(e.target.value))}
                      className="w-full accent-orange-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                      <span>5 km (Local layout)</span>
                      <span>10 km (Maximum community radius)</span>
                    </div>
                  </div>

                  {/* Availability Days */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-2">
                      Working Days of the Week
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map(d => {
                        const isSelected = selectedDays.includes(d);
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => toggleDay(d)}
                            className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                              isSelected
                                ? 'bg-orange-600 border-orange-500 text-white shadow'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Start & End Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Daily Start Time
                      </label>
                      <div className="relative">
                        <Sun className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Daily End Time
                      </label>
                      <div className="relative">
                        <Moon className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={endTime}
                          onChange={e => setEndTime(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PROFESSIONAL DETAILS */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Primary Profession / Service Role
                      </label>
                      <select
                        value={profession}
                        onChange={e => setProfession(e.target.value as ProfessionCategory)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        {allProfessions.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={experienceYears}
                        onChange={e => setExperienceYears(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      Hourly Rate / Service Base Fee (₹ INR)
                    </label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={e => setHourlyRate(Number(e.target.value))}
                      placeholder="e.g. 350 (0 for voluntary seva)"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      Professional Narrative & Approach
                    </label>
                    <textarea
                      value={about}
                      onChange={e => setAbout(e.target.value)}
                      placeholder="Describe your service ethos, tools, and experience..."
                      className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-6 border-t border-neutral-800 flex justify-between items-center mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white rounded-xl flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>{step === 3 ? 'Complete Registration' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* REGISTRATION SUCCESS CONFIRMATION */}
        {activeMode === 'register' && isSuccess && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 text-center max-w-lg mx-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto mb-4 relative flex items-center justify-center">
              <img
                src="/assets/aistudio/screen_0dd7bf8b.png"
                alt="KATTAR App Icon"
                className="w-16 h-16 object-contain drop-shadow-xl"
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Registration Submitted!</h2>
            <div className="mb-4">
              <DevineIntelligenceSeal size="md" />
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-6">
              Your profile for <strong className="text-white">{name}</strong> ({profession}) has been registered for the local 5-10km Indiranagar network.
            </p>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Smart Match Status:</span>
                <span className="text-emerald-400 font-mono font-bold">98% Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Coverage Radius:</span>
                <span className="text-white font-mono">{radiusKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Badge Assigned:</span>
                <span className="text-orange-400 font-semibold">{organization.toUpperCase()}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveMode('view')}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              View My Verified Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
