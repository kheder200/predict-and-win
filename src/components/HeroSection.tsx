import { useEffect, useState } from "react";
import AnimatedCollectibleCards from "./AnimatedCollectibleCards";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrases = [
      { text: "Score & Predict" },
      { text: "Collect & Win" },
      { text: "Win & Celebrate" },
      { text: "Kheder & Ranem" },
      { text: "Predict & Win" },
      { text: "Powered by MatchSense AI" },
    ];

    const currentPhrase = phrases[phraseIndex].text;
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else if (!isDeleting) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  const handleGetStarted = () => {
    const predictionSection = document.getElementById("prediction-section");
    if (predictionSection) {
      predictionSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative w-full px-4 md:px-6 flex flex-col items-center justify-start overflow-hidden py-4 md:py-12" style={{ minHeight: "100vh" }}>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.25);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4);
          }
        }
        @keyframes rotate-continuous {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floating-arrow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes arrow-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(241, 12, 245, 0.4), 0 0 40px rgba(241, 12, 245, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(241, 12, 245, 0.7), 0 0 60px rgba(241, 12, 245, 0.3);
          }
        }
        .btn-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .ball-rotate {
          animation: rotate-continuous 2s linear infinite;
          display: inline-block;
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .floating-arrow {
          animation: floating-arrow 2s ease-in-out infinite, arrow-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-indigo-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/20 pointer-events-none" />

      {/* Top Section - Greeting and Typewriter */}
      <div className="relative z-10 text-center space-y-2 md:space-y-4 pt-4 md:pt-8 fade-in-up">
        {/* Greeting */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-xl md:text-4xl ball-rotate drop-shadow-lg">⚽</span>
          <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Hi There!
          </h1>
          <span className="text-xl md:text-4xl ball-rotate drop-shadow-lg">⚽</span>
        </div>

        {/* Typewriter Text */}
        <div className="typewriter-text flex justify-center px-4">
          <h2 className="text-lg md:text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300 min-h-[1.5rem] md:min-h-[2.5rem] flex items-center justify-center">
            {displayText}
            <span className="animate-pulse ml-1">|</span>
          </h2>
        </div>
      </div>

      {/* Middle Section - Animated Collectible Cards */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center mt-6 md:mt-8 md:flex-grow fade-in-up" style={{ animationDelay: '0.2s', height: "auto" }}>
        <AnimatedCollectibleCards />
      </div>

      {/* Bottom Section - Get Started Button */}
      <div className="relative z-10 mt-16 md:mt-auto mb-6 md:mb-12 fade-in-up" style={{ animationDelay: '0.4s', paddingTop: "1.5rem" }}>
        <button
          onClick={handleGetStarted}
          className="relative px-8 py-3 md:px-10 md:py-4 font-semibold text-white rounded-full shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Start
            <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
