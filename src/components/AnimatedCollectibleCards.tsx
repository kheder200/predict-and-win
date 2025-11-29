import { useMemo, useState, useEffect } from "react";
import playerCard1 from "../assets/player-card-1.png";
import playerCard2 from "../assets/player-card-2.png";
import playerCard3 from "../assets/player-card-3.png";
import playerCard4 from "../assets/player-card-4.png";
import playerCard5 from "../assets/player-card-5.png";

interface AlbumSlot {
  id: number;
  row: number;
  col: number;
  hasCard: boolean;
  cardImage?: string;
  delay: number;
}

const AnimatedCollectibleCards = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Book opens after 2 seconds, stays open for 12 seconds, then closes for 5 seconds (much slower)
  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 2000);

    const interval = setInterval(() => {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 5000);
    }, 19000);

    return () => {
      clearTimeout(openTimer);
      clearInterval(interval);
    };
  }, []);

  // Create album slots - 6 on left page, 6 on right page
  const leftPageSlots: AlbumSlot[] = useMemo(
    () => [
      { id: 1, row: 0, col: 0, hasCard: true, cardImage: playerCard1, delay: 0 },
      { id: 2, row: 1, col: 0, hasCard: false, delay: 0 },
      { id: 3, row: 2, col: 0, hasCard: true, cardImage: playerCard2, delay: 1.5 },
      { id: 4, row: 3, col: 0, hasCard: false, delay: 0 },
      { id: 5, row: 4, col: 0, hasCard: true, cardImage: playerCard3, delay: 3 },
      { id: 6, row: 5, col: 0, hasCard: false, delay: 0 },
    ],
    []
  );

  const rightPageSlots: AlbumSlot[] = useMemo(
    () => [
      { id: 7, row: 0, col: 0, hasCard: true, cardImage: playerCard4, delay: 4.5 },
      { id: 8, row: 1, col: 0, hasCard: false, delay: 0 },
      { id: 9, row: 2, col: 0, hasCard: true, cardImage: playerCard5, delay: 6 },
      { id: 10, row: 3, col: 0, hasCard: false, delay: 0 },
      { id: 11, row: 4, col: 0, hasCard: false, delay: 0 },
      { id: 12, row: 5, col: 0, hasCard: false, delay: 0 },
    ],
    []
  );

  const getCardAnimationStyle = (delay: number): React.CSSProperties => {
    return {
      animation: `cardFlyInOut 6s ease-in-out ${delay}s infinite`,
      animationFillMode: "both",
    };
  };

  return (
    <>
      <style>{`
        @keyframes cardFlyInOut {
          0% {
            opacity: 0;
            transform: translateY(-300px) translateX(200px) rotateZ(45deg) scale(0.2);
          }
          15% {
            opacity: 1;
          }
          25% {
            transform: translateY(0px) translateX(0px) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          75% {
            transform: translateY(0px) translateX(0px) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(300px) translateX(-200px) rotateZ(-45deg) scale(0.2);
          }
        }

        @keyframes emptySlotPulse {
          0%, 100% {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            border-color: rgba(59, 130, 246, 0.6);
            box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
      `}</style>

      <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ perspective: "2500px" }}>
        {/* 3D Book Container */}
        <div
          className="relative flex scale-[0.35] md:scale-[0.65]"
          style={{
            transformStyle: "preserve-3d",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          {/* Left Page (Content) - Static */}
          <div
            className="relative w-44 md:w-56 h-72 md:h-84 transition-all duration-[3000ms]"
            style={{
              transformStyle: "preserve-3d",
              borderRadius: isOpen ? '1.5rem 0 0 1.5rem' : '1.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              className="relative bg-gradient-to-br from-blue-50/95 to-indigo-50/95 dark:from-blue-950/90 dark:to-indigo-950/90 shadow-2xl backdrop-blur-sm p-3 md:p-4 h-full"
              style={{
                border: '2px solid rgba(191, 219, 254, 0.4)',
              }}
            >
              {/* Left Page Title */}
              <div className="text-center mb-2">
                <h3 className="text-xs md:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  1
                </h3>
              </div>

              {/* Left Page Card Grid - 2 columns x 3 rows */}
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 items-center justify-items-center h-full pb-4">
                {leftPageSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="relative w-10 h-14 md:w-12 md:h-16 rounded-xl overflow-hidden"
                  >
                    {slot.hasCard ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl border-2 border-blue-300/60 dark:border-blue-600/60" />
                        <div
                          style={getCardAnimationStyle(slot.delay)}
                          className="absolute inset-0 rounded-xl shadow-lg shadow-blue-400/30 dark:shadow-blue-500/20"
                        >
                          <img
                            src={slot.cardImage}
                            alt={`Player card ${slot.id}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-xl border-2 border-dashed bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50 flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                        style={{ animation: "emptySlotPulse 2s ease-in-out infinite" }}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 3s ease-in-out infinite",
                          }}
                        />
                        <div className="text-lg md:text-xl text-blue-400/60 dark:text-blue-500/60 font-bold">?</div>
                        <div className="text-[7px] font-semibold text-blue-400/70 dark:text-blue-500/70 text-center px-1">Empty</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page (Content + Cover) - This page flips to close the book */}
          <div
            className="relative w-44 md:w-56 h-72 md:h-84 origin-left transition-all duration-[3000ms] ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(0deg)" : "rotateY(-180deg)",
              zIndex: isOpen ? 1 : 3,
            }}
          >
            {/* Front of right page - shows content when open */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50/95 to-indigo-50/95 dark:from-blue-950/90 dark:to-indigo-950/90 shadow-2xl backdrop-blur-sm border-2 border-blue-200/40 dark:border-blue-700/40 p-3 md:p-4" style={{ backfaceVisibility: "hidden", borderRadius: "0 1.5rem 1.5rem 0" }}>
              {/* Right Page Title */}
              <div className="text-center mb-2">
                <h3 className="text-xs md:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  2
                </h3>
              </div>

              {/* Right Page Card Grid - 2 columns x 3 rows */}
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 items-center justify-items-center h-full pb-12">
                {rightPageSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="relative w-10 h-14 md:w-12 md:h-16 rounded-xl overflow-hidden"
                  >
                    {slot.hasCard ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl border-2 border-blue-300/60 dark:border-blue-600/60" />
                        <div
                          style={getCardAnimationStyle(slot.delay)}
                          className="absolute inset-0 rounded-xl shadow-lg shadow-blue-400/30 dark:shadow-blue-500/20"
                        >
                          <img
                            src={slot.cardImage}
                            alt={`Player card ${slot.id}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-xl border-2 border-dashed bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50 flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                        style={{ animation: "emptySlotPulse 2s ease-in-out infinite" }}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 3s ease-in-out infinite",
                          }}
                        />
                        <div className="text-lg md:text-xl text-blue-400/60 dark:text-blue-500/60 font-bold">?</div>
                        <div className="text-[7px] font-semibold text-blue-400/70 dark:text-blue-500/70 text-center px-1">Empty</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Collection Progress */}
              <div className="mt-2 text-center">
                <div className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400">
                  5/12 Collected
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>

            {/* Back of right page - shows cover design when closed */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl p-3 md:p-4 overflow-hidden" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", borderRadius: "1.5rem" }}>
              {/* Cover Design */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Decorative corner patterns */}
                <div className="absolute top-2 left-2 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-yellow-400/60 rounded-tl-2xl" />
                <div className="absolute top-2 right-2 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-yellow-400/60 rounded-tr-2xl" />
                <div className="absolute bottom-2 left-2 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-yellow-400/60 rounded-bl-2xl" />
                <div className="absolute bottom-2 right-2 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-yellow-400/60 rounded-br-2xl" />

                {/* Sparkle effects */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-yellow-300 text-lg md:text-xl" style={{ animation: "sparkle 3s ease-in-out infinite" }}>✨</div>
                <div className="absolute bottom-10 left-6 md:bottom-12 md:left-8 text-yellow-300 text-lg md:text-xl" style={{ animation: "sparkle 3s ease-in-out 1s infinite" }}>✨</div>
                <div className="absolute top-1/3 right-4 md:right-6 text-yellow-300 text-sm" style={{ animation: "sparkle 3s ease-in-out 2s infinite" }}>⭐</div>

                {/* Soccer ball icon */}
                <div className="text-5xl md:text-6xl mb-2 md:mb-3 drop-shadow-lg">⚽</div>

                {/* Title */}
                <div className="text-center space-y-1">
                  <h2 className="text-lg md:text-xl font-black text-white drop-shadow-lg tracking-wider">
                    PLAYER
                  </h2>
                  <h2 className="text-xl md:text-2xl font-black text-yellow-300 drop-shadow-lg tracking-wider">
                    ALBUM
                  </h2>
                  <div className="w-16 md:w-20 h-1 bg-yellow-400/80 mx-auto rounded-full mt-1 md:mt-2" />
                </div>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-white/90 font-semibold mt-2 md:mt-3 text-center">
                  Collect & Win
                </p>

                {/* Progress indicator */}
                <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/40"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/40"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCollectibleCards;
