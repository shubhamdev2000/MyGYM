import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Exercise, MuscleGroup, EquipmentCategory } from '../../types';
import {
  Search,
  Dumbbell,
  AlertTriangle,
  CheckCircle,
  Trophy,
  Play,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ExerciseLibrary: React.FC = () => {
  const { exercises, prs, startWorkout, setMemberTab, unit } = useGym();
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const muscleGroups: ('All' | MuscleGroup)[] = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Arms',
    'Core'
  ];

  const equipmentOptions: ('All' | EquipmentCategory)[] = [
    'All',
    'Barbell',
    'Dumbbell',
    'Cable',
    'Machine',
    'Bodyweight'
  ];

  const filtered = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.primaryMuscle === selectedMuscle;
    const matchesEquipment =
      selectedEquipment === 'All' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            KNOWLEDGE BASE
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Exercise Encyclopedia</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Biomechanical cues, joint kinematics, and form execution breakdown.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
            Total Movements: <strong className="text-lime-400">{exercises.length}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by exercise name, target muscle or equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition"
          />
        </div>

        {/* Filter Badges: Muscle Group */}
        <div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Target Muscle Group:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedMuscle === muscle
                    ? 'bg-lime-400 text-black font-extrabold shadow-md shadow-lime-400/20'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Badges: Equipment */}
        <div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Equipment Available:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {equipmentOptions.map((eq) => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedEquipment === eq
                    ? 'bg-emerald-500 text-black font-extrabold shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exercise) => {
          const userPR = prs.find((p) => p.exerciseId === exercise.id);

          return (
            <div
              key={exercise.id}
              onClick={() => setActiveExercise(exercise)}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-lime-400/40 hover:bg-zinc-900 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 text-lime-400 border border-zinc-800">
                    {exercise.primaryMuscle}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {exercise.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mt-2 group-hover:text-lime-400 transition">
                  {exercise.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {exercise.description}
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/60 text-xs">
                  <div className="flex items-center space-x-1.5 text-zinc-400">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>{exercise.equipment}</span>
                  </div>

                  {userPR ? (
                    <div className="flex items-center space-x-1 text-amber-400 font-mono font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{userPR.weight}{unit} PR</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-zinc-400">Standard: 3x10</span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-lime-400 font-bold group-hover:translate-x-0.5 transition">
                <span>View Technique & Cues</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal Drawer */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            {/* Top Close */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30">
                  {activeExercise.primaryMuscle}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {activeExercise.equipment} • {activeExercise.difficulty}
                </span>
              </div>
              <button
                onClick={() => setActiveExercise(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-2xl font-black text-white">{activeExercise.name}</h2>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {activeExercise.description}
              </p>
            </div>

            {/* Muscles Involved */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-300 mb-2">
                <Layers className="w-4 h-4 text-lime-400" />
                <span>Muscular Recruitment</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-lime-400/20 text-lime-400 font-bold text-xs border border-lime-400/30">
                  Primary: {activeExercise.primaryMuscle}
                </span>
                {activeExercise.secondaryMuscles.map((sm) => (
                  <span
                    key={sm}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 text-xs border border-zinc-800"
                  >
                    Secondary: {sm}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Form Cues */}
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Biomechanical Execution Cues</span>
              </h3>
              <ul className="space-y-2">
                {activeExercise.formCues.map((cue, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Common Form Pitfalls & Risk Factors</span>
              </h3>
              <ul className="space-y-2">
                {activeExercise.commonMistakes.map((mistake, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-red-200/90 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch Workout with this Exercise */}
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => {
                  startWorkout(undefined, `Focus: ${activeExercise.name}`);
                  setActiveExercise(null);
                  setMemberTab('workout');
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black text-xs shadow-lg shadow-lime-400/20 transition hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Live Session with {activeExercise.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
