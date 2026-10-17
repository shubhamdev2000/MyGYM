import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { WorkoutRoutine } from '../../types';
import {
  Sparkles,
  Dumbbell,
  Target,
  Calendar,
  Layers,
  CheckCircle2,
  Play,
  BookmarkPlus,
  RefreshCw,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AICoachSplitBuilder: React.FC = () => {
  const { addRoutine, startWorkout, setMemberTab } = useGym();

  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<'Hypertrophy' | 'Strength' | 'Fat Loss' | 'Athletic'>('Hypertrophy');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [equipment, setEquipment] = useState<'Commercial' | 'Home Barbell' | 'Dumbbells' | 'Bodyweight'>('Commercial');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<WorkoutRoutine | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setSavedSuccess(false);

    setTimeout(() => {
      let routineName = '';
      let splitType = '';
      let targetMuscles: WorkoutRoutine['targetMuscles'] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

      if (daysPerWeek === 6) {
        routineName = `${goal} High-Frequency PPL Split`;
        splitType = 'Push / Pull / Legs (6-Day)';
      } else if (daysPerWeek === 4) {
        routineName = `${goal} Upper / Lower Power & Mass`;
        splitType = 'Upper / Lower (4-Day)';
      } else if (daysPerWeek === 3) {
        routineName = `${goal} Full Body Compound Density`;
        splitType = 'Full Body Triad (3-Day)';
      } else {
        routineName = `${goal} 5-Day Hybrid Bodybuilding Split`;
        splitType = 'Upper / Lower / PPL Hybrid (5-Day)';
      }

      const generated: WorkoutRoutine = {
        id: `routine-ai-${Date.now()}`,
        name: routineName,
        split: splitType,
        targetMuscles,
        description: `Automated ${level} program optimized for ${goal.toLowerCase()} with ${daysPerWeek} training days/week using ${equipment} setup.`,
        daysPerWeek,
        level,
        exercises: [
          { exerciseId: 'ex-barbell-squat', targetSets: 4, targetReps: goal === 'Strength' ? '4-6' : '8-10', defaultWeight: 110 },
          { exerciseId: 'ex-bench-press', targetSets: 4, targetReps: goal === 'Strength' ? '5' : '8-10', defaultWeight: 85 },
          { exerciseId: 'ex-barbell-row', targetSets: 4, targetReps: '8-10', defaultWeight: 70 },
          { exerciseId: 'ex-overhead-press', targetSets: 3, targetReps: '8-10', defaultWeight: 50 },
          { exerciseId: 'ex-romanian-deadlift', targetSets: 3, targetReps: '10-12', defaultWeight: 90 },
          { exerciseId: 'ex-db-lateral-raise', targetSets: 4, targetReps: '15', defaultWeight: 14 }
        ]
      };

      setGeneratedRoutine(generated);
      setIsGenerating(false);
      setStep(5); // View result
    }, 600);
  };

  const handleSaveToRoutines = () => {
    if (!generatedRoutine) return;
    addRoutine(generatedRoutine);
    setSavedSuccess(true);
  };

  const handleStartImmediately = () => {
    if (!generatedRoutine) return;
    addRoutine(generatedRoutine);
    startWorkout(generatedRoutine.id, generatedRoutine.name);
    setMemberTab('workout');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            TITAN AI COACH ENGINE
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Smart Routine & Split Builder</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Algorithmic periodization: build a customized weekly split mapped to your exact schedule and equipment.
          </p>
        </div>
        <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>Neural Engine v2.4</span>
        </div>
      </div>

      {/* Interactive Wizard Steps */}
      {step < 5 ? (
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-6 shadow-xl">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono transition ${
                    step === s
                      ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                      : step > s
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {s}
                </span>
                <span className="hidden sm:inline text-xs font-bold text-zinc-400">
                  {s === 1 ? 'Primary Goal' : s === 2 ? 'Experience' : s === 3 ? 'Frequency' : 'Equipment'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">Step 1: What is your primary training directive?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Hypertrophy', title: 'Maximum Hypertrophy', desc: 'Prioritize muscle cross-sectional area, moderate intensity & high metabolic fatigue.' },
                  { id: 'Strength', title: 'Raw Neuromuscular Strength', desc: 'Focus on heavy compounds (RPE 8-10), lower rep ranges & peak power output.' },
                  { id: 'Fat Loss', title: 'Metabolic Conditioning & Cut', desc: 'High density, reduced rest intervals & elevated calorie expenditure.' },
                  { id: 'Athletic', title: 'Athletic Performance & Power', desc: 'Explosive triple extension, multi-planar resilience & rotational strength.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as typeof goal)}
                    className={`p-4 rounded-xl text-left border transition ${
                      goal === item.id
                        ? 'bg-lime-400/10 border-lime-400/80 shadow-md ring-1 ring-lime-400/50'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <p className={`text-sm font-extrabold ${goal === item.id ? 'text-lime-400' : 'text-white'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">Step 2: Select your lifting training age</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Beginner', title: 'Novice (< 1 Year)', desc: 'Linear progression, perfecting movement patterns & fast neural adaptation.' },
                  { id: 'Intermediate', title: 'Intermediate (1–3 Years)', desc: 'Wave loading, specialized volume distribution & targeted weak points.' },
                  { id: 'Advanced', title: 'Advanced (3+ Years)', desc: 'High work capacity, RPE micro-periodization & peak stimulus fatigue ratio.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLevel(item.id as typeof level)}
                    className={`p-4 rounded-xl text-left border transition ${
                      level === item.id
                        ? 'bg-lime-400/10 border-lime-400/80 ring-1 ring-lime-400/50'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <p className={`text-sm font-extrabold ${level === item.id ? 'text-lime-400' : 'text-white'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Days Per Week */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">Step 3: How many days per week will you commit?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { days: 3, label: '3 Days / Week', sub: 'Full Body Compound Triad' },
                  { days: 4, label: '4 Days / Week', sub: 'Upper / Lower Split' },
                  { days: 5, label: '5 Days / Week', sub: 'Hybrid PPL + Upper/Lower' },
                  { days: 6, label: '6 Days / Week', sub: 'Push / Pull / Legs (PPL)' }
                ].map((item) => (
                  <button
                    key={item.days}
                    onClick={() => setDaysPerWeek(item.days)}
                    className={`p-4 rounded-xl text-center border transition ${
                      daysPerWeek === item.days
                        ? 'bg-lime-400/10 border-lime-400/80 ring-1 ring-lime-400/50'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-2xl font-black font-mono text-white block">{item.days}</span>
                    <span className={`text-xs font-bold block mt-1 ${daysPerWeek === item.days ? 'text-lime-400' : 'text-zinc-200'}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-1">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Available Equipment */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">Step 4: What equipment will be available?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Commercial', title: 'Full Commercial Gym', desc: 'Barbells, dumbbells, cables, selectorized machines, platforms.' },
                  { id: 'Home Barbell', title: 'Garage / Home Gym (Barbell & Rack)', desc: 'Squat rack, Olympic barbell, flat bench, pull-up bar, bumper plates.' },
                  { id: 'Dumbbells', title: 'Dumbbells & Adjustable Bench', desc: 'Versatile dumbbell isolation and compound dumbbell pressing.' },
                  { id: 'Bodyweight', title: 'Calisthenics & Minimalist', desc: 'Pull-up bar, dip bars, gymnast rings, bodyweight progressions.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEquipment(item.id as typeof equipment)}
                    className={`p-4 rounded-xl text-left border transition ${
                      equipment === item.id
                        ? 'bg-lime-400/10 border-lime-400/80 ring-1 ring-lime-400/50'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <p className={`text-sm font-extrabold ${equipment === item.id ? 'text-lime-400' : 'text-white'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
              >
                Previous Step
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-extrabold transition shadow-md shadow-lime-400/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Split...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Split Blueprint</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Step 5: Generated Routine Showcase */
        generatedRoutine && (
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-lime-400/10 text-lime-400 border border-lime-400/30">
                    GENERATED BLUEPRINT
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{generatedRoutine.split}</span>
                </div>
                <h2 className="text-xl font-black text-white mt-1.5">{generatedRoutine.name}</h2>
                <p className="text-xs text-zinc-300 mt-1">{generatedRoutine.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
                >
                  Adjust Parameters
                </button>
              </div>
            </div>

            {/* Prescribed Movements Breakdown */}
            <div>
              <h3 className="text-sm font-extrabold text-white mb-3 flex items-center space-x-2">
                <Dumbbell className="w-4 h-4 text-lime-400" />
                <span>Prescribed Core Movements ({generatedRoutine.exercises.length} Exercises)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {generatedRoutine.exercises.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-lime-400 uppercase">Movement #{idx + 1}</span>
                      <p className="text-xs font-extrabold text-white mt-0.5">{item.exerciseId.replace('ex-', '').replace(/-/g, ' ').toUpperCase()}</p>
                      <p className="text-[11px] text-zinc-400">Prescription: {item.targetSets} sets x {item.targetReps} reps</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-300 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                      RPE 8-9
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleSaveToRoutines}
                disabled={savedSuccess}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition border ${
                  savedSuccess
                    ? 'bg-zinc-800 text-emerald-400 border-emerald-500/30'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Saved to My Routines</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4" />
                    <span>Save to My Routines</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStartImmediately}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch This Routine Live</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
