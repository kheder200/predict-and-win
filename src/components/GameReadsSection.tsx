import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import articleThumb1 from "@/assets/article-thumb-1.png";
import articleThumb2 from "@/assets/article-thumb-2.png";

const GameReadsSection = () => {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const articles: Array<{
    id: number;
    headline: string;
    preview: string;
    fullText: string;
    thumbnail: string;
    icon: LucideIcon;
    iconColor: string;
    accentColor: string;
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
    darkGradientFrom: string;
    darkGradientTo: string;
  }> = [
    {
      id: 1,
      headline: "Why Barcelona will Dominate!",
      preview: "MatchSense AI breaks down the defensive strategies for tonight's big game...",
      fullText: "MatchSense AI breaks down the defensive strategies for tonight's big game. Barcelona's formation allows them to control the midfield with precision passing and quick transitions.",
      thumbnail: articleThumb1,
      icon: Flame,
      iconColor: "text-orange-400",
      accentColor: "bg-orange-500/20",
      borderColor: "border-orange-300/50 dark:border-orange-700/30",
      gradientFrom: "from-orange-100/50",
      gradientTo: "to-red-100/40",
      darkGradientFrom: "dark:from-orange-950/30",
      darkGradientTo: "dark:to-red-950/20",
    },
    {
      id: 2,
      headline: "Midfield Battle: The Key to Victory",
      preview: "Discover the tactical moves that could decide the match outcome...",
      fullText: "Discover the tactical moves that could decide the match outcome. The midfield battle will be crucial in determining who takes control of the game. Both teams have exceptional playmakers who can dictate the tempo and create scoring opportunities.",
      thumbnail: articleThumb2,
      icon: Target,
      iconColor: "text-sky-400",
      accentColor: "bg-sky-500/20",
      borderColor: "border-sky-300/50 dark:border-sky-700/30",
      gradientFrom: "from-sky-100/50",
      gradientTo: "to-blue-100/40",
      darkGradientFrom: "dark:from-sky-950/30",
      darkGradientTo: "dark:to-blue-950/20",
    },
  ];

  const toggleArticle = (id: number) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          MatchSense AI Reads
        </h2>
        <span className="text-lg">📺</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => {
          const Icon = article.icon;
          const isExpanded = expandedArticle === article.id;
          return (
            <div
              key={article.id}
              className={`rounded-2xl border ${article.borderColor} bg-gradient-to-br ${article.gradientFrom} ${article.gradientTo} ${article.darkGradientFrom} ${article.darkGradientTo} p-4 transition-all hover:shadow-lg hover:shadow-orange-200/20 dark:hover:shadow-orange-500/10 cursor-pointer overflow-hidden backdrop-blur-sm`}
              onClick={() => toggleArticle(article.id)}
            >
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl w-24 h-24 shadow-lg">
                    <img
                      src={article.thumbnail}
                      alt={article.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${article.accentColor} flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${article.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300">
                      MatchSense insight
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm leading-tight">
                    {article.headline}
                  </h3>
                  <p className={`text-xs text-gray-700 dark:text-gray-300 leading-relaxed transition-all overflow-hidden ${isExpanded ? "block" : "line-clamp-2"}`}>
                    {isExpanded ? article.fullText : article.preview}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:gap-2 transition-all">
                    {isExpanded ? "Show less" : "Read more"}
                    {isExpanded ? " ←" : " →"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameReadsSection;
