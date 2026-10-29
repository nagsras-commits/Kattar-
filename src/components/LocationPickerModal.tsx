import React from 'react';
import { MapPin, Check, X } from 'lucide-react';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  activeLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  const neighborhoods = [
    { name: 'Indiranagar, Bangalore', distance: 'Active Center', pincode: '560038' },
    { name: 'Defence Colony, Bangalore', distance: '1.4 km', pincode: '560038' },
    { name: 'Koramangala 4th Block', distance: '3.8 km', pincode: '560034' },
    { name: 'Domlur & HAL 2nd Stage', distance: '2.5 km', pincode: '560071' },
    { name: 'Malleshwaram 8th Cross', distance: '7.2 km', pincode: '560003' },
    { name: 'Jayanagar 4th T Block', distance: '6.8 km', pincode: '560041' },
    { name: 'Whitefield Main Road', distance: '9.4 km', pincode: '560066' }
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">Select Community Service Area</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
          {neighborhoods.map(n => {
            const isSelected = activeLocation.toLowerCase().includes(n.name.split(',')[0].toLowerCase());
            return (
              <div
                key={n.name}
                onClick={() => {
                  onSelectLocation(n.name);
                  onClose();
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-orange-500/10 border-orange-500/40 text-white'
                    : 'bg-neutral-950 border-neutral-800 hover:bg-neutral-800 text-neutral-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{n.name}</h4>
                  <span className="text-[10px] text-neutral-500 font-mono">PIN: {n.pincode} · {n.distance}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-orange-400" />}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-950 text-center text-xs text-neutral-400">
          Radius enforced at 5-10km from selected center.
        </div>
      </div>
    </div>
  );
};
