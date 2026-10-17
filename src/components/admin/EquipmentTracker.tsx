import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { GymEquipment } from '../../types';
import {
  Wrench,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  X,
  Dumbbell,
  ShieldCheck,
  Search
} from 'lucide-react';

export const EquipmentTracker: React.FC = () => {
  const { equipment, updateEquipmentStatus, addEquipment, scheduleEquipmentMaintenance } = useGym();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [reportingItem, setReportingItem] = useState<GymEquipment | null>(null);
  const [serviceNotes, setServiceNotes] = useState('');

  // Add Equipment Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GymEquipment['category']>('Strength');
  const [location, setLocation] = useState('Zone A — Power Platforms');
  const [serialNumber, setSerialNumber] = useState('');

  const categories = ['All', 'Strength', 'Cardio', 'Free Weights', 'Cable'];

  const filteredEquipment = equipment.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      eq.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'All' || eq.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const total = equipment.length;
  const operational = equipment.filter((e) => e.status === 'Operational').length;
  const maintenance = equipment.filter((e) => e.status === 'Maintenance Required').length;
  const outOfOrder = equipment.filter((e) => e.status === 'Out of Order').length;
  const healthRate = Math.round((operational / total) * 100);

  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addEquipment({
      name,
      category,
      status: 'Operational',
      location,
      lastServiced: new Date().toISOString().split('T')[0],
      nextServiceDue: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      serialNumber: serialNumber || `TTN-${Math.floor(1000 + Math.random() * 9000)}`
    });

    setName('');
    setSerialNumber('');
    setShowAddModal(false);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingItem) return;
    scheduleEquipmentMaintenance(reportingItem.id, serviceNotes);
    setReportingItem(null);
    setServiceNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ASSET MANAGEMENT & SAFETY
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Equipment & Maintenance Tracker</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor mechanical integrity, schedule routine pulley lubrication, and track warranty servicing.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-lg shadow-emerald-500/20 transition hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Gym Machine</span>
        </button>
      </div>

      {/* KPI Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Facility Health</span>
          <span className="text-xl font-black font-mono text-emerald-400 mt-1 block">{healthRate}% Flawless</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Operational</span>
          <span className="text-xl font-black font-mono text-white mt-1 block">{operational} Machines</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Maintenance Needed</span>
          <span className="text-xl font-black font-mono text-amber-400 mt-1 block">{maintenance} Machines</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-red-400 block">Out of Order</span>
          <span className="text-xl font-black font-mono text-red-400 mt-1 block">{outOfOrder} Machines</span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by machine, serial or zone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs w-full md:w-auto overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                filterCategory === c
                  ? 'bg-emerald-500 text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map((eq) => {
          return (
            <div
              key={eq.id}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                eq.status === 'Operational'
                  ? 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                  : eq.status === 'Maintenance Required'
                  ? 'bg-amber-950/[0.08] border-amber-500/30'
                  : 'bg-red-950/[0.1] border-red-500/40'
              }`}
            >
              <div>
                {/* Header status toggle */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">
                    {eq.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">{eq.serialNumber}</span>
                </div>

                <h3 className="text-sm font-extrabold text-white mt-1">{eq.name}</h3>

                <div className="mt-3 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-zinc-300">{eq.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Last Serviced: {eq.lastServiced}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Next Due: {eq.nextServiceDue}</span>
                  </div>
                </div>

                {eq.notes && (
                  <div className="mt-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-amber-300/90 leading-relaxed">
                    <strong>Service Log:</strong> {eq.notes}
                  </div>
                )}
              </div>

              {/* Status Controls */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Update Operating Status:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => updateEquipmentStatus(eq.id, 'Operational')}
                    className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 ${
                      eq.status === 'Operational'
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 hover:text-emerald-400 border border-zinc-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>OK</span>
                  </button>

                  <button
                    onClick={() => updateEquipmentStatus(eq.id, 'Maintenance Required')}
                    className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 ${
                      eq.status === 'Maintenance Required'
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 hover:text-amber-400 border border-zinc-800'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>Service</span>
                  </button>

                  <button
                    onClick={() => updateEquipmentStatus(eq.id, 'Out of Order')}
                    className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 ${
                      eq.status === 'Out of Order'
                        ? 'bg-red-500 text-white shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 hover:text-red-400 border border-zinc-800'
                    }`}
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Halt</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setReportingItem(eq);
                    setServiceNotes(eq.notes || '');
                  }}
                  className="mt-2.5 w-full text-center text-[10px] text-zinc-400 hover:text-emerald-400 font-bold py-1 rounded hover:bg-zinc-800 transition"
                >
                  Schedule Work Order / Log Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                <span>Add Gym Equipment / Station</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEquipment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Equipment / Machine Name</label>
                <input
                  type="text"
                  placeholder="e.g. Atlantis Hack Squat 45-Degree"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GymEquipment['category'])}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Strength">Strength (Machine)</option>
                  <option value="Free Weights">Free Weights (Racks & Benches)</option>
                  <option value="Cable">Cable Tower / Crossover</option>
                  <option value="Cardio">Cardio Equipment</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Facility Zone / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Zone A — Power Platforms"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Serial / Asset Tag Number</label>
                <input
                  type="text"
                  placeholder="e.g. ATL-HS-994"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                />
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
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Work Order Modal */}
      {reportingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Log Maintenance Work Order</span>
              </h3>
              <button
                onClick={() => setReportingItem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <p className="text-xs text-zinc-400">Target Asset:</p>
              <p className="text-sm font-bold text-white mt-0.5">{reportingItem.name}</p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Issue Description & Technician Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cable fraying on high pulley. Replaced bearing and tension bolt."
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportingItem(null)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black shadow-lg shadow-amber-400/20 transition"
                >
                  Dispatch Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
