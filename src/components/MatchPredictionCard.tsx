import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit3, Facebook, Lock, Twitter } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Mode = "select" | "review";

const scoreOptions = Array.from({ length: 11 }, (_, index) => index);
const rotationStep = 360 / scoreOptions.length;
const maxScore = scoreOptions[scoreOptions.length - 1];

const communitySplit = [
  { label: "Barcelona win", value: 68, tone: "bg-green-400" },
  { label: "Draw", value: 20, tone: "bg-amber-400" },
  { label: "Madrid win", value: 12, tone: "bg-blue-400" },
];

const analystLabel = "MatchSense AI";

const wheelAccents = {
  home: {
    container: "border-blue-300/40 from-blue-100/40 to-cyan-100/30 dark:border-blue-700/30 dark:from-blue-950/30 dark:to-cyan-950/30",
    titleColor: "text-blue-900 dark:text-blue-200",
    activeButton: "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-400/40 scale-110 border-transparent",
    inactiveButton: "bg-white/80 dark:bg-gray-900/70 text-gray-900 dark:text-white border-blue-200/40 dark:border-blue-700/40 hover:bg-white dark:hover:bg-gray-900/90",
    centerAccent: "from-blue-50/80 to-cyan-50/60 dark:from-blue-900/60 dark:to-cyan-900/50",
    glow: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(14,165,233,0.4), rgba(59,130,246,0.2))",
    controlClass: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  away: {
    container: "border-indigo-300/40 from-indigo-100/40 to-violet-100/30 dark:border-indigo-700/30 dark:from-indigo-950/30 dark:to-violet-950/30",
    titleColor: "text-indigo-900 dark:text-indigo-200",
    activeButton: "bg-gradient-to-r from-indigo-500 to-purple-400 text-white shadow-lg shadow-purple-400/40 scale-110 border-transparent",
    inactiveButton: "bg-white/80 dark:bg-gray-900/70 text-gray-900 dark:text-white border-indigo-200/40 dark:border-indigo-700/40 hover:bg-white dark:hover:bg-gray-900/90",
    centerAccent: "from-indigo-50/80 to-purple-50/60 dark:from-indigo-900/60 dark:to-purple-900/50",
    glow: "linear-gradient(135deg, rgba(129,140,248,0.25), rgba(192,132,252,0.4), rgba(129,140,248,0.2))",
    controlClass: "bg-gradient-to-br from-indigo-500 to-purple-500",
  },
} as const;

type WheelAccent = (typeof wheelAccents)[keyof typeof wheelAccents];

