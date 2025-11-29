import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type MatchOutcome = "win" | "loss" | "pending";

type HistoryItem = {
  id: number;
  opponent: string;
  competition: string;
  predictedScore: [number, number];
  actualScore?: [number, number];
  outcome: MatchOutcome;
};

const historyData: HistoryItem[] = [
  {
    id: 1,
    opponent: "Manchester City",
    competition: "UCL Semi",
    predictedScore: [2, 1],
    actualScore: [2, 1],
    outcome: "win",
  },
  {
    id: 2,
    opponent: "Atletico Madrid",
    competition: "La Liga",
    predictedScore: [1, 0],
    actualScore: [1, 2],
    outcome: "loss",
  },
  {
    id: 3,
    opponent: "Sevilla",
    competition: "La Liga",
    predictedScore: [3, 1],
    actualScore: [3, 1],
    outcome: "win",
  },
  {
    id: 4,
    opponent: "Real Betis",
    competition: "Copa del Rey",
    predictedScore: [2, 2],
    actualScore: undefined,
    outcome: "pending",
  },
];

const PredictionHistorySection = () => {
  const sortedHistory = useMemo(
    () => historyData.slice().sort((a, b) => b.id - a.id),
    []
  );

  const getOutcomeIcon = (outcome: MatchOutcome) => {
    switch (outcome) {
      case "win":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "loss":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  const getCardStyles = (outcome: MatchOutcome) => {
    switch (outcome) {
      case "win":
        return "border-green-300/40 dark:border-green-700/30 bg-gradient-to-br from-green-100/40 to-emerald-100/30 dark:from-green-950/30 dark:to-emerald-950/20";
      case "loss":
        return "border-red-300/40 dark:border-red-700/30 bg-gradient-to-br from-red-100/40 to-rose-100/30 dark:from-red-950/30 dark:to-rose-950/20";
      case "pending":
        return "border-amber-300/40 dark:border-amber-700/30 bg-gradient-to-br from-amber-100/40 to-yellow-100/30 dark:from-amber-950/30 dark:to-yellow-950/20";
    }
  };

  return (
    <section className="px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Match History
        </h2>
        <span className="text-lg">📊</span>
      </div>

      <div className="space-y-2">
        {sortedHistory.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border px-4 py-3 transition-all hover:shadow-lg backdrop-blur-sm",
              getCardStyles(item.outcome)
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getOutcomeIcon(item.outcome)}
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      vs {item.opponent}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.competition}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Pred
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.predictedScore[0]}-{item.predictedScore[1]}
                  </p>
                </div>
                <div className="text-gray-400 dark:text-gray-600">|</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Final
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.actualScore ? `${item.actualScore[0]}-${item.actualScore[1]}` : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PredictionHistorySection;
