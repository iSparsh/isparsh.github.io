import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-foreground/80" />
      <Switch checked={theme === "light"} onCheckedChange={toggleTheme} />
      <Moon className="h-4 w-4 text-foreground/80" />
    </div>
  );
}

export default ThemeToggle;
