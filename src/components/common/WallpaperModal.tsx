import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  Image,
  Upload,
  Link,
  Sparkles,
  Sliders,
  RotateCcw,
  Check,
  X,
  Palette
} from 'lucide-react';

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WALLPAPER_PRESETS = [
  {
    name: 'Cyberpunk Neon Gym',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Heavy Iron Power Rack',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Dark Carbon Fiber Matrix',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Minimal Dark Mesh',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Industrial Dumbbell Vault',
    url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Emerald Matrix Flow',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&auto=format&fit=crop&q=80'
  }
];

export const WallpaperModal: React.FC<WallpaperModalProps> = ({ isOpen, onClose }) => {
  const { wallpaper, setWallpaper } = useGym();
  const [customUrl, setCustomUrl] = useState('');
  const [uploadError, setUploadError] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setWallpaper({
        ...wallpaper,
        url: result,
        presetName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    setWallpaper({
      ...wallpaper,
      url: customUrl.trim(),
      presetName: 'Custom URL'
    });
    setCustomUrl('');
  };

  const handleReset = () => {
    setWallpaper({
      url: null,
      opacity: 0.25,
      blur: 2,
      presetName: 'Default Sleek Void'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-lime-400 text-black">
              <Palette className="w-5 h-5 font-black" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">App Background & Custom Wallpaper</h2>
              <p className="text-xs text-zinc-400">Personalize your TITAN OS environment with custom visuals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: PRESET WALLPAPERS */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Curated High-Performance Wallpapers
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WALLPAPER_PRESETS.map((preset) => {
              const isSelected = wallpaper.url === preset.url;
              return (
                <div
                  key={preset.name}
                  onClick={() =>
                    setWallpaper({
                      ...wallpaper,
                      url: preset.url,
                      presetName: preset.name
                    })
                  }
                  className={`relative group rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 h-28 ${
                    isSelected
                      ? 'border-lime-400 ring-2 ring-lime-400/40 glow-lime scale-[1.02]'
                      : 'border-zinc-800 hover:border-zinc-700 hover:scale-[1.01]'
                  }`}
                >
                  <img
                    src={preset.thumb}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-extrabold text-white leading-tight">
                      {preset.name}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="absolute top-2 right-2 p-1 rounded-full bg-lime-400 text-black shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: UPLOAD IMAGE & CUSTOM URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* File Upload */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-white flex items-center space-x-1.5 mb-1">
                <Upload className="w-4 h-4 text-lime-400" />
                <span>Upload From Device</span>
              </span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Choose any PNG, JPG, or WebP wallpaper directly from your local computer or phone.
              </p>
            </div>

            <label className="mt-3 w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-lime-400 hover:text-lime-300 text-xs font-bold transition border border-zinc-800 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Browse Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {uploadError && <p className="text-[10px] text-red-400 mt-1">{uploadError}</p>}
          </div>

          {/* Paste URL */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-white flex items-center space-x-1.5 mb-1">
                <Link className="w-4 h-4 text-emerald-400" />
                <span>External Image URL</span>
              </span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Paste any high-resolution image link to apply as the background.
              </p>
            </div>

            <form onSubmit={handleApplyCustomUrl} className="mt-3 flex items-center space-x-1.5">
              <input
                type="url"
                placeholder="https://..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition"
              >
                Apply
              </button>
            </form>
          </div>
        </div>

        {/* SECTION 3: OPACITY & BLUR CONTROLS */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-lime-400" />
              <span>Wallpaper Blend & Aesthetics</span>
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">
              Active: {wallpaper.presetName || 'Custom'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Opacity */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Wallpaper Intensity</span>
                <span className="text-lime-400 font-mono font-bold">
                  {Math.round(wallpaper.opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={wallpaper.opacity}
                onChange={(e) =>
                  setWallpaper({
                    ...wallpaper,
                    opacity: parseFloat(e.target.value)
                  })
                }
                className="w-full accent-lime-400 cursor-pointer"
              />
            </div>

            {/* Blur */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Glassmorphic Blur</span>
                <span className="text-emerald-400 font-mono font-bold">{wallpaper.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={wallpaper.blur}
                onChange={(e) =>
                  setWallpaper({
                    ...wallpaper,
                    blur: parseInt(e.target.value)
                  })
                }
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Deep Void</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
