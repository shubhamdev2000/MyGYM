import React from 'react';
import { useGym } from '../../context/GymContext';
import { MemberViewTab, AdminViewTab } from '../../types';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  Sparkles,
  Calculator,
  LineChart,
  Apple,
  Users,
  Building2,
  CalendarDays,
  Wrench,
  Megaphone,
  Flame,
  PlusCircle,
  Play
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    role,
    memberTab,
    setMemberTab,
    adminTab,
    setAdminTab,
    activeWorkout,
    startWorkout
  } = useGym();

  const memberNavItems: { id: MemberViewTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workout', label: 'Live Workout', icon: Dumbbell, badge: activeWorkout ? 'ACTIVE' : undefined },
    { id: 'exercises', label: 'Exercise Library', icon: BookOpen },
    { id: 'ai-coach', label: 'AI Coach & Splits', icon: Sparkles, badge: 'PRO' },
    { id: 'calculator', label: '1RM & Barbell Loader', icon: Calculator },
    { id: 'analytics', label: 'Volume & Analytics', icon: LineChart },
    { id: 'nutrition', label: 'Nutrition & Water', icon: Apple },
    { id: 'classes', label: 'Classes & Leaderboard', icon: Users }
  ];

  const adminNavItems: { id: AdminViewTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Member Subscriptions', icon: Users },
    { id: 'trainers-classes', label: 'Classes & Coaches', icon: CalendarDays },
    { id: 'equipment', label: 'Equipment & Repairs', icon: Wrench, badge: '1 ISSUE' },
    { id: 'announcements', label: 'Broadcast & Challenges', icon: Megaphone }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-zinc-800/80 bg-zinc-950 min-h-[calc(100vh-4rem)] p-4">
      {/* Top Section: Nav Links */}
      <div className="space-y-6">
        {/* Quick Workout Launcher in Member Mode */}
        {role === 'member' && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/60 border border-zinc-800/80 shadow-md">
            {activeWorkout ? (
              <div>
                <div className="flex items-center justify-between text-xs text-lime-400 font-bold mb-1">
                  <span className="flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
                    </span>
                    <span>Session in Progress</span>
                  </span>
                </div>
                <p className="text-sm font-extrabold text-white truncate">{activeWorkout.name}</p>
                <button
                  onClick={() => setMemberTab('workout')}
                  className="mt-2.5 w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Workout</span>
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Ready to Train?</p>
                <p className="text-sm font-semibold text-zinc-200">Push Heavy Session</p>
                <button
                  onClick={() => startWorkout(undefined, 'Push Heavy Session')}
                  className="mt-2.5 w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-lime-400 hover:text-lime-300 text-xs font-bold transition border border-zinc-700 hover:border-lime-400/40"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Start Live Workout</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
            {role === 'member' ? 'Member Portal' : 'Operations Suite'}
          </p>

          <nav className="space-y-1">
            {role === 'member'
              ? memberNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = memberTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setMemberTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-zinc-900 text-lime-400 border border-zinc-800 shadow-sm shadow-lime-400/5'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-zinc-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded ${
                            item.badge === 'ACTIVE'
                              ? 'bg-lime-400 text-black animate-pulse'
                              : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })
              : adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = adminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-zinc-900 text-emerald-400 border border-zinc-800 shadow-sm shadow-emerald-400/5'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Card */}
      <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-zinc-400 font-medium">Facility Status</span>
          <span className="text-emerald-400 font-bold">ALL SYSTEMS GO</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          TITAN High-Performance Engine connected to local offline storage.
        </p>
      </div>
    </aside>
  );
};
