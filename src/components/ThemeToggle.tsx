import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Bascule thème clair / sombre.
 * L'état initial est posé avant le rendu par le script inline de __root.tsx
 * (évite le flash). Ici on lit la classe réelle au montage, puis on la commute
 * et on persiste le choix dans localStorage sous "peakcl-theme".
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("peakcl-theme", next ? "dark" : "light");
    } catch {
      /* stockage indisponible : la bascule reste valable pour la session */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en thème clair" : "Passer en thème sombre"}
      title={dark ? "Thème clair" : "Thème sombre"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted ${className}`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
