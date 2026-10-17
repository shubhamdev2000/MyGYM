import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { formatNumber } from '../../utils/formatters';
import {
  Users,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Flame,
  Dumbbell,
  Crown,
  Medal,
  Award
} from 'lucide-react';

export const ClassesLeaderboard: React.FC = () => {
  const { classes, toggleBookClass, leaderboard, unit } = useGym();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [leaderboardMetric, setLeaderboardMetric] = useState<'volume' | 'deadlift' | 'squat' | 'bench'>('volume');

  const categories = ['All', 'HIIT', 'Spin', 'CrossFit', 'Yoga', 'Strength'];

  const filteredClasses = classes.filter((c) =>
    activeCategory === 'All' ? true : c.category === activeCategory
  );

  // Sort leaderboard by active metric
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (leaderboardMetric === 'volume') return b.monthlyVolumeKg - a.monthlyVolumeKg;
    if (leaderboardMetric === 'deadlift') return b.deadliftKg - a.deadliftKg;
    if (leaderboardMetric === 'squat') return b.squatKg - a.squatKg;
    return b.benchKg - a.benchKg;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            COMMUNITY & RECOGNITION
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Class Booking & Iron Leaderboard</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve live group coaching sessions and climb the gym-wide tonnage rankings.
          </p>
        </div>
      </div>

      {/* SECTION 1: LIVE CLASS BOOKING SCHEDULE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-lime-400" />
              <span>Live Group Classes Schedule</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">High-intensity specialized coaching included in Pro and VIP tiers</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-lime-400 text-black font-extrabold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((item) => {
            const spotsLeft = item.capacity - item.bookedCount;
            const isFull = spotsLeft <= 0;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                  item.isBookedByMe
                    ? 'bg-zinc-900/90 border-lime-400/50 glow-lime'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 text-lime-400 border border-zinc-800">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{item.difficulty}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white mt-2.5">{item.name}</h3>

                  <div className="mt-3 space-y-1.5 text-xs text-zinc-300">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.time} ({item.durationMinutes} mins)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.room} • Coach {item.instructor}</span>
                    </div>
                  </div>

                  {/* Spot availability meter */}
                  <div className="mt-4 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-zinc-400">Class Capacity</span>
                      <span className={`font-mono font-bold ${spotsLeft <= 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {item.bookedCount} / {item.capacity} Spots Booked
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          spotsLeft <= 2 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${(item.bookedCount / item.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => toggleBookClass(item.id)}
                  className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                    item.isBookedByMe
                      ? 'bg-zinc-800 text-lime-400 border border-lime-400/40 hover:bg-zinc-700'
                      : isFull
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-lime-400 text-black hover:bg-lime-300 shadow-md shadow-lime-400/20'
                  }`}
                  disabled={!item.isBookedByMe && isFull}
                >
                  {item.isBookedByMe ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-lime-400" />
                      <span>Spot Reserved (Cancel)</span>
                    </>
                  ) : isFull ? (
                    <span>Class Fully Booked</span>
                  ) : (
                    <span>Book Spot ({spotsLeft} left)</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: GYM-WIDE LEADERBOARD */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>TITAN Hall of Fame Leaderboard</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Rankings updated automatically from logged sessions</p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
            {[
              { id: 'volume', label: 'Monthly Volume' },
              { id: 'deadlift', label: 'Deadlift PR' },
              { id: 'squat', label: 'Squat PR' },
              { id: 'bench', label: 'Bench Press PR' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setLeaderboardMetric(m.id as typeof leaderboardMetric)}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  leaderboardMetric === m.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium for Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {sortedLeaderboard.slice(0, 3).map((user, idx) => {
            const isGold = idx === 0;
            const isSilver = idx === 1;
            const isBronze = idx === 2;

            return (
              <div
                key={user.id}
                className={`p-5 rounded-2xl border text-center flex flex-col justify-between relative overflow-hidden ${
                  isGold
                    ? 'bg-amber-500/[0.08] border-amber-500/40'
                    : isSilver
                    ? 'bg-zinc-800/40 border-zinc-700'
                    : 'bg-orange-500/[0.08] border-orange-500/30'
                }`}
              >
                <div className="flex justify-center mb-2">
                  {isGold && <Crown className="w-6 h-6 text-amber-400" />}
                  {isSilver && <Medal className="w-6 h-6 text-zinc-300" />}
                  {isBronze && <Award className="w-6 h-6 text-orange-400" />}
                </div>

                <div className="relative mx-auto mb-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700 mx-auto"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black font-mono text-black shadow-md ${
                      isGold ? 'bg-amber-400' : isSilver ? 'bg-zinc-300' : 'bg-orange-400'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white truncate">{user.name}</h3>
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 mt-0.5">
                  {user.badge}
                </span>

                <div className="my-3 py-2 px-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    {leaderboardMetric === 'volume'
                      ? 'Monthly Tonnage'
                      : `${leaderboardMetric.toUpperCase()} 1RM`}
                  </span>
                  <span className="text-lg font-black font-mono text-white">
                    {leaderboardMetric === 'volume'
                      ? `${formatNumber(user.monthlyVolumeKg)} ${unit}`
                      : leaderboardMetric === 'deadlift'
                      ? `${user.deadliftKg} ${unit}`
                      : leaderboardMetric === 'squat'
                      ? `${user.squatKg} ${unit}`
                      : `${user.benchKg} ${unit}`}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-1.5 text-xs text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono font-bold">{user.streakDays} Days Streak</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Ranked Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="text-zinc-400 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800 pb-2">
                <th className="py-2.5 px-3 w-12 text-center">Rank</th>
                <th className="py-2.5 px-3">Athlete</th>
                <th className="py-2.5 px-3">Streak</th>
                <th className="py-2.5 px-3">Monthly Volume</th>
                <th className="py-2.5 px-3">Deadlift</th>
                <th className="py-2.5 px-3">Squat</th>
                <th className="py-2.5 px-3">Bench</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {sortedLeaderboard.map((user, idx) => {
                const isYou = user.name.includes('(You)');
                return (
                  <tr
                    key={user.id}
                    className={`transition ${
                      isYou
                        ? 'bg-lime-400/[0.08] font-bold'
                        : 'hover:bg-zinc-800/30'
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-zinc-300">
                      #{idx + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <span className={`text-xs ${isYou ? 'text-lime-400 font-extrabold' : 'text-white font-semibold'}`}>
                            {user.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 block">{user.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-orange-400 font-bold">
                      {user.streakDays}d 🔥
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-white">
                      {formatNumber(user.monthlyVolumeKg)} {unit}
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-300">{user.deadliftKg} {unit}</td>
                    <td className="py-3 px-3 font-mono text-zinc-300">{user.squatKg} {unit}</td>
                    <td className="py-3 px-3 font-mono text-zinc-300">{user.benchKg} {unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
