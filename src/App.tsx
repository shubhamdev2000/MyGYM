import React from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { RestTimerWidget } from './components/workout/RestTimerWidget';

// Member Views
import { MemberDashboard } from './components/member/MemberDashboard';
import { LiveWorkoutLogger } from './components/member/LiveWorkoutLogger';
import { ExerciseLibrary } from './components/member/ExerciseLibrary';
import { AICoachSplitBuilder } from './components/member/AICoachSplitBuilder';
import { BarbellCalculator } from './components/member/BarbellCalculator';
import { MemberAnalytics } from './components/member/MemberAnalytics';
import { NutritionTracker } from './components/member/NutritionTracker';
import { ClassesLeaderboard } from './components/member/ClassesLeaderboard';

// Admin Views
import { AdminOverview } from './components/admin/AdminOverview';
import { MemberManagement } from './components/admin/MemberManagement';
import { TrainerClassManager } from './components/admin/TrainerClassManager';
import { EquipmentTracker } from './components/admin/EquipmentTracker';
import { AnnouncementsPublisher } from './components/admin/AnnouncementsPublisher';

const AppContent: React.FC = () => {
  const { role, memberTab, adminTab, wallpaper } = useGym();

  const renderActiveView = () => {
    if (role === 'member') {
      switch (memberTab) {
        case 'dashboard':
          return <MemberDashboard />;
        case 'workout':
          return <LiveWorkoutLogger />;
        case 'exercises':
          return <ExerciseLibrary />;
        case 'ai-coach':
          return <AICoachSplitBuilder />;
        case 'calculator':
          return <BarbellCalculator />;
        case 'analytics':
          return <MemberAnalytics />;
        case 'nutrition':
          return <NutritionTracker />;
        case 'classes':
          return <ClassesLeaderboard />;
        default:
          return <MemberDashboard />;
      }
    } else {
      switch (adminTab) {
        case 'overview':
          return <AdminOverview />;
        case 'members':
          return <MemberManagement />;
        case 'trainers-classes':
          return <TrainerClassManager />;
        case 'equipment':
          return <EquipmentTracker />;
        case 'announcements':
          return <AnnouncementsPublisher />;
        default:
          return <AdminOverview />;
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden">
      {/* Dynamic Custom Wallpaper Background Layer */}
      {wallpaper.url && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${wallpaper.url})`,
            opacity: wallpaper.opacity,
            filter: `blur(${wallpaper.blur}px)`
          }}
        />
      )}

      {/* Top Navigation */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Workspace */}
      <div className="relative z-10 flex-1 flex max-w-full">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Persistent Floating Rest Timer Widget */}
      <RestTimerWidget />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <GymProvider>
      <AppContent />
    </GymProvider>
  );
}
