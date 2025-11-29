import { Crown, Sparkles, TrendingUp } from "lucide-react";
import sarahImg from "@/assets/sarah.png";
import khederImg from "@/assets/kheder.png";

const leaderboard = [
  {
    id: 1,
    name: "Sarah",
    tagline: "Precision Queen",
    cards: 38,
    streak: "7 perfect calls",
    accuracy: 96,
    image: sarahImg,
  },
  {
    id: 2,
    name: "Kheder",
    tagline: "Comeback Pro",
    cards: 33,
    streak: "4 match streak",
    accuracy: 92,
    image: khederImg,
  },
];

const LeaderboardSection = () => {
  return (
    <section className="px-4 pb-8">
      <div className="rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-cyan-500/10 dark:from-blue-950/50 dark:via-indigo-950/30 dark:to-cyan-950/20 p-5 shadow-lg shadow-blue-500/10">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md shadow-yellow-600/40">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.35em] text-blue-600/70 dark:text-blue-200/80">
              Monthly Kings
            </p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
              Leaderboard
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {leaderboard.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-3 rounded-2xl border border-white/20 dark:border-white/5 bg-white/80 dark:bg-gray-950/40 p-4 backdrop-blur"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={player.image}
                  alt={player.name}
                  className="h-14 w-14 rounded-2xl border-2 border-white/70 dark:border-blue-500/40 object-cover shadow-md"
                />
                {index === 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-yellow-950 shadow-md">
                    1
                  </span>
                )}
                {index === 1 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-black text-white shadow-md">
                    2
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-gray-900 dark:text-white">{player.name}</p>
                  <span className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-300">
                    {player.tagline}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <div className="inline-flex items-center gap-1 font-semibold">
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                    {player.cards} cards
                  </div>
                  <div className="inline-flex items-center gap-1 font-semibold">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    {player.accuracy}% accuracy
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{player.streak}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Score more perfect predictions to climb next month&apos;s list.
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            Top collectors unlock holographic cards + album boosts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
