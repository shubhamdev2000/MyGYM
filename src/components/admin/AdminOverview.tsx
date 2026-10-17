import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  ADMIN_REVENUE_CHART_DATA,
  PEAK_TRAFFIC_DATA,
  TIER_DISTRIBUTION_DATA
} from '../../mock/initialData';
import { formatNumber } from '../../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  DollarSign,
  Users,
  UserPlus,
  TrendingDown,
  UserCheck,
  Building2,
  Calendar,
  AlertCircle,
  Megaphone,
  Wrench,
  ArrowUpRight
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { setAdminTab, members, equipment } = useGym();

  const maintenanceNeeded = equipment.filter((e) => e.status !== 'Operational').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ENTERPRISE FACILITY INTELLIGENCE
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Executive KPI & Revenue Dashboard</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time analytics across membership revenue, facility footfall, and operational health.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAdminTab('members')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition border border-zinc-700"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Member</span>
          </button>
          <button
            onClick={() => setAdminTab('announcements')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Broadcast Alert</span>
          </button>
        </div>
      </div>

      {/* TOP ROW: 5 EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: MRR */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Monthly Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">$48,920</span>
            <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.4% MoM</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Members */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Active Members</span>
            <span className="p-1.5 rounded-lg bg-lime-400/10 text-lime-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">1,248</span>
            <div className="flex items-center space-x-1 text-xs text-lime-400 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+8.1% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: New Signups */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">New Signups</span>
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <UserPlus className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">142</span>
            <div className="flex items-center space-x-1 text-xs text-cyan-400 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+15.3% pacing</span>
            </div>
          </div>
        </div>

        {/* Card 4: Churn Rate */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Member Churn</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">2.1%</span>
            <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold mt-1">
              <span>-0.4% (Industry Low)</span>
            </div>
          </div>
        </div>

        {/* Card 5: Daily Check-ins Today */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Today Check-ins</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">487</span>
            <div className="flex items-center space-x-1 text-xs text-zinc-400 font-medium mt-1">
              <span>Live crowd: 64% capacity</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: MONTHLY REVENUE & PEAK TRAFFIC HOURS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REVENUE GROWTH AREA CHART */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 lg:col-span-2 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Monthly Recurring Revenue (MRR) Growth</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Trailing 6-month gross receipts vs operational overhead</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800">
              Net Margin: +64.4%
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`$${formatNumber(val as number)}`, 'Gross/Expense']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expenses" name="Facility Overhead" stroke="#71717a" fillOpacity={0.1} fill="#71717a" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MEMBERSHIP TIER PIE CHART */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Users className="w-4 h-4 text-lime-400" />
                <span>Tier Distribution</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Active subscriptions by package</p>
            </div>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TIER_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {TIER_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
                  formatter={(val: unknown) => [`${val} Members`, 'Active']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs">
            {TIER_DISTRIBUTION_DATA.map((t) => (
              <div key={t.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-zinc-300 font-medium">{t.name}</span>
                </div>
                <span className="text-white font-mono font-bold">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: PEAK GYM TRAFFIC HOURS */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Facility Footfall & Turnstile Traffic By Hour</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Hourly member check-ins measured against max capacity (100 members)</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            Peak Window: 05:00 PM – 07:30 PM
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PEAK_TRAFFIC_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="hour" stroke="#71717a" tick={{ fontSize: 11 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
                formatter={(val: unknown) => [`${val}% capacity`, 'Crowd Level']}
              />
              <Bar dataKey="traffic" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
