import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Trophy, Star, Lock, ArrowRight } from "lucide-react";
import PlayerCard from "./PlayerCard";
import { cn } from "@/lib/utils";
import playerCard1 from "@/assets/player-card-1.png";
import playerCard2 from "@/assets/player-card-2.png";
import playerCard3 from "@/assets/player-card-3.png";
import playerCard4 from "@/assets/player-card-4.png";
import playerCard5 from "@/assets/player-card-5.png";

const RecentCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [albumPage, setAlbumPage] = useState(0);

  const albumSlots = Array.from({ length: 12 }, (_, index) => ({
    slot: index + 1,
    owned: index < 5,
    card: index < 5 ? [
      { name: "Rosa Strike", number: 1, rarity: "legendary" as const, image: playerCard1 },
      { name: "Azure Ace", number: 7, rarity: "rare" as const, image: playerCard2 },
      { name: "Violet Power", number: 5, rarity: "rare" as const, image: playerCard3 },
      { name: "Golden Star", number: 2, rarity: "legendary" as const, image: playerCard4 },
      { name: "Green Thunder", number: 9, rarity: "rare" as const, image: playerCard5 },
    ][index] : null
  }));

  const ownedCards = albumSlots.filter(slot => slot.owned).map(slot => slot.card!);
  const missingCards = albumSlots.filter(slot => !slot.owned);
  const slotsPerPage = 6;
  const totalPages = Math.ceil(albumSlots.length / slotsPerPage);
  const paginatedSlots = albumSlots.slice(albumPage * slotsPerPage, albumPage * slotsPerPage + slotsPerPage);

  const goToPrevPage = () => setAlbumPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () => setAlbumPage((prev) => Math.min(totalPages - 1, prev + 1));

  const albumStats = useMemo(
    () => [
      { label: "Album completion", value: "5 / 12", note: "42% complete" },
      { label: "Legendary owned", value: "2 / 4", note: "50% legendary rate" },
      { label: "Collection value", value: "2,450", note: "+180 this week" },
    ],
    []
  );

  return (
    <section className="px-4 py-8 space-y-8">
      {/* Album Header with Stats */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Predict &amp; Win Album
          </h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {ownedCards.length}/12
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {albumStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-blue-200/50 bg-blue-50/50 dark:border-blue-800/30 dark:bg-blue-950/30 p-3"
            >
              <p className="text-xs font-semibold text-blue-600/70 dark:text-blue-400/70 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-1 text-base font-bold text-blue-900 dark:text-blue-100">
                {stat.value}
              </p>
              <p className="text-[11px] text-blue-700/60 dark:text-blue-300/60">
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Album Grid - Visual Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
              Your Progress
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Page {albumPage + 1} of {totalPages} — {slotsPerPage} slots each.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={albumPage === 0}
              className="rounded-full border border-blue-200/50 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-40 dark:border-blue-800/40 dark:bg-gray-900/60 dark:text-blue-200"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goToNextPage}
              disabled={albumPage === totalPages - 1}
              className="rounded-full border border-blue-200/50 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-40 dark:border-blue-800/40 dark:bg-gray-900/60 dark:text-blue-200"
            >
              Next
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900/50 dark:to-blue-950/30 p-4 border border-blue-200/30 dark:border-blue-800/20 shadow-inner shadow-blue-500/5">
          <div className="grid grid-cols-3 gap-4">
            {paginatedSlots.map((slot) => (
              <div
                key={slot.slot}
                className={`relative overflow-hidden rounded-xl transition-all ${
                  slot.owned && slot.card
                    ? "ring-2 ring-blue-400 dark:ring-blue-500 shadow-lg"
                    : ""
                }`}
              >
                {slot.owned && slot.card ? (
                  <div className="aspect-[3/4]">
                    <PlayerCard
                      playerName={slot.card.name}
                      rarity={slot.card.rarity}
                      imageUrl={slot.card.image}
                      emoji={slot.card.emoji}
                      className="h-full w-full border-0 bg-transparent shadow-none"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/40 dark:to-gray-800/40 relative overflow-hidden border border-gray-300/40 dark:border-gray-700/40">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(0,0,0,0.06)_1px,rgba(0,0,0,0.06)_2px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(255,255,255,0.06)_1px,rgba(255,255,255,0.06)_2px)]"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-center text-gray-600/70 dark:text-gray-400/70 font-bold space-y-1">
                        <div className="text-[8px] font-semibold tracking-wider">SLOT</div>
                        <div className="text-base font-bold">{slot.slot.toString().padStart(2, '0')}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAlbumPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={cn(
                  "h-2.5 w-6 rounded-full transition",
                  idx === albumPage
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-blue-200/70 dark:bg-blue-800/50 hover:bg-blue-300/80"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Cards - Scrollable */}
      {ownedCards.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
            Currently Owned ({ownedCards.length})
          </h3>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2">
                {ownedCards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[calc(33.333%-8px)]">
                    <PlayerCard
                      playerName={card.name}
                      rarity={card.rarity}
                      imageUrl={card.image}
                      emoji={card.emoji}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            {ownedCards.length > 3 && (
              <>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-900 pointer-events-none"></div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowRight className="h-5 w-5 text-blue-400 dark:text-blue-500 animate-scroll-hint" />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Missing Cards Section */}
      {missingCards.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
            Still Needed ({missingCards.length})
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {missingCards.slice(0, showAll ? missingCards.length : 8).map((slot) => (
              <div
                key={`missing-${slot.slot}`}
                className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/40 dark:to-gray-800/40 flex items-center justify-center relative overflow-hidden border border-gray-300/30 dark:border-gray-700/30"
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(255,255,255,0.08)_1px,rgba(255,255,255,0.08)_2px)]"></div>
                <div className="relative text-center text-[10px] text-gray-500/50 dark:text-gray-400/50 font-semibold">
                  <div>SLOT</div>
                  <div>{slot.slot.toString().padStart(2, '0')}</div>
                </div>
              </div>
            ))}
          </div>

          {missingCards.length > 8 && (
            <Button
              onClick={() => setShowAll(!showAll)}
              className="w-full rounded-lg bg-blue-500/80 hover:bg-blue-600 dark:bg-blue-600/80 dark:hover:bg-blue-700 text-white text-sm py-2"
            >
              {showAll ? "Show less" : `View all ${missingCards.length} missing`}
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default RecentCollections;
