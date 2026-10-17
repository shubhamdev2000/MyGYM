import React from 'react';
import { useGym } from '../../context/GymContext';
import { formatTime } from '../../utils/formatters';
import {
  Dumbbell,
  Flame,
  UserCheck,
  Building2,
  Clock,
  Palette
} from 'lucide-react';
import { WallpaperModal } from '../common/WallpaperModal';

export const Navbar: React.FC = () => {
  const [showWallpaperModal, setShowWallpaperModal] = React.useState(false);
  const {
    role,
    setRole,
    setMemberTab,
    unit,
    toggleUnit,
    activeWorkout,
    streakDays,
    gymCapacityPercent,
    wallpaper
  } = useGym();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 via-emerald-400 to-emerald-600 text-black shadow-lg shadow-lime-400/20">
              <Dumbbell className="w-5 h-5 font-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  TITAN <span className="text-lime-400">OS</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                  v2.4 PRO
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block tracking-wide">
                High-Performance Fitness & Facility OS
              </p>
            </div>
          </div>

          {/* Center: Persistent Role Switcher */}
          <div className="flex items-center">
            <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center space-x-1 shadow-inner">
              <button
                onClick={() => setRole('member')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  role === 'member'
                    ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Member Pro View</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Gym Admin Panel</span>
              </button>
            </div>
          </div>

          {/* Right Area: Status, Active Workout Pill, Unit Toggle & Profile */}
          <div className="flex items-center space-x-3">
            {/* Active Workout Notification */}
            {activeWorkout && (
              <button
                onClick={() => {
                  setRole('member');
                  setMemberTab('workout');
                }}
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-lime-400/10 border border-lime-400/40 text-lime-400 hover:bg-lime-400/20 transition animate-pulse"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-bold">
                  Live: {formatTime(activeWorkout.elapsedSeconds)}
                </span>
              </button>
            )}

            {/* Live Gym Capacity Meter */}
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-zinc-400 font-medium">Gym Crowd:</span>
              <span className="text-zinc-200 font-bold font-mono">{gymCapacityPercent}%</span>
              <span className="text-[10px] text-emerald-400 font-semibold px-1 rounded bg-emerald-950/60 border border-emerald-800/50">
                Moderate
              </span>
            </div>

            {/* Streak Counter for Members */}
            {role === 'member' && (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400/30" />
                <span className="font-bold text-orange-400 font-mono">{streakDays}</span>
                <span className="text-zinc-400 text-[11px]">Days Streak</span>
              </div>
            )}

            {/* Wallpaper Customizer Trigger */}
            <button
              onClick={() => setShowWallpaperModal(true)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-lime-400 transition"
              title="Custom App Wallpaper & Theme"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Unit Switcher */}
            <button
              onClick={toggleUnit}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:text-white transition"
              title="Toggle Unit (KG / LBS)"
            >
              {unit.toUpperCase()}
            </button>

            {/* Profile Avatar / Badge */}
            <div className="flex items-center space-x-2 pl-1">
              <img
                src={
                  role === 'admin'
                    ? 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=120&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-700 hover:ring-lime-400 transition"
              />
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-zinc-200 leading-tight">
                  {role === 'admin' ? 'Coach Vance' : 'Alexander C.'}
                </p>
                <p className="text-[10px] font-medium text-lime-400/90 leading-tight">
                  {role === 'admin' ? 'Head Director' : 'Elite VIP'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallpaper Customizer Modal */}
      <WallpaperModal
        isOpen={showWallpaperModal}
        onClose={() => setShowWallpaperModal(false)}
      />
    </header>
  );
};
