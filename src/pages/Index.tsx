import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MatchPredictionCard from "@/components/MatchPredictionCard";
import PredictionHistorySection from "@/components/PredictionHistorySection";
import RecentCollections from "@/components/RecentCollections";
import LeaderboardSection from "@/components/LeaderboardSection";
import FloatingButton from "@/components/FloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="max-w-md mx-auto pb-8">
        <HeroSection />
        
        <div id="prediction-section" className="px-4 mb-6">
          <MatchPredictionCard />
        </div>


        <RecentCollections />

        <LeaderboardSection />
        <PredictionHistorySection />
      </main>

      {/* Floating Button */}
      <FloatingButton />

      {/* Decorative Elements - Football themed */}
      <div className="fixed bottom-1/4 left-4 text-4xl opacity-25">⚽</div>
     {/* <div className="fixed bottom-32 left-4 text-3xl opacity-25">🥅</div>*/}

      <div className="fixed bottom-1/4 right-4 text-3xl opacity-25">🏆</div>

      <footer className="max-w-md mx-auto px-4 py-12">
        <div className="rounded-3xl border border-gradient-to-r from-blue-300/30 to-indigo-300/30 dark:border-blue-800/30 dark:to-indigo-800/30 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-cyan-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-cyan-950/20 p-6 backdrop-blur-md text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Predict &amp; Win
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent dark:via-blue-700/30"></div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Designed & built by
            </p>
            <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            X and Y 
            </p>
            <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Sarah 
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent dark:via-blue-700/30"></div>

          <div className="flex items-center justify-center gap-1 text-xs text-gray-700 dark:text-gray-300 flex-wrap">
            <span>🛠️</span>
            <span className="font-medium">WIP</span>
            <span>•</span>
            <span>🎯</span>
            <span>Mock data</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

