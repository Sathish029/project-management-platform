import { FiMoon, FiSun } from 'react-icons/fi';

// Default: one toggle button (navbar). split: two buttons (sidebar).
export default function ThemeToggle({ theme, setTheme, split = false }) {
  if (split) {
    return (
      <div className="theme-split">
        <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><FiMoon /> Dark</button>
        <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><FiSun /> Light</button>
      </div>
    );
  }
  return (
    <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}
