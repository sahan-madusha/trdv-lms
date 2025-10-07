import { useTheme } from "../../Hook";

export const ThemeToggle = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex items-center gap-1">
      {isDarkMode ? <span>Light</span> : <span>Dark</span>}
    </div>
  );
};
