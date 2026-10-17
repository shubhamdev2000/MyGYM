import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { GymAnnouncement, GymChallenge } from '../../types';
import {
  Megaphone,
  Trophy,
  Plus,
  AlertCircle,
  Bell,
  Trash2,
  CheckCircle2,
  X,
  Flame,
  Calendar,
  Eye,
  EyeOff
} from 'lucide-react';

export const AnnouncementsPublisher: React.FC = () => {
  const {
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    toggleAnnouncementActive,
    challenges,
    addChallenge
  } = useGym();

  const [showAddAnnModal, setShowAddAnnModal] = useState(false);
  const [showAddChModal, setShowAddChModal] = useState(false);

  // New Announcement Form
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<GymAnnouncement['type']>('event');
  const [priority, setPriority] = useState<GymAnnouncement['priority']>('high');

  // New Challenge Form
  const [chTitle, setChTitle] = useState('');
  const [chDescription, setChDescription] = useState('');
  const [chTarget, setChTarget] = useState('');
  const [chReward, setChReward] = useState('');
  const [daysLeft, setDaysLeft] = useState(30);
  const [chCategory, setChCategory] = useState('Volume');

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    addAnnouncement({
      title: annTitle,
      content: annContent,
      type: annType,
      priority,
      active: true
    });

    setAnnTitle('');
    setAnnContent('');
    setShowAddAnnModal(false);
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chTitle || !chTarget) return;

    addChallenge({
      title: chTitle,
      description: chDescription,
      target: chTarget,
      reward: chReward || 'TITAN Elite Shaker & Free Smoothies',
      daysLeft,
      category: chCategory
    });

    setChTitle('');
    setChDescription('');
    setChTarget('');
    setChReward('');
    setShowAddChModal(false);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            MEMBER BROADCAST NETWORK
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Announcements & Challenge Publisher</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Transmit urgent facility broadcasts and launch community challenges that appear live across all member feeds.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddChModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition border border-zinc-700"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>New Challenge</span>
          </button>
          <button
            onClick={() => setShowAddAnnModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition hover:scale-105"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Alert</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: BROADCAST ANNOUNCEMENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <Megaphone className="w-5 h-5 text-emerald-400" />
              <span>Live Gym Broadcast Banners ({announcements.length})</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Active announcements appear at the top of the Member Dashboard</p>
          </div>
        </div>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                ann.active
                  ? 'bg-zinc-900/80 border-emerald-500/40 glow-emerald'
                  : 'bg-zinc-950/70 border-zinc-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <span
                  className={`p-2 rounded-xl mt-0.5 ${
                    ann.priority === 'urgent'
                      ? 'bg-red-500/20 text-red-400'
                      : ann.priority === 'high'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-extrabold text-white">{ann.title}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {ann.type}
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        ann.active ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {ann.active ? 'BROADCASTING' : 'OFFLINE'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{ann.content}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-mono text-zinc-400">{ann.date}</span>
                <button
                  onClick={() => toggleAnnouncementActive(ann.id)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                  title={ann.active ? 'Hide announcement' : 'Show announcement'}
                >
                  {ann.active ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 transition"
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: MONTHLY CHALLENGES MANAGER */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Community Challenges & Competitions</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">Motivate members with volume and strength milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 text-amber-400 border border-zinc-800">
                    {ch.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{ch.daysLeft} Days Left</span>
                </div>

                <h3 className="text-base font-extrabold text-white">{ch.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{ch.description}</p>

                <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Benchmark:</span>
                    <span className="font-mono font-bold text-white">{ch.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Enrolled Athletes:</span>
                    <span className="font-mono font-bold text-emerald-400">{ch.participantsCount} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Reward:</span>
                    <span className="text-amber-400 font-semibold">{ch.reward}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono">Status: Live in Member App</span>
                <span className="text-lime-400 font-bold">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Announcement Modal */}
      {showAddAnnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-emerald-400" />
                <span>Broadcast New Announcement</span>
              </h3>
              <button
                onClick={() => setShowAddAnnModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Banner Title</label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ New Eleiko Bumper Plates Arrived in Zone A"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Announcement Body</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Brand new calibrated competition discs are now loaded on platforms 1-4. Please use collars."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Type</label>
                  <select
                    value={annType}
                    onChange={(e) => setAnnType(e.target.value as GymAnnouncement['type'])}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="event">Event</option>
                    <option value="alert">General Alert</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="feature">New Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as GymAnnouncement['priority'])}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAnnModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition"
                >
                  Broadcast Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Challenge Modal */}
      {showAddChModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Launch Gym-Wide Challenge</span>
              </h3>
              <button
                onClick={() => setShowAddChModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateChallenge} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Challenge Title</label>
                <input
                  type="text"
                  placeholder="e.g. 500-Pound Deadlift Club"
                  value={chTitle}
                  onChange={(e) => setChTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pull a clean lockout deadlift of 227.5kg/500lb with zero hitching."
                  value={chDescription}
                  onChange={(e) => setChDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Target Benchmark</label>
                  <input
                    type="text"
                    placeholder="e.g. 227.5 kg Deadlift"
                    value={chTarget}
                    onChange={(e) => setChTarget(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Days Duration</label>
                  <input
                    type="number"
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(parseInt(e.target.value) || 30)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Reward / Prize</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Hall of Fame Plaque + 1 Free Month VIP"
                  value={chReward}
                  onChange={(e) => setChReward(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black shadow-lg shadow-amber-400/20 transition"
                >
                  Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
