import React from 'react';
import { OrganizationType } from '../types/kattar';
import { Shield, Flag, Sparkles, BookOpen, Heart, Award } from 'lucide-react';

interface OrgBadgeProps {
  type?: OrganizationType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const OrgBadge: React.FC<OrgBadgeProps> = ({
  type,
  label,
  size = 'md',
  showLabel = true,
}) => {
  if (!type) return null;

  let icon = <Sparkles className="w-3.5 h-3.5" />;
  let defaultLabel = 'Community Member';
  let badgeClasses = 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  switch (type) {
    case 'police':
      icon = <Shield className="w-3.5 h-3.5 text-blue-400" />;
      defaultLabel = 'Police Department';
      badgeClasses = 'text-blue-300 bg-blue-500/10 border-blue-500/20';
      break;
    case 'rss':
      icon = <Flag className="w-3.5 h-3.5 text-orange-500" />;
      defaultLabel = 'RSS';
      badgeClasses = 'text-orange-300 bg-orange-500/10 border-orange-500/20';
      break;
    case 'vhp':
      icon = <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      defaultLabel = 'VHP';
      badgeClasses = 'text-amber-300 bg-amber-500/10 border-amber-500/20';
      break;
    case 'bajrangdal':
      icon = <Sparkles className="w-3.5 h-3.5 text-orange-600" />;
      defaultLabel = 'Bajrang Dal';
      badgeClasses = 'text-orange-300 bg-orange-600/10 border-orange-600/20';
      break;
    case 'abvp':
    case 'aisf':
      icon = <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      defaultLabel = type === 'abvp' ? 'ABVP' : 'AISF';
      badgeClasses = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
      break;
    case 'welfare':
      icon = <Heart className="w-3.5 h-3.5 text-red-400" />;
      defaultLabel = 'Hindu Welfare Agency';
      badgeClasses = 'text-red-300 bg-red-500/10 border-red-500/20';
      break;
  }

  const iconSizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const textSizeClass = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border font-medium ${badgeClasses} ${textSizeClass}`}
      title={label || defaultLabel}
    >
      <span className={iconSizeClass}>{icon}</span>
      {showLabel && <span>{label || defaultLabel}</span>}
    </span>
  );
};

export const DevineIntelligenceSeal: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const textSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-medium ${textSize}`}>
      <Award className={`${iconSize} text-amber-400 fill-amber-400/20`} />
      <span className="font-semibold tracking-wider">DEVINE INTELLIGENCE</span>
    </span>
  );
};
