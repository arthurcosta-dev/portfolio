import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "theme";

// O script inline do index.html já aplicou a classe; aqui só lemos o resultado.
const readCurrentTheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Sem localStorage, a escolha vale só até fechar a página.
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readCurrentTheme);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    saveTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
