import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Trainer, GroupClass } from '../../types';
import {
  CalendarDays,
  Users,
  Plus,
  Star,
  Clock,
  MapPin,
  CheckCircle,
  X,
  UserCheck,
  Shield,
  Layers
} from 'lucide-react';

export const TrainerClassManager: React.FC = () => {
  const { trainers, addTrainer, classes, addClass } = useGym();

  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  // New Trainer Form
  const [trainerName, setTrainerName] = useState('');
  const [role, setRole] = useState('Senior Performance Coach');
  const [specialization, setSpecialization] = useState('');
  const [rating, setRating] = useState('4.9');

  // New Class Form
  const [className, setClassName] = useState('');
  const [category, setCategory] = useState<GroupClass['category']>('HIIT');
  const [instructor, setInstructor] = useState(trainers[0]?.name || 'Marcus Vance');
  const [time, setTime] = useState('Tomorrow, 06:00 PM');
  const [durationMinutes, setDurationMinutes] = useState(50);
  const [room, setRoom] = useState('Studio Alpha');
  const [capacity, setCapacity] = useState(20);
  const [difficulty, setDifficulty] = useState<GroupClass['difficulty']>('Intermediate');

  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainerName || !specialization) return;

    addTrainer({
      name: trainerName,
      role,
      specialization,
      clientsCount: 0,
      rating: parseFloat(rating) || 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      available: true
    });

    setTrainerName('');
    setSpecialization('');
    setShowAddTrainerModal(false);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className) return;

    addClass({
      name: className,
      category,
      instructor,
      time,
      durationMinutes,
      room,
      capacity,
      difficulty
    });

    setClassName('');
    setShowAddClassModal(false);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            STAFF & ROSTER ORCHESTRATION
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Trainer & Group Class Scheduler</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Supervise certified coaching staff, assign client rosters, and curate high-occupancy studio classes.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddTrainerModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition border border-zinc-700"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Trainer</span>
          </button>
          <button
            onClick={() => setShowAddClassModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition hover:scale-105"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Create New Class</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: COACHING STAFF DIRECTORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Certified Coaching Staff ({trainers.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainers.map((tr) => (
            <div
              key={tr.id}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tr.available
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tr.available ? 'Accepting Clients' : 'Roster Full'}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{tr.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={tr.avatar}
                    alt={tr.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-zinc-700"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{tr.name}</h3>
                    <p className="text-[11px] text-zinc-400">{tr.role}</p>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block">Specialization</span>
                  <p className="text-zinc-200 mt-0.5 text-[11px]">{tr.specialization}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Active Roster</span>
                <span className="font-mono font-bold text-emerald-400">{tr.clientsCount} Athletes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: GROUP FITNESS CLASS SCHEDULE MANAGER */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-emerald-400" />
              <span>Active Group Class Master Schedule</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Live class attendance and capacity utilization</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800">
                <th className="py-3 px-4">Class Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4">Time & Duration</th>
                <th className="py-3 px-4">Studio Room</th>
                <th className="py-3 px-4">Capacity Load</th>
                <th className="py-3 px-4">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {classes.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white text-xs">{c.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-lime-400">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-200 font-medium">{c.instructor}</td>
                  <td className="py-3.5 px-4 font-mono text-zinc-300">
                    {c.time} ({c.durationMinutes}m)
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.room}</td>
                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={`font-bold ${
                        c.bookedCount >= c.capacity ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {c.bookedCount} / {c.capacity} ({Math.round((c.bookedCount / c.capacity) * 100)}%)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trainer Modal */}
      {showAddTrainerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Add Coaching Staff</span>
              </h3>
              <button
                onClick={() => setShowAddTrainerModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTrainer} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Trainer Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Sterling"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Role Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Powerlifting, Kettlebells, Olympic Lifts"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Initial Rating</label>
                <input
                  type="number"
                  step="0.05"
                  min="4.0"
                  max="5.0"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTrainerModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
                >
                  Save Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-emerald-400" />
                <span>Create Group Fitness Class</span>
              </h3>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Class Title</label>
                <input
                  type="text"
                  placeholder="e.g. Barbell Metabolic Circuit"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GroupClass['category'])}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="HIIT">HIIT</option>
                    <option value="Spin">Spin</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Strength">Strength</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Instructor</label>
                  <select
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Schedule Time</label>
                <input
                  type="text"
                  placeholder="e.g. Tomorrow, 07:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Studio Room</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value) || 10)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
                >
                  Publish Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
