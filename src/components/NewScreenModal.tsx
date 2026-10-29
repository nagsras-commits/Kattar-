import React, { useState } from 'react';
import { StitchScreen } from '../types';
import { X, Plus } from 'lucide-react';

interface NewScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScreen: (screen: StitchScreen) => void;
}

export const NewScreenModal: React.FC<NewScreenModalProps> = ({
  isOpen,
  onClose,
  onAddScreen,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'mobile' | 'web'>('mobile');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newScreen: StitchScreen = {
      id: `screen-${Date.now()}`,
      name: name.trim(),
      slug: slug.trim() || `/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      type,
      description: description.trim() || 'Custom screen created in Stitch Studio.',
      thumbnail: type === 'mobile'
        ? '/src/assets/images/screen_preview_mobile_1793279022768.jpg'
        : '/src/assets/images/screen_preview_analytics_1793279021632.jpg',
      route: slug.trim() || `/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      status: 'draft',
      componentsCount: 6,
      lastEdited: 'Just now',
      codeSnippet: `export function ${name.replace(/[^a-zA-Z0-9]+/g, '')}Screen() {
  return (
    <div className="p-6 bg-neutral-950 text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">${name}</h2>
      <p className="text-sm text-neutral-400">Newly created Stitch screen.</p>
    </div>
  );
}`
    };

    onAddScreen(newScreen);
    setName('');
    setDescription('');
    setSlug('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="p-6 pb-4 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Create New Screen</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              Screen Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Audio Player & Mixer"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              Device Form Factor
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('mobile')}
                className={`py-2 px-3 text-xs font-medium rounded-xl border transition-colors ${
                  type === 'mobile'
                    ? 'bg-neutral-800 border-neutral-600 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Mobile (393px)
              </button>
              <button
                type="button"
                onClick={() => setType('web')}
                className={`py-2 px-3 text-xs font-medium rounded-xl border transition-colors ${
                  type === 'web'
                    ? 'bg-neutral-800 border-neutral-600 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Web / Tablet (1200px)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              Route Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="e.g., /player"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief summary of screen purpose and interactive user flow..."
              className="w-full h-20 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Canvas</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