type ScoreWheelProps = {
  label: string;
  selectedScore: number | null;
  accent: WheelAccent;
  onSelect: (score: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  maxScore: number;
};

const ScoreWheel = ({
  label,
  selectedScore,
  accent,
  onSelect,
  onIncrement,
  onDecrement,
  maxScore,
}: ScoreWheelProps) => {
  const radius = 78;
  const numericScore = selectedScore ?? 0;
  const displayScore = selectedScore ?? "?";
  const rotationAngle = numericScore * rotationStep;
  const rotationStyle = {
    transform: `rotate(${rotationAngle}deg)`,
    transition: "transform 650ms cubic-bezier(0.22, 0.61, 0.36, 1)",
  };
  const canDecrease = numericScore > 0;
  const canIncrease = numericScore < maxScore;

  return (
    <div className={cn("rounded-2xl border bg-gradient-to-br p-4 backdrop-blur-sm", accent.container)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-600 dark:text-gray-400">
            Spin to set
          </p>
          <p className={cn("text-lg font-bold", accent.titleColor)}>
            {label} goals
          </p>
        </div>
        <div className="rounded-full border border-white/40 dark:border-white/20 bg-white/70 dark:bg-gray-900/60 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
          {selectedScore !== null ? `${selectedScore} locked` : "Waiting"}
        </div>
      </div>
      <div className="relative mx-auto mt-5 h-48 w-48">
        <button
          type="button"
          onClick={onDecrement}
          disabled={!canDecrease}
          aria-label={`Decrease ${label} goals`}
          className={cn(
            "absolute -left-16 top-1/2 -translate-y-1/2 rounded-full text-2xl font-black text-white w-12 h-12 shadow-lg shadow-blue-900/20 dark:shadow-black/40 border border-white/30 backdrop-blur-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 z-20",
            accent.controlClass,
            !canDecrease && "opacity-30 pointer-events-none"
          )}
        >
          −
        </button>
        <button
          type="button"
          onClick={onIncrement}
          disabled={!canIncrease}
          aria-label={`Increase ${label} goals`}
          className={cn(
            "absolute -right-16 top-1/2 -translate-y-1/2 rounded-full text-2xl font-black text-white w-12 h-12 shadow-lg shadow-blue-900/20 dark:shadow-black/40 border border-white/30 backdrop-blur-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 z-20",
            accent.controlClass,
            !canIncrease && "opacity-30 pointer-events-none"
          )}
        >
          +
        </button>
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-2 rounded-full border border-white/40 dark:border-white/10" />
          <div
            className="absolute inset-3 rounded-full opacity-70 blur-lg mix-blend-screen"
            style={{
              background: accent.glow,
              ...rotationStyle,
            }}
          />
        </div>
        <div className={cn("absolute inset-0 rounded-full border border-white/40 dark:border-white/10 bg-gradient-to-br", accent.centerAccent)} />
        <div className="absolute inset-4 rounded-full border border-white/70 dark:border-white/10 backdrop-blur-md" />
        <div className="absolute inset-10 rounded-full bg-white/80 dark:bg-gray-950/80 shadow-inner flex flex-col items-center justify-center z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            now
          </span>
          <span className="text-4xl font-black text-gray-900 dark:text-white">
            {displayScore}
          </span>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">goals</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative h-full w-full" style={rotationStyle}>
            {scoreOptions.map((score, index) => {
              const angle = (index / scoreOptions.length) * Math.PI * 2;
              const x = Math.sin(angle) * radius;
              const y = -Math.cos(angle) * radius;
              const isSelected = selectedScore === score;
              return (
                <button
                  type="button"
                  key={score}
                  aria-pressed={isSelected}
                  aria-label={`${label} ${score} goals`}
                  onClick={() => onSelect(score)}
                  className={cn(
                    "absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 dark:focus-visible:ring-blue-500/70",
                    isSelected ? accent.activeButton : accent.inactiveButton
                  )}
                  style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)` }}
                >
                  {score}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchPredictionCard = () => {
  const [mode, setMode] = useState<Mode>("select");
  const [prediction, setPrediction] = useState<{ home: number | null; away: number | null }>({
    home: null,
    away: null,
  });
  const [lockedPrediction, setLockedPrediction] = useState<{ home: number; away: number } | null>(null);

  const canSubmit = prediction.home !== null && prediction.away !== null;

  const accuracyCopy = useMemo(() => {
    if (!lockedPrediction) {
      return `Select your scoreline to lock in ${analystLabel}'s call.`;
    }
    if (lockedPrediction.home > lockedPrediction.away) {
      return `${analystLabel} expects Barcelona to edge the match with confident attacking play.`;
    }
    if (lockedPrediction.home === lockedPrediction.away) {
      return `Balanced battle ahead — ${analystLabel} sees a tight scoreline.`;
    }
    return `${analystLabel} is backing Madrid to surprise with a clinical finish.`;
  }, [lockedPrediction]);

  const handleScoreSelect = (team: "home" | "away", score: number) => {
    setPrediction((prev) => ({
      ...prev,
      [team]: score,
    }));
  };

  const handleWheelNudge = (team: "home" | "away", delta: 1 | -1) => {
    setPrediction((prev) => {
      const current = prev[team] ?? 0;
      const next = Math.min(maxScore, Math.max(0, current + delta));
      if (next === current) {
        return prev;
      }
      return {
        ...prev,
        [team]: next,
      };
    });
  };

  const handleSubmit = () => {
    if (!canSubmit || prediction.home === null || prediction.away === null) {
      toast.error("Pick both scores to lock your prediction.");
      return;
    }
    const nextPrediction = { home: prediction.home, away: prediction.away };
    setLockedPrediction(nextPrediction);
    setMode("review");
    toast.success(`Prediction locked: ${nextPrediction.home} - ${nextPrediction.away}`);
  };

  const handleEdit = () => {
    setMode("select");
    toast("Update your scoreline before kickoff.");
  };

  const handleClear = () => {
    setPrediction({ home: null, away: null });
    setLockedPrediction(null);
    setMode("select");
  };

  return (
    <div className="rounded-3xl border border-gradient-to-r from-blue-400/30 to-indigo-400/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-500/10 p-6 shadow-lg shadow-blue-500/15 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-cyan-950/20 dark:shadow-blue-500/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">Today&apos;s Match</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Lock your scoreline before kickoff.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-blue-400/40 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-950/40 dark:to-indigo-950/40 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm backdrop-blur">
          <Clock className="h-4 w-4" />
          <span>3h 24m</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 items-center gap-4 rounded-2xl border border-gradient-to-r from-blue-300/30 to-indigo-300/30 bg-gradient-to-b from-white/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-950/30 p-4 backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-2xl shadow-lg shadow-blue-400/40">
            ⚽
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Barcelona</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Badge className="border-0 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[11px] uppercase tracking-wide font-semibold shadow-md shadow-indigo-400/30">
            La Liga
          </Badge>
          <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">VS</span>
          <p className="text-[11px] uppercase font-semibold text-gray-600 dark:text-gray-400">Camp Nou</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 text-2xl shadow-lg shadow-cyan-400/40">
            ⚽
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Real Madrid</p>
        </div>
      </div>

      {mode === "select" ? (
        <>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-3">
                Spin the score wheels
              </p>
              <div className="space-y-6">
                <ScoreWheel
                  label="Barcelona"
                  selectedScore={prediction.home}
                  accent={wheelAccents.home}
                  maxScore={maxScore}
                  onSelect={(score) => handleScoreSelect("home", score)}
                  onIncrement={() => handleWheelNudge("home", 1)}
                  onDecrement={() => handleWheelNudge("home", -1)}
                />
                <ScoreWheel
                  label="Madrid"
                  selectedScore={prediction.away}
                  accent={wheelAccents.away}
                  maxScore={maxScore}
                  onSelect={(score) => handleScoreSelect("away", score)}
                  onIncrement={() => handleWheelNudge("away", 1)}
                  onDecrement={() => handleWheelNudge("away", -1)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-300/40 bg-gradient-to-br from-indigo-100/40 to-blue-100/40 dark:border-indigo-700/30 dark:from-indigo-950/30 dark:to-blue-950/30 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest font-bold text-indigo-900 dark:text-indigo-200 mb-3">
                Community picks
              </p>
              <div className="space-y-3">
                {communitySplit.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span>{item.label}</span>
                      <span className="text-gray-900 dark:text-white">{item.value}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200/60 dark:bg-gray-700/40 overflow-hidden">
                      <div
                        className={cn("h-2 rounded-full transition-all shadow-md", item.tone)}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 py-5 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all disabled:opacity-40 disabled:hover:shadow-none"
          >
            Predict Now
          </Button>
        </>
      ) : (
        lockedPrediction && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-green-300/40 bg-gradient-to-r from-green-100/40 to-emerald-100/40 dark:border-green-700/30 dark:from-green-950/30 dark:to-emerald-950/30 p-4">
              <div>
                <p className="text-sm font-bold text-green-900 dark:text-green-200">
                  Prediction locked in
                </p>
                <p className="text-xs text-green-800/70 dark:text-green-300/70 mt-1">
                  You can update it until kickoff.
                </p>
              </div>
              <Badge className="gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-400/30">
                <Lock className="h-3.5 w-3.5" />
                Saved
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-200/50 to-cyan-200/40 dark:border-blue-700/30 dark:from-blue-950/40 dark:to-cyan-950/40 p-4 text-center shadow-lg shadow-blue-300/20">
                <p className="text-xs uppercase font-bold text-blue-900 dark:text-blue-200">
                  Barcelona
                </p>
                <p className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400 mt-2">
                  {lockedPrediction.home}
                </p>
              </div>
              <div className="rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-200/50 to-purple-200/40 dark:border-indigo-700/30 dark:from-indigo-950/40 dark:to-purple-950/40 p-4 text-center shadow-lg shadow-indigo-300/20">
                <p className="text-xs uppercase font-bold text-indigo-900 dark:text-indigo-200">
                  Madrid
                </p>
                <p className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 mt-2">
                  {lockedPrediction.away}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-300/40 bg-gradient-to-br from-indigo-100/40 to-blue-100/40 dark:border-indigo-700/30 dark:from-indigo-950/30 dark:to-blue-950/30 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                MatchSense insight
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                {accuracyCopy}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-indigo-300/40 bg-white/60 dark:bg-gray-900/40 px-2 py-3 text-center">
                  <p className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">82%</p>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">Overall</p>
                </div>
                <div className="rounded-xl border border-blue-300/40 bg-white/60 dark:bg-gray-900/40 px-2 py-3 text-center">
                  <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">68%</p>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">Home wins</p>
                </div>
                <div className="rounded-xl border border-cyan-300/40 bg-white/60 dark:bg-gray-900/40 px-2 py-3 text-center">
                  <p className="font-bold text-lg bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">14%</p>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">Late swings</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                onClick={handleEdit}
                className="w-full gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold shadow-lg shadow-blue-400/30 transition-all"
              >
                <Edit3 className="h-4 w-4" />
                Edit prediction
              </Button>
              <Button
                onClick={handleClear}
                className="w-full rounded-2xl border border-gray-300/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100 font-semibold hover:bg-white/70 dark:hover:bg-gray-800/60"
              >
                Clear selection
              </Button>
            </div>
          </div>
        )
      )}

      <div className="mt-6 rounded-2xl border border-blue-300/40 dark:border-blue-800/30 bg-white/70 dark:bg-gray-950/40 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shadow-inner shadow-blue-500/5">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Share your prediction</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Flex it on socials while everyone else is still guessing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share prediction on Facebook"
            className="h-11 w-11 rounded-full bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2]/25"
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share prediction on Twitter"
            className="h-11 w-11 rounded-full bg-sky-500/15 text-sky-500 hover:bg-sky-500/25"
          >
            <Twitter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchPredictionCard;
