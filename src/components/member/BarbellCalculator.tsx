import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  calculateEpley1RM,
  calculateBrzycki1RM,
  get1RMPercentages,
  calculatePlates,
  PlateInfo
} from '../../utils/formatters';
import {
  Calculator,
  Dumbbell,
  Layers,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

export const BarbellCalculator: React.FC = () => {
  const { unit } = useGym();

  // 1RM Estimator State
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [liftReps, setLiftReps] = useState<number>(5);
  const [formula, setFormula] = useState<'Epley' | 'Brzycki'>('Epley');

  // Barbell Loader State
  const [targetWeight, setTargetWeight] = useState<number>(140);
  const [barWeight, setBarWeight] = useState<number>(20);

  // Compute 1RM
  const e1RM =
    formula === 'Epley'
      ? calculateEpley1RM(liftWeight, liftReps)
      : calculateBrzycki1RM(liftWeight, liftReps);

  const percentageTable = get1RMPercentages(e1RM);

  // Compute Plate loading
  const { plates, achievableWeight } = calculatePlates(
    targetWeight,
    barWeight,
    unit
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            METRICS & COMPUTATION
          </span>
          <h1 className="text-2xl font-black text-white mt-2">1RM Estimator & Barbell Plate Loader</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Calculate your maximal strength ceiling and eliminate mental math on the platform.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-300">
          <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
            Active Unit: <strong className="text-lime-400">{unit.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {/* SECTION 1: VISUAL BARBELL PLATE LOADER */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <Dumbbell className="w-5 h-5 text-lime-400" />
              <span>Interactive Barbell Plate Loader</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Exact colored Olympic bumper plates to rack per side
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            {[60, 80, 100, 120, 140, 160, 180, 200, 220].map((preset) => (
              <button
                key={preset}
                onClick={() => setTargetWeight(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  targetWeight === preset
                    ? 'bg-lime-400 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Target Weight Controls & Bar Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Weight Input */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Target Total Weight ({unit})
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTargetWeight(Math.max(barWeight, targetWeight - (unit === 'kg' ? 2.5 : 5)))}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                step="2.5"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-center text-xl font-black font-mono text-white focus:outline-none focus:border-lime-400"
              />
              <button
                onClick={() => setTargetWeight(targetWeight + (unit === 'kg' ? 2.5 : 5))}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 text-center mt-2">
              Per side load: <strong>{((targetWeight - barWeight) / 2).toFixed(2)} {unit}</strong>
            </p>
          </div>

          {/* Barbell Weight Selector */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Barbell Tare Weight
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { weight: 20, label: '20kg (Olympic Standard)' },
                { weight: 15, label: '15kg (Women\'s Bar)' },
                { weight: 10, label: '10kg (Technique Bar)' },
                { weight: 25, label: '25kg (Squat Bar)' }
              ].map((bar) => (
                <button
                  key={bar.weight}
                  onClick={() => setBarWeight(bar.weight)}
                  className={`p-2 rounded-xl text-left text-xs transition border ${
                    barWeight === bar.weight
                      ? 'bg-lime-400/10 border-lime-400/80 text-lime-400 font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono font-bold block">{bar.weight} {unit}</span>
                  <span className="text-[10px] text-zinc-400 block truncate">{bar.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Achievable Load Summary */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Platform Load Verification
              </span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-3xl font-black font-mono text-white">{achievableWeight}</span>
                <span className="text-sm font-bold text-lime-400">{unit}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                {achievableWeight === targetWeight
                  ? '✓ Exact weight achieved with standard plates'
                  : `Rounded to nearest plate: ${achievableWeight} ${unit}`}
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL BARBELL SLEEVE GRAPHIC */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-x-auto">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 text-center">
            Barbell Sleeve Diagram (Per Side Loading)
          </p>

          <div className="flex items-center justify-center min-w-[500px] py-8 px-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            {/* Center Bar Shaft */}
            <div className="h-6 w-28 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-600 rounded-l-md border-y border-zinc-500 shadow-inner flex items-center justify-center">
              <span className="text-[9px] font-mono font-black text-black tracking-widest uppercase">
                BAR {barWeight}{unit}
              </span>
            </div>

            {/* Barbell Collar / Sleeve Stopper */}
            <div className="h-14 w-4 bg-zinc-500 border-x border-zinc-400 shadow-lg rounded-sm" />

            {/* Sleeve */}
            <div className="relative flex items-center bg-zinc-700/80 border-y border-zinc-500 h-8 px-1 min-w-[240px] rounded-r-md">
              {/* Stacked Plates on Sleeve */}
              {plates.length === 0 ? (
                <span className="text-xs text-zinc-400 font-mono italic mx-auto">
                  Empty Bar ({barWeight} {unit})
                </span>
              ) : (
                <div className="flex items-center space-x-1">
                  {plates.map((plateGroup, pIdx) => {
                    const plateElements = [];
                    for (let i = 0; i < plateGroup.countPerSide; i++) {
                      plateElements.push(
                        <div
                          key={`${pIdx}-${i}`}
                          className={`flex items-center justify-center rounded-md font-mono font-black text-[10px] shadow-lg border border-white/20 transition-transform hover:scale-105 select-none ${plateGroup.heightClass}`}
                          style={{
                            backgroundColor: plateGroup.color,
                            color: plateGroup.textColor,
                            width: plateGroup.weight >= 20 ? '36px' : plateGroup.weight >= 10 ? '28px' : '22px'
                          }}
                          title={`${plateGroup.label} Plate`}
                        >
                          <span className="rotate-90 whitespace-nowrap font-bold">
                            {plateGroup.weight}
                          </span>
                        </div>
                      );
                    }
                    return plateElements;
                  })}

                  {/* Barbell Spring Collar / Clip */}
                  <div className="h-9 w-2.5 bg-zinc-300 rounded-sm shadow-md border border-zinc-200" title="Safety Collar" />
                </div>
              )}
            </div>
          </div>

          {/* Plate count summary text */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {plates.map((p) => (
              <div
                key={p.weight}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-white font-bold">{p.countPerSide}x</span>
                <span className="text-zinc-400 font-mono">{p.label}</span>
                <span className="text-zinc-500 text-[10px]">({p.countPerSide * 2} total)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: 1RM ESTIMATOR & PERCENTAGE MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estimator Input Controls */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div>
            <h2 className="text-base font-black text-white flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-lime-400" />
              <span>One-Rep Max (1RM) Estimator</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Enter your best set weight and reps to determine max strength.
            </p>
          </div>

          {/* Lift Weight */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-400">Weight Lifted</span>
              <span className="text-white font-mono">{liftWeight} {unit}</span>
            </div>
            <input
              type="range"
              min="20"
              max="350"
              step="2.5"
              value={liftWeight}
              onChange={(e) => setLiftWeight(parseFloat(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
            <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
              <span>20{unit}</span>
              <span>180{unit}</span>
              <span>350{unit}</span>
            </div>
          </div>

          {/* Reps */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-400">Reps Completed</span>
              <span className="text-lime-400 font-mono">{liftReps} REPS</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={liftReps}
              onChange={(e) => setLiftReps(parseInt(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
            <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
              <span>1 (True Max)</span>
              <span>8 (Hypertrophy)</span>
              <span>15 (Endurance)</span>
            </div>
          </div>

          {/* Formula Toggle */}
          <div>
            <span className="text-xs font-bold text-zinc-400 block mb-2">Biomechanical Formula</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormula('Epley')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                  formula === 'Epley'
                    ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                Epley Formula (Standard)
              </button>
              <button
                onClick={() => setFormula('Brzycki')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                  formula === 'Brzycki'
                    ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                Brzycki Formula (Tighter)
              </button>
            </div>
          </div>

          {/* Estimated 1RM Readout Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-lime-400/10 via-zinc-950 to-zinc-950 border border-lime-400/40 text-center">
            <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400 block">
              Estimated 1-Rep Max
            </span>
            <div className="mt-2 flex items-baseline justify-center space-x-2">
              <span className="text-5xl font-black font-mono text-white tracking-tight">{e1RM}</span>
              <span className="text-lg font-bold text-lime-400">{unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Based on {liftWeight} {unit} performed for {liftReps} reps
            </p>
          </div>
        </div>

        {/* Training Intensity Breakdown Table */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Percent className="w-4 h-4 text-lime-400" />
                <span>Percentage Intensity Matrix</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Prescribed loads mapped directly to training stimulus zones
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="text-zinc-400 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800 pb-2">
                  <th className="py-2.5 px-3">Intensity</th>
                  <th className="py-2.5 px-3">Working Load</th>
                  <th className="py-2.5 px-3">Rep Window</th>
                  <th className="py-2.5 px-3">Training Adaptations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {percentageTable.map((row) => (
                  <tr key={row.percentage} className="hover:bg-zinc-800/30 transition">
                    <td className="py-3 px-3">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                          row.percentage >= 90
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : row.percentage >= 80
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {row.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-white text-sm">
                      {row.weight} {unit}
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-300">
                      {row.estimatedReps}
                    </td>
                    <td className="py-3 px-3 text-zinc-400">
                      {row.percentage >= 90
                        ? 'Peak Neuromuscular Strength & Singles'
                        : row.percentage >= 80
                        ? 'Hypertrophy & Heavy Working Sets'
                        : row.percentage >= 70
                        ? 'Moderate Volume & Speed Work'
                        : 'Warmup & Technique Deload'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
