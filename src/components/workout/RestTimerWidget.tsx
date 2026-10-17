import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { formatTime } from '../../utils/formatters';
import { Play, Pause, SkipForward, Plus, Timer, ChevronUp, ChevronDown } from 'lucide-react';

export const RestTimerWidget: React.FC = () => {
  const {
    restTimer,
    pauseRestTimer,
    resumeRestTimer,
    skipRestTimer,
    addRestTimerSeconds,
    startRestTimer
  } = useGym();

  const [minimized, setMinimized] = useState(false);

  if (!restTimer.active) return null;

  const percent = restTimer.totalSeconds > 0
    ? Math.max(0, Math.min(100, ((restTimer.totalSeconds - restTimer.remainingSeconds) / restTimer.totalSeconds) * 100))
    : 0;

  const isUrgent = restTimer.remainingSeconds <= 5 && restTimer.remainingSeconds > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      <div
        className={`bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-4 w-80 text-zinc-100 transition-all ${
          isUrgent ? 'border-lime-400 ring-2 ring-lime-400/30 glow-lime' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`p-1.5 rounded-lg ${isUrgent ? 'bg-lime-400 text-black animate-pulse' : 'bg-zinc-800 text-lime-400'}`}>
              <Timer className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-zinc-400">Rest Timer</p>
              <p className="text-xs text-zinc-500 font-medium">Auto-synced with sets</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMinimized(!minimized)}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
              title={minimized ? 'Expand' : 'Minimize'}
            >
              {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={skipRestTimer}
              className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded hover:bg-zinc-800/80 transition"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Minimized View */}
        {minimized ? (
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-black font-mono tracking-tight ${isUrgent ? 'text-lime-400 animate-pulse' : 'text-zinc-100'}`}>
              {formatTime(restTimer.remainingSeconds)}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={restTimer.isRunning ? pauseRestTimer : resumeRestTimer}
                className="p-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-semibold transition"
              >
                {restTimer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={skipRestTimer}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Countdown Display & Progress Bar */}
            <div className="my-2">
              <div className="flex items-baseline justify-between mb-1.5">
                <span
                  className={`text-4xl font-black font-mono tracking-tight ${
                    isUrgent ? 'text-lime-400 scale-105 transition-transform' : 'text-white'
                  }`}
                >
                  {formatTime(restTimer.remainingSeconds)}
                </span>
                <span className="text-xs font-semibold text-zinc-400">
                  Target: {formatTime(restTimer.totalSeconds)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 ease-linear ${
                    isUrgent ? 'bg-lime-400' : 'bg-gradient-to-r from-emerald-500 to-lime-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5 my-3">
              {[30, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  onClick={() => startRestTimer(sec)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                    restTimer.totalSeconds === sec && restTimer.isRunning
                      ? 'bg-lime-400/20 text-lime-300 border border-lime-400/50'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>

            {/* Main Action Controls */}
            <div className="flex items-center space-x-2 pt-1 border-t border-zinc-800/80">
              <button
                onClick={() => addRestTimerSeconds(15)}
                className="flex-1 flex items-center justify-center space-x-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>15s</span>
              </button>

              <button
                onClick={restTimer.isRunning ? pauseRestTimer : resumeRestTimer}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs shadow-md transition hover:scale-[1.02]"
              >
                {restTimer.isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                onClick={skipRestTimer}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition"
                title="Skip timer"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
