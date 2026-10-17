import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  Flame,
  Dumbbell,
  Clock,
  Droplet,
  Apple,
  Trophy,
  ArrowRight,
  Sparkles,
  Users,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Play,
  CheckCircle2
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const {
    streakDays,
    gymCapacityPercent,
    nutrition,
    prs,
    announcements,
    challenges,
    toggleJoinChallenge,
    startWorkout,
    setMemberTab,
    activeWorkout
  } = useGym();

  const activeAnnouncements = announcements.filter((a) => a.active);

  // Nutrition calculations
  const totalCalsConsumed = nutrition.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProteinConsumed = nutrition.meals.reduce((sum, m) => sum + m.protein, 0);
  const caloriePercent = Math.min(100, Math.round((totalCalsConsumed / nutrition.targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((totalProteinConsumed / nutrition.targetProtein) * 100));
  const waterPercent = Math.min(100, Math.round((nutrition.waterCurrentMl / nutrition.waterTargetMl) * 100));

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Broadcast Banner Alerts */}
      {activeAnnouncements.length > 0 && (
        <div className="space-y-2">
          {activeAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="flex items-start justify-between p-3.5 rounded-2xl bg-zinc-900/90 border border-lime-400/30 text-zinc-200 shadow-lg glow-lime"
            >
              <div className="flex items-start space-x-3">
                <span className="p-1 rounded-lg bg-lime-400/20 text-lime-400 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-lime-400 uppercase tracking-wider">{ann.title}</p>
                  <p className="text-xs text-zinc-300 mt-0.5">{ann.content}</p>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 shrink-0 ml-4 font-mono">{ann.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hero Grid: Streak, Split, Crowd Meter, and Today's Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Counter */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition">
            <Flame className="w-28 h-28 text-orange-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Daily Streak</span>
            <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Flame className="w-4 h-4 fill-orange-400" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-4xl font-black font-mono text-white tracking-tight">{streakDays}</span>
            <span className="text-sm font-bold text-orange-400">DAYS STRONG</span>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Top 5% consistency this month. 2 days away from Bronze Hall of Fame!
          </p>
        </div>

        {/* Active Split & Scheduled Session */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Current Split</span>
            <span className="p-1.5 rounded-lg bg-lime-400/10 text-lime-400">
              <Dumbbell className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">Push / Pull / Legs</span>
            <p className="text-xs font-semibold text-lime-400 mt-0.5">Day 3: Legs Heavy & Core</p>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-xs text-zinc-400">Target Volume: ~11,000 kg</span>
          </div>
        </div>

        {/* Live Gym Capacity Meter */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Live Crowd Meter</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-4xl font-black font-mono text-white tracking-tight">{gymCapacityPercent}%</span>
            <span className="text-xs font-bold text-emerald-400 uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800">
              Moderate
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Peak hours drop at 1:30 PM. Squat racks have 2 of 4 open.
          </p>
        </div>

        {/* Quick Workout Action */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-lime-400/10 via-zinc-900 to-zinc-900 border border-lime-400/40 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">Today's Workout</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-400 text-black font-bold">READY</span>
            </div>
            <p className="text-lg font-black text-white mt-2">Legs Heavy & Core</p>
            <p className="text-xs text-zinc-400">5 exercises • ~65 mins duration</p>
          </div>

          <button
            onClick={() => {
              if (activeWorkout) {
                setMemberTab('workout');
              } else {
                startWorkout('routine-ppl-legs', 'Legs Heavy & Core');
              }
            }}
            className="mt-4 w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg shadow-lime-400/20 transition hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{activeWorkout ? 'Resume Active Session' : 'Start Scheduled Workout'}</span>
          </button>
        </div>
      </div>

      {/* Second Row: Daily Fuel & Macro Rings + Quick Launch Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Macros & Hydration */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Apple className="w-5 h-5 text-lime-400" />
                <span>Daily Fuel & Hydration Tracker</span>
              </h2>
              <p className="text-xs text-zinc-400">Target goals calibrated for lean mass hypertrophy</p>
            </div>
            <button
              onClick={() => setMemberTab('nutrition')}
              className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center space-x-1"
            >
              <span>Log Meals</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Calories Progress */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400 font-bold">Calories</span>
                <span className="text-zinc-200 font-mono font-bold">
                  {totalCalsConsumed} / {nutrition.targetCalories} kcal
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-lime-400 rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                {nutrition.targetCalories - totalCalsConsumed > 0
                  ? `${nutrition.targetCalories - totalCalsConsumed} kcal remaining`
                  : 'Goal reached!'}
              </p>
            </div>

            {/* Protein Progress */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400 font-bold">Protein</span>
                <span className="text-zinc-200 font-mono font-bold">
                  {totalProteinConsumed}g / {nutrition.targetProtein}g
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${proteinPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                {proteinPercent}% of daily optimal target
              </p>
            </div>

            {/* Hydration Progress */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400 font-bold flex items-center space-x-1">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hydration</span>
                </span>
                <span className="text-zinc-200 font-mono font-bold">
                  {nutrition.waterCurrentMl} / {nutrition.waterTargetMl} ml
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${waterPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                {waterPercent >= 100 ? 'Hydration locked!' : `${nutrition.waterTargetMl - nutrition.waterCurrentMl}ml to goal`}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Launch Pro Tools */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-lime-400" />
              <span>Pro Fitness Utilities</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Instant engineering tools for strength</p>
          </div>

          <div className="space-y-2 mt-4">
            <button
              onClick={() => setMemberTab('ai-coach')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/40 transition group"
            >
              <div className="flex items-center space-x-3 text-left">
                <span className="p-2 rounded-lg bg-lime-400/10 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-zinc-200">AI Split Generator</p>
                  <p className="text-[11px] text-zinc-400">Generate periodized 3-6 day routines</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-lime-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => setMemberTab('calculator')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/40 transition group"
            >
              <div className="flex items-center space-x-3 text-left">
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-zinc-200">1RM & Barbell Loader</p>
                  <p className="text-[11px] text-zinc-400">Epley formula & exact plate loading</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => setMemberTab('classes')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/40 transition group"
            >
              <div className="flex items-center space-x-3 text-left">
                <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition">
                  <Users className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-zinc-200">Book Classes & Leaderboard</p>
                  <p className="text-[11px] text-zinc-400">Reserve spots for Spin, HIIT, CrossFit</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>

      {/* Third Row: Recent Personal Records & Monthly Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Records Showcase */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Verified Personal Records</span>
              </h2>
              <p className="text-xs text-zinc-400">Auto-detected from your completed workout logs</p>
            </div>
            <button
              onClick={() => setMemberTab('analytics')}
              className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center space-x-1"
            >
              <span>All Analytics</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {prs.slice(0, 4).map((pr) => (
              <div
                key={pr.exerciseId}
                className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition"
              >
                <p className="text-xs text-zinc-400 font-semibold truncate">{pr.exerciseName}</p>
                <div className="mt-2 flex items-baseline space-x-1">
                  <span className="text-2xl font-black font-mono text-white">{pr.weight}</span>
                  <span className="text-xs font-bold text-zinc-400">kg</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{pr.reps} reps</span>
                  <span className="text-lime-400 font-mono font-bold">1RM: {pr.estimated1RM}kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Gym Challenge */}
        {challenges[0] && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  MONTHLY CHALLENGE
                </span>
                <span className="text-xs font-mono text-zinc-400">{challenges[0].daysLeft} Days Left</span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-3">{challenges[0].title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{challenges[0].description}</p>

              <div className="mt-4 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-zinc-400">Your Progress</span>
                  <span className="text-lime-400 font-bold font-mono">{challenges[0].progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${challenges[0].progressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1.5 flex items-center space-x-1">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span>Reward: {challenges[0].reward}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleJoinChallenge(challenges[0].id)}
              className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                challenges[0].joined
                  ? 'bg-zinc-800 text-lime-400 border border-lime-400/40 hover:bg-zinc-700'
                  : 'bg-lime-400 text-black hover:bg-lime-300'
              }`}
            >
              {challenges[0].joined ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Enrolled & Tracking</span>
                </>
              ) : (
                <span>Join Challenge Now</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
