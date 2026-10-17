import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  Apple,
  Droplet,
  Plus,
  Flame,
  Clock,
  Sparkles,
  RotateCcw,
  PlusCircle,
  X,
  UtensilsCrossed,
  Check
} from 'lucide-react';

export const NutritionTracker: React.FC = () => {
  const { nutrition, addWater, resetWater, logMeal } = useGym();
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom meal form
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Post-Workout'>('Lunch');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  // Preset meals
  const PRESET_MEALS = [
    { name: 'Whey Protein Isolate Shake', type: 'Post-Workout', cals: 140, p: 30, c: 3, f: 1 },
    { name: 'Chicken Breast & Jasmine Rice', type: 'Lunch', cals: 580, p: 52, c: 68, f: 8 },
    { name: 'Greek Yogurt 0% & Mixed Berries', type: 'Breakfast', cals: 210, p: 24, c: 25, f: 1 },
    { name: 'Sirloin Steak & Baked Sweet Potato', type: 'Dinner', cals: 650, p: 48, c: 54, f: 22 },
    { name: 'Whole Eggs & Sourdough Toast', type: 'Breakfast', cals: 380, p: 24, c: 32, f: 16 },
    { name: 'Albacore Tuna & Avocado Rice Bowl', type: 'Dinner', cals: 460, p: 42, c: 45, f: 12 }
  ];

  // Totals
  const totalCals = nutrition.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = nutrition.meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = nutrition.meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = nutrition.meals.reduce((sum, m) => sum + m.fats, 0);

  const calPct = Math.min(100, Math.round((totalCals / nutrition.targetCalories) * 100));
  const pPct = Math.min(100, Math.round((totalProtein / nutrition.targetProtein) * 100));
  const cPct = Math.min(100, Math.round((totalCarbs / nutrition.targetCarbs) * 100));
  const fPct = Math.min(100, Math.round((totalFats / nutrition.targetFats) * 100));
  const waterPct = Math.min(100, Math.round((nutrition.waterCurrentMl / nutrition.waterTargetMl) * 100));

  const handleAddPreset = (preset: typeof PRESET_MEALS[0]) => {
    logMeal({
      name: preset.name,
      mealType: preset.type as typeof mealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: preset.cals,
      protein: preset.p,
      carbs: preset.c,
      fats: preset.f
    });
  };

  const handleAddCustomMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName) return;

    logMeal({
      name: mealName,
      mealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fats: parseInt(fats) || 0
    });

    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setShowCustomModal(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            METABOLIC EXCELLENCE
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Macro, Nutrition & Hydration</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Fuel your muscular hypertrophy with surgical macro precision and automated water tracking.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Log Custom Meal</span>
        </button>
      </div>

      {/* TOP ROW: MACRO RINGS & PROGRESS + HYDRATION STATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Macros Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Flame className="w-5 h-5 text-lime-400" />
                <span>Daily Caloric & Macro Targets</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Surplus configured for lean tissue hypertrophy</p>
            </div>
            <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800">
              {totalCals} / {nutrition.targetCalories} kcal ({calPct}%)
            </span>
          </div>

          {/* Primary Calorie Bar */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-bold text-zinc-300">Energy Surplus</span>
              <span className="text-xs font-mono text-lime-400 font-bold">
                {nutrition.targetCalories - totalCals > 0
                  ? `${nutrition.targetCalories - totalCals} kcal remaining`
                  : 'Target Reached'}
              </span>
            </div>
            <div className="h-3.5 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${calPct}%` }}
              />
            </div>
          </div>

          {/* 3 Macro Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Protein */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-emerald-400">Protein (g)</span>
                <span className="font-mono text-white font-bold">{totalProtein} / {nutrition.targetProtein}g</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${pPct}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 font-mono">{pPct}% of target (2.2g/kg)</p>
            </div>

            {/* Carbs */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-400">Carbohydrates (g)</span>
                <span className="font-mono text-white font-bold">{totalCarbs} / {nutrition.targetCarbs}g</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${cPct}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 font-mono">{cPct}% of target (Glycogen fuel)</p>
            </div>

            {/* Fats */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-purple-400">Essential Fats (g)</span>
                <span className="font-mono text-white font-bold">{totalFats} / {nutrition.targetFats}g</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${fPct}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 font-mono">{fPct}% of target (Hormonal health)</p>
            </div>
          </div>
        </div>

        {/* HYDRATION STATION */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-cyan-400" />
                <span>Hydration Protocol</span>
              </h2>
              <button
                onClick={resetWater}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
                title="Reset water counter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">Electrolyte & cellular fluid balance</p>

            <div className="my-5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
              <span className="text-3xl font-black font-mono text-white block">
                {nutrition.waterCurrentMl} <span className="text-sm font-bold text-cyan-400">/ {nutrition.waterTargetMl} ml</span>
              </span>
              <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden mt-3 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${waterPct}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                {waterPct >= 100 ? '✓ Peak Hydration Achieved' : `${nutrition.waterTargetMl - nutrition.waterCurrentMl} ml remaining`}
              </p>
            </div>
          </div>

          {/* Quick Add Water Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addWater(250)}
              className="py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-cyan-500 hover:text-black border border-zinc-800 text-zinc-200 text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+250ml Glass</span>
            </button>
            <button
              onClick={() => addWater(500)}
              className="py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-cyan-500 hover:text-black border border-zinc-800 text-zinc-200 text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+500ml Shaker</span>
            </button>
            <button
              onClick={() => addWater(1000)}
              className="col-span-2 py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1000ml HydroJug</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: PRESET HIGH-PROTEIN FOODS & LOGGED MEALS TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preset High-Protein Quick Adds */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>1-Click Preset Foods</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Quickly add staple bodybuilding meals</p>
          </div>

          <div className="space-y-2.5">
            {PRESET_MEALS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAddPreset(preset)}
                className="w-full p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/40 transition text-left flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-extrabold text-white group-hover:text-lime-400 transition">{preset.name}</p>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {preset.p}g P • {preset.c}g C • {preset.f}g F • {preset.cals} kcal
                  </p>
                </div>
                <span className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-lime-400 group-hover:text-black text-zinc-400 transition">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Logged Meals */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                <span>Today's Logged Meals ({nutrition.meals.length})</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Chronological fuel intake record</p>
            </div>
          </div>

          <div className="space-y-3">
            {nutrition.meals.map((meal) => (
              <div
                key={meal.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 text-lime-400 border border-zinc-800">
                      {meal.mealType}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{meal.time}</span>
                  </div>
                  <p className="text-sm font-extrabold text-white mt-1">{meal.name}</p>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                  <span className="text-emerald-400 font-bold">{meal.protein}g Protein</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-amber-400">{meal.carbs}g Carbs</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-purple-400">{meal.fats}g Fat</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-white font-bold px-2 py-0.5 rounded bg-zinc-900">
                    {meal.calories} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Custom Meal Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <UtensilsCrossed className="w-4 h-4 text-lime-400" />
                <span>Log Custom Meal</span>
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomMeal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Meal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Salmon, Quinoa & Asparagus"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Meal Category</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as typeof mealType)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Post-Workout">Post-Workout</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    placeholder="e.g. 550"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 60"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition"
                >
                  Log Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
