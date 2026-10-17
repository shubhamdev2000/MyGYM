import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  LineChart,
  Users,
  Building2,
  Wrench,
  Megaphone
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { role, memberTab, setMemberTab, adminTab, setAdminTab, activeWorkout } = useGym();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-3 py-2">
      <div className="flex items-center justify-around">
        {role === 'member' ? (
          <>
            <button
              onClick={() => setMemberTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                memberTab === 'dashboard' ? 'text-lime-400' : 'text-zinc-400'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mb-0.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setMemberTab('workout')}
              className={`relative flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                memberTab === 'workout' ? 'text-lime-400' : 'text-zinc-400'
              }`}
            >
              {activeWorkout && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              )}
              <Dumbbell className="w-5 h-5 mb-0.5" />
              <span>Workout</span>
            </button>

            <button
              onClick={() => setMemberTab('exercises')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                memberTab === 'exercises' ? 'text-lime-400' : 'text-zinc-400'
              }`}
            >
              <BookOpen className="w-5 h-5 mb-0.5" />
              <span>Catalog</span>
            </button>

            <button
              onClick={() => setMemberTab('analytics')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                memberTab === 'analytics' ? 'text-lime-400' : 'text-zinc-400'
              }`}
            >
              <LineChart className="w-5 h-5 mb-0.5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setMemberTab('classes')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                memberTab === 'classes' ? 'text-lime-400' : 'text-zinc-400'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span>Classes</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAdminTab('overview')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                adminTab === 'overview' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mb-0.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setAdminTab('members')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                adminTab === 'members' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span>Members</span>
            </button>

            <button
              onClick={() => setAdminTab('trainers-classes')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                adminTab === 'trainers-classes' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <Building2 className="w-5 h-5 mb-0.5" />
              <span>Classes</span>
            </button>

            <button
              onClick={() => setAdminTab('equipment')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                adminTab === 'equipment' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <Wrench className="w-5 h-5 mb-0.5" />
              <span>Repairs</span>
            </button>

            <button
              onClick={() => setAdminTab('announcements')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                adminTab === 'announcements' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              <Megaphone className="w-5 h-5 mb-0.5" />
              <span>Broadcast</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
