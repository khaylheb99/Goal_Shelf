import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { PrizeCardsSection } from './components/home/PrizeCardsSection';
import { FeaturedGoalsSection } from './components/home/FeaturedGoalsSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { StreetFootballSection } from './components/home/StreetFootballSection';
import { SubmitGoalPage } from './components/submission/SubmitGoalPage';
import { ExploreGoalsPage } from './components/explore/ExploreGoalsPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { WeeklyPrizesPage } from './components/prizes/WeeklyPrizesPage';
import { NigeriaMapPage } from './components/map/NigeriaMapPage';
import { PlayerProfilePage } from './components/profile/PlayerProfilePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RulesAndTrustPages } from './components/rules/RulesAndTrustPages';
import { GoalDetailModal } from './components/explore/GoalDetailModal';

const AppContent: React.FC = () => {
  const { activePage, selectedGoal, setSelectedGoal } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#050807] text-white selection:bg-[#39FF14] selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <PrizeCardsSection />
            <FeaturedGoalsSection />
            <HowItWorksSection />
            <StreetFootballSection />
          </>
        )}

        {activePage === 'submit' && <SubmitGoalPage />}
        {activePage === 'explore' && <ExploreGoalsPage />}
        {activePage === 'leaderboard' && <LeaderboardPage />}
        {activePage === 'weekly-prizes' && <WeeklyPrizesPage />}
        {activePage === 'nigeria-map' && <NigeriaMapPage />}
        {activePage === 'profile' && <PlayerProfilePage />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'rules' && <RulesAndTrustPages />}
      </main>

      {/* Global Goal Modal */}
      <GoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
