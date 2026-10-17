import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { GymMember } from '../../types';
import {
  Users,
  Search,
  UserPlus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Snowflake,
  MoreVertical,
  Plus,
  X,
  Edit2,
  Trash2,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export const MemberManagement: React.FC = () => {
  const {
    members,
    addMember,
    updateMember,
    deleteMember,
    renewMemberSubscription,
    freezeMemberAccount,
    trainers
  } = useGym();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<GymMember | null>(null);

  // Add form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState<GymMember['tier']>('Pro');
  const [trainerId, setTrainerId] = useState('');

  const statuses = ['All', 'Active', 'Expiring Soon', 'Expired', 'Frozen'];
  const tiers = ['All', 'Basic', 'Pro', 'Elite VIP'];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const assigned = trainers.find((t) => t.id === trainerId);
    const monthlySpend = tier === 'Elite VIP' ? 189 : tier === 'Pro' ? 119 : 59;
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    addMember({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      tier,
      status: 'Active',
      trainerId: assigned ? assigned.id : undefined,
      trainerName: assigned ? assigned.name : undefined,
      expiryDate: expiry.toISOString().split('T')[0],
      lastCheckIn: 'Just registered',
      monthlySpend
    });

    setName('');
    setEmail('');
    setTier('Pro');
    setTrainerId('');
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updateMember(editingMember.id, {
      tier: editingMember.tier,
      status: editingMember.status,
      trainerName: editingMember.trainerName
    });
    setEditingMember(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            CLIENT DATABASE & ACCESS
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Member & Subscription Suite</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage memberships, automated billing plans, trainer assignments, and card access controls.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition hover:scale-105"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Database</span>
          <span className="text-xl font-black font-mono text-white mt-1 block">{members.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Active Status</span>
          <span className="text-xl font-black font-mono text-emerald-400 mt-1 block">
            {members.filter((m) => m.status === 'Active').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Expiring Soon</span>
          <span className="text-xl font-black font-mono text-amber-400 mt-1 block">
            {members.filter((m) => m.status === 'Expiring Soon').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Frozen Accounts</span>
          <span className="text-xl font-black font-mono text-cyan-400 mt-1 block">
            {members.filter((m) => m.status === 'Frozen').length}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search member by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Status */}
          <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs shrink-0">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  statusFilter === st
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Tier */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-300 focus:outline-none focus:border-emerald-400 shrink-0"
          >
            {tiers.map((t) => (
              <option key={t} value={t}>
                Tier: {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Data Table */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Subscription Tier</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4">Trainer Assigned</th>
                <th className="py-3 px-4">Last Check-in</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-800/30 transition">
                  {/* Name & Avatar */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-white text-xs">{member.name}</p>
                        <p className="text-[10px] text-zinc-400">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-3 px-4 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        member.tier === 'Elite VIP'
                          ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30'
                          : member.tier === 'Pro'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {member.tier} (${member.monthlySpend}/mo)
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        member.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : member.status === 'Expiring Soon'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : member.status === 'Frozen'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      <span>{member.status}</span>
                    </span>
                  </td>

                  {/* Trainer */}
                  <td className="py-3 px-4 text-zinc-300">
                    {member.trainerName || <span className="text-zinc-500 italic">None</span>}
                  </td>

                  {/* Last Check-in */}
                  <td className="py-3 px-4 font-mono text-zinc-400 text-[11px]">
                    {member.lastCheckIn}
                  </td>

                  {/* Expiry Date */}
                  <td className="py-3 px-4 font-mono text-zinc-300 text-[11px]">
                    {member.expiryDate}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* Renew 1 Month */}
                      <button
                        onClick={() => renewMemberSubscription(member.id, 1)}
                        className="px-2 py-1 rounded bg-zinc-800 hover:bg-emerald-500 hover:text-black text-emerald-400 text-[10px] font-bold transition"
                        title="Renew 1 month"
                      >
                        +1M Renew
                      </button>

                      {/* Freeze Toggle */}
                      <button
                        onClick={() => freezeMemberAccount(member.id)}
                        className={`p-1.5 rounded transition ${
                          member.status === 'Frozen'
                            ? 'bg-cyan-500 text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:text-cyan-400'
                        }`}
                        title={member.status === 'Frozen' ? 'Unfreeze' : 'Freeze account'}
                      >
                        <Snowflake className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white transition"
                        title="Edit member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${member.name} from gym database?`)) {
                            deleteMember(member.id);
                          }
                        }}
                        className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-red-400 transition"
                        title="Delete member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>Onboard New Gym Member</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. jordan@athlete.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Membership Plan</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as GymMember['tier'])}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Basic">Basic ($59/mo) — Floor Access</option>
                  <option value="Pro">Pro ($119/mo) — Full Classes + Recovery</option>
                  <option value="Elite VIP">Elite VIP ($189/mo) — Dedicated Coach & Lounge</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Assign Personal Trainer</label>
                <select
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="">No Trainer Assigned</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
                >
                  Activate Membership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Edit2 className="w-4 h-4 text-emerald-400" />
                <span>Edit {editingMember.name}</span>
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Tier</label>
                <select
                  value={editingMember.tier}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, tier: e.target.value as GymMember['tier'] })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Basic">Basic ($59/mo)</option>
                  <option value="Pro">Pro ($119/mo)</option>
                  <option value="Elite VIP">Elite VIP ($189/mo)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Account Status</label>
                <select
                  value={editingMember.status}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, status: e.target.value as GymMember['status'] })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Active">Active</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Expired">Expired</option>
                  <option value="Frozen">Frozen</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
