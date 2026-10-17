import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  VOLUME_PROGRESSION_DATA,
  ESTIMATED_1RM_PROGRESSION,
  BODY_METRICS_DATA,
  MUSCLE_DISTRIBUTION_DATA
} from '../../mock/initialData';
import { formatNumber } from '../../utils/formatters';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Scale,
  Dumbbell,
  Calendar,
  Layers,
  PlusCircle,
  X
} from 'lucide-react';

export const MemberAnalytics: React.FC = () => {
  const { unit } = useGym();
  const [timeRange, setTimeRange] = useState<'30D' | '3M' | '6M' | '1Y'>('3M');
  const [metricsData, setMetricsData] = useState(BODY_METRICS_DATA);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newWeight, setNewWeight] = useState('81.0');
  const [newBodyFat, setNewBodyFat] = useState('13.5');

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      date: 'Today',
      weight: parseFloat(newWeight) || 80,
      bodyFat: parseFloat(newBodyFat) || 13
    };
    setMetricsData([...metricsData, entry]);
    setShowLogModal(false);
  };

  const COLORS = ['#CCFF00', '#10B981', '#3B82F6', '#F59E0B', '#A855F7'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20">
            BIOMETRICS & TELEMETRY
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Performance Analytics & Trends</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Holistic data intelligence tracking compound progressions, training volume, and body composition.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Time range selector */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
            {(['30D', '3M', '6M', '1Y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  timeRange === range
                    ? 'bg-lime-400 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition border border-zinc-700"
          >
            <PlusCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>Log Metrics</span>
          </button>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: WEEKLY TRAINING VOLUME */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Dumbbell className="w-4 h-4 text-lime-400" />
                <span>Weekly Cumulative Volume Load ({unit})</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Total tonnage lifted across all sets</p>
            </div>
            <span className="text-xs font-mono font-bold text-lime-400 px-2 py-0.5 rounded bg-lime-400/10 border border-lime-400/20">
              +14.2% MoM
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VOLUME_PROGRESSION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="week" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: unknown) => [`${formatNumber(val as number)} ${unit}`, 'Volume']}
                />
                <Bar dataKey="volume" fill="#CCFF00" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: ESTIMATED 1RM PROGRESSION PER LIFT */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Compound 1RM Progression Curve</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Strength trajectory for the big 4 lifts</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ESTIMATED_1RM_PROGRESSION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`${val} ${unit}`, '1RM']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Deadlift" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Squat" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Bench" stroke="#CCFF00" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="OHP" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: BODY COMPOSITION & WEIGHT DYNAMICS */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>Body Mass & Body Fat % Progression</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Weight change with simultaneous recomposition</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
              -3.1% Body Fat
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" stroke="#06b6d4" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" domain={[10, 20]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area yAxisId="left" type="monotone" dataKey="weight" name={`Weight (${unit})`} stroke="#06b6d4" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="bodyFat" name="Body Fat %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: MUSCLE GROUP VOLUME BREAKDOWN */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Muscle Group Stimulus Distribution</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Proportion of weekly working sets per muscle</p>
            </div>
            <span className="text-xs font-mono text-zinc-400">108 Weekly Sets</span>
          </div>

          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MUSCLE_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="sets"
                  nameKey="muscle"
                  label={(props: any) => `${props.muscle || props.name} ${props.percent}%`}
                >
                  {MUSCLE_DISTRIBUTION_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: unknown) => [`${val} working sets`, 'Volume']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Log Metrics Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Scale className="w-4 h-4 text-lime-400" />
                <span>Log New Biometrics</span>
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMeasurement} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Body Weight ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Estimated Body Fat %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newBodyFat}
                  onChange={(e) => setNewBodyFat(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-black shadow-lg shadow-lime-400/20 transition"
                >
                  Save Measurement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
