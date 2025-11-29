import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-gray-950/70 border-b border-blue-300/50 dark:border-blue-800/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-900/20">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-base font-bold text-gray-900 dark:text-white">Predict &amp; Win</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Goal Card Album</div>
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-950/50 animate-theme-pulse"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
