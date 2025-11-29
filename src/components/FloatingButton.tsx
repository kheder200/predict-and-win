import { useState, useRef } from "react";
import floatingButtonIcon from "../assets/floating_botton.png";

interface ChanceEvent {
  id: number;
  isGoal: boolean;
  stage: "intro" | "countdown" | "animation" | "result";
  countdown?: number;
  result?: "goal" | "miss";
}

const FloatingButton = () => {
  const [chances, setChances] = useState<ChanceEvent[]>([]);
  const [nextId, setNextId] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isActive) return;

    setIsActive(true);
    const randomNumber = Math.floor(Math.random() * 100);
    const isGoal = randomNumber % 2 === 0;
    const id = nextId;
    setNextId((prev) => prev + 1);

    const newChance: ChanceEvent = { id, isGoal, stage: "intro" };
    setChances((prev) => [...prev, newChance]);

    setTimeout(() => {
      setChances((prev) =>
        prev.map((c) => (c.id === id ? { ...c, stage: "countdown", countdown: 3 } : c))
      );

      const countdownSequence = [3, 2, 1, 0];
      let sequenceIndex = 1;

      const countdownInterval = setInterval(() => {
        if (sequenceIndex < countdownSequence.length) {
          setChances((prev) =>
            prev.map((c) =>
              c.id === id ? { ...c, countdown: countdownSequence[sequenceIndex] } : c
            )
          );
          sequenceIndex++;
        } else {
          clearInterval(countdownInterval);
          setTimeout(() => {
            setChances((prev) =>
              prev.map((c) =>
                c.id === id ? { ...c, stage: "animation" } : c
              )
            );

            setTimeout(() => {
              setChances((prev) =>
                prev.map((c) =>
                  c.id === id
                    ? { ...c, stage: "result", result: isGoal ? "goal" : "miss" }
                    : c
                )
              );

              setTimeout(() => {
                setChances((prev) => prev.filter((c) => c.id !== id));
                setIsActive(false);
              }, 2500);
            }, 2500);
          }, 500);
        }
      }, 1000);
    }, 2500);
  };

  return (
    <>
      {/* Overlay and Sequence */}
      {chances.map((chance) => (
        <div key={chance.id}>
          {/* Blur Overlay - Show throughout entire sequence */}
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-500" />

          {/* Intro Message - Let's test your chance today */}
          {chance.stage === "intro" && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="text-center animate-in fade-in duration-500">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  Let's test your chance today! 
                </p>
              </div>
            </div>
          )}

          {/* Countdown 3 2 1 0 */}
          {chance.stage === "countdown" && chance.countdown !== undefined && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="text-center" style={{ animation: "countdown-pop 0.6s ease-out" }}>
                <p className="text-[200px] leading-none font-black text-blue-600 dark:text-blue-400 drop-shadow-xl">
                  {chance.countdown}
                </p>
              </div>
            </div>
          )}

          {/* Goal and Ball Animation */}
          {(chance.stage === "animation" || chance.stage === "result") && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {/* Goal Icon at top center */}
              <div className="fixed top-[10vh] left-1/2 -translate-x-1/2 text-6xl md:text-7xl animate-pulse">
                🥅
              </div>

              {/* Animated Ball */}
              {chance.isGoal ? (
                <div
                  className="fixed text-4xl"
                  style={{
                    animation: "ball-to-goal 2.5s ease-in forwards",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  ⚽
                </div>
              ) : (
                <div
                  className="fixed text-4xl"
                  style={{
                    animation: "ball-near-miss 2.5s ease-in forwards",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  ⚽
                </div>
              )}
            </div>
          )}

          {/* Result Message */}
          {chance.stage === "result" && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="text-center animate-in fade-in duration-500">
                {chance.result === "goal" ? (
                  <p className="text-6xl font-bold text-green-500 dark:text-green-400 drop-shadow-lg">
                    GOOOAAL! 🎉
                  </p>
                ) : (
                  <p className="text-5xl font-bold text-red-500 dark:text-red-400 drop-shadow-lg">
                    Sorry, try again! 😅
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes ball-to-goal {
          0% {
            left: calc(100vw - 32px);
            bottom: 32px;
            opacity: 1;
          }
          30% {
            left: 50%;
            bottom: 40%;
            opacity: 1;
          }
          70% {
            left: 50%;
            bottom: 65%;
            opacity: 1;
          }
          100% {
            left: 50%;
            bottom: calc(100vh - 96px);
            opacity: 0;
          }
        }

        @keyframes ball-near-miss {
          0% {
            left: calc(100vw - 32px);
            bottom: 32px;
            opacity: 1;
          }
          25% {
            left: 50%;
            bottom: 35%;
            opacity: 1;
          }
          60% {
            left: 45%;
            bottom: 60%;
            opacity: 1;
          }
          80% {
            left: 25%;
            bottom: 55%;
            opacity: 1;
          }
          100% {
            left: 10%;
            bottom: 70%;
            opacity: 0;
          }
        }

        @keyframes countdown-pop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Floating Button - Icon Only */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isActive}
        className={`fixed bottom-8 right-8 z-40 w-16 h-16 transform transition-all duration-300 ease-out flex items-center justify-center ${
          isActive ? "opacity-50 cursor-not-allowed" : "hover:scale-110 active:scale-95"
        }`}
        aria-label="Test your chance"
      >
        <img src={floatingButtonIcon} alt="Test your chance" className="w-full h-full object-contain" />
      </button>
    </>
  );
};

export default FloatingButton;
