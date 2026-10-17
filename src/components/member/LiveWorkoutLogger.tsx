import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { formatTime, formatNumber } from '../../utils/formatters';
import {
  Play,
  Plus,
  Trash2,
  Check,
  Trophy,
  Flame,
  Clock,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  Dumbbell
} from 'lucide-react';
import { SetType } from '../../types';

export const LiveWorkoutLogger: React.FC = () => {
  const {
    activeWorkout,
    startWorkout,
    cancelWorkout,
    finishWorkout,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    addSetToExercise,
    removeSetFromExercise,
    updateSet,
    toggleSetCompleted,
    routines,
    exercises,
    pastWorkouts,
    unit
  } = useGym();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');

  // Compute live totals
  let totalVolume = 0;
  let totalCompletedSets = 0;
  let prsInSession = 0;

  if (activeWorkout) {
    activeWorkout.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVolume += s.weight * s.reps;
          totalCompletedSets += 1;
          if (s.isPR) prsInSession += 1;
        }
      });
    });
  }

  // Filter exercises for Add Exercise Modal
  const filteredCatalog = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.primaryMuscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  // IF NO WORKOUT IS ACTIVE: SHOW LAUNCHER VIEW
  if (!activeWorkout) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
              TITAN WORKOUT ENGINE
            </span>
            <h1 className="text-2xl font-black text-white mt-2">Live Session Logger</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Select a saved structured routine or start an empty canvas to log live sets and PRs.
            </p>
          </div>
          <button
            onClick={() => startWorkout(undefined, 'Custom Full Session')}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg shadow-lime-400/20 transition hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Empty Workout</span>
          </button>
        </div>

        {/* Saved Routines Grid */}
        <div>
          <h2 className="text-base font-extrabold text-white mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Choose From Your Routines</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {routine.split}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{routine.daysPerWeek} days/week</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-2">{routine.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{routine.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {routine.targetMuscles.map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-lime-400 border border-zinc-800 font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-zinc-400 mt-3">
                    {routine.exercises.length} prescribed compound & isolation movements
                  </p>
                </div>

                <button
                  onClick={() => startWorkout(routine.id, routine.name)}
                  className="mt-4 w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-lime-400 hover:text-black text-zinc-200 text-xs font-extrabold transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch This Routine</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Past Workouts History */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <h2 className="text-base font-extrabold text-white mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span>Recent Completed Sessions</span>
          </h2>
          <div className="space-y-3">
            {pastWorkouts.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{w.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {w.splitName}
                    </span>
                    {w.prsAchieved > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {w.prsAchieved} PR{w.prsAchieved > 1 ? 's' : ''}!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{w.notes}</p>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px]">DURATION</span>
                    <span className="text-zinc-200 font-bold">{w.durationMinutes}m</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px]">VOLUME</span>
                    <span className="text-lime-400 font-bold">{formatNumber(w.totalVolumeKg)} {unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px]">DATE</span>
                    <span className="text-zinc-400">{w.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE LIVE WORKOUT VIEW
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Active Workout Top Banner */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-xl sticky top-20 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-lime-400 text-black shadow-lg shadow-lime-400/20">
              <Dumbbell className="w-5 h-5 font-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black text-white">{activeWorkout.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase font-bold">
                  {activeWorkout.splitName}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-xs text-zinc-400 font-mono">
                <span className="flex items-center space-x-1.5 text-lime-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(activeWorkout.elapsedSeconds)}</span>
                </span>
                <span>•</span>
                <span>Volume: <strong className="text-white">{formatNumber(totalVolume)} {unit}</strong></span>
                <span>•</span>
                <span>Sets: <strong className="text-white">{totalCompletedSets}</strong></span>
                {prsInSession > 0 && (
                  <span className="text-amber-400 font-bold flex items-center space-x-1">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{prsInSession} PR!</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition border border-zinc-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Exercise</span>
            </button>

            <button
              onClick={() => setShowFinishModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-extrabold shadow-md shadow-lime-400/20 transition hover:scale-105"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Finish Workout</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Discard current workout session?')) cancelWorkout();
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"
              title="Cancel & Discard"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Exercises In Session */}
      <div className="space-y-6">
        {activeWorkout.exercises.map((item, itemIdx) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 shadow-lg"
          >
            {/* Exercise Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-white">{item.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-lime-400">
                    {item.primaryMuscle}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => addSetToExercise(itemIdx)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>
                <button
                  onClick={() => removeExerciseFromWorkout(itemIdx)}
                  className="p-1 rounded-lg hover:bg-red-950/50 text-zinc-400 hover:text-red-400 transition"
                  title="Remove exercise"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sets Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="text-zinc-400 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800/60 pb-2">
                    <th className="py-2 px-2 w-12 text-center">Set</th>
                    <th className="py-2 px-2 w-28">Type</th>
                    <th className="py-2 px-2 w-28">{unit.toUpperCase()}</th>
                    <th className="py-2 px-2 w-24">Reps</th>
                    <th className="py-2 px-2 w-24">RPE</th>
                    <th className="py-2 px-2 text-center w-20">Done</th>
                    <th className="py-2 px-1 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {item.sets.map((set, setIdx) => {
                    return (
                      <tr
                        key={set.id}
                        className={`transition-colors ${
                          set.completed
                            ? 'bg-lime-400/[0.04]'
                            : 'hover:bg-zinc-800/30'
                        }`}
                      >
                        {/* Set Number */}
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-zinc-300">
                          {set.setNumber}
                        </td>

                        {/* Set Tag Type */}
                        <td className="py-2.5 px-2">
                          <select
                            value={set.type}
                            onChange={(e) =>
                              updateSet(itemIdx, setIdx, { type: e.target.value as SetType })
                            }
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-lime-400"
                          >
                            <option value="warmup">Warmup</option>
                            <option value="normal">Normal</option>
                            <option value="dropset">Drop Set</option>
                            <option value="failure">Failure</option>
                          </select>
                        </td>

                        {/* Weight */}
                        <td className="py-2.5 px-2">
                          <input
                            type="number"
                            step="0.5"
                            value={set.weight}
                            onChange={(e) =>
                              updateSet(itemIdx, setIdx, { weight: parseFloat(e.target.value) || 0 })
                            }
                            className="w-20 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                          />
                        </td>

                        {/* Reps */}
                        <td className="py-2.5 px-2">
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) =>
                              updateSet(itemIdx, setIdx, { reps: parseInt(e.target.value) || 0 })
                            }
                            className="w-16 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                          />
                        </td>

                        {/* RPE */}
                        <td className="py-2.5 px-2">
                          <select
                            value={set.rpe}
                            onChange={(e) =>
                              updateSet(itemIdx, setIdx, { rpe: parseFloat(e.target.value) || 8 })
                            }
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs font-mono text-zinc-300 focus:outline-none focus:border-lime-400"
                          >
                            <option value="6">6 (Light)</option>
                            <option value="7">7 (3 in tank)</option>
                            <option value="8">8 (2 in tank)</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9 (1 in tank)</option>
                            <option value="9.5">9.5</option>
                            <option value="10">10 (Absolute Max)</option>
                          </select>
                        </td>

                        {/* Complete Checkbox */}
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => toggleSetCompleted(itemIdx, setIdx)}
                            className={`p-1.5 rounded-lg transition ${
                              set.completed
                                ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            }`}
                            title={set.completed ? 'Mark incomplete' : 'Complete set'}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>

                        {/* PR Badge / Delete Set */}
                        <td className="py-2.5 px-1 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            {set.isPR && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-black animate-pulse" title="New Personal Record!">
                                PR!
                              </span>
                            )}
                            <button
                              onClick={() => removeSetFromExercise(itemIdx, setIdx)}
                              className="text-zinc-400 hover:text-red-400 p-1"
                              title="Delete set"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Dumbbell className="w-4 h-4 text-lime-400" />
                <span>Add Exercise to Session</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="my-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search exercise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Muscle selector */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1">
                {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMuscle(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      selectedMuscle === m
                        ? 'bg-lime-400 text-black font-bold'
                        : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {filteredCatalog.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    addExerciseToWorkout(ex.id);
                    setShowAddModal(false);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/40 transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{ex.name}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {ex.primaryMuscle} • {ex.equipment} • {ex.difficulty}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-lime-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Finish Workout Summary Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="text-center">
              <span className="inline-flex p-3 rounded-2xl bg-lime-400 text-black shadow-lg shadow-lime-400/20 mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h3 className="text-xl font-black text-white">Complete Workout</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Outstanding execution! Here is your session summary:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 my-5 text-center">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Duration</span>
                <span className="text-base font-black font-mono text-white">
                  {formatTime(activeWorkout.elapsedSeconds)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Volume</span>
                <span className="text-base font-black font-mono text-lime-400">
                  {formatNumber(totalVolume)} {unit}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">PRs Hit</span>
                <span className="text-base font-black font-mono text-amber-400">
                  {prsInSession}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-zinc-300 mb-1">Workout Notes & Energy Log</label>
              <textarea
                rows={3}
                placeholder="e.g. Felt great on bench, 90s rest, high RPE on final set..."
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
              >
                Back to Session
              </button>
              <button
                onClick={() => {
                  finishWorkout(workoutNotes);
                  setShowFinishModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition hover:scale-105"
              >
                Save & Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
