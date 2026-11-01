import useTheme from "../../hooks/useTheme";

const ICON_PATHS = {
  dark: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
};

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const nextThemeName = theme === "dark" ? "claro" : "escuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Mudar para o tema ${nextThemeName}`}
      className={`text-texto inline-flex size-11 cursor-pointer items-center justify-center rounded-full ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICON_PATHS[theme]}
      </svg>
    </button>
  );
};

export default ThemeToggle;
