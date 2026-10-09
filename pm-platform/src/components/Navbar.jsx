import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiLayers } from 'react-icons/fi';
import SearchBar from './SearchBar.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import ProfileMenu from './ProfileMenu.jsx';

export default function Navbar({ theme, setTheme, onMenu, profile, unread, onLogout }) {
  return (
    <header className="navbar">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Toggle menu"><FiMenu /></button>
      <Link to="/dashboard" className="brand">
        <span className="logo"><FiLayers /></span>
        <span className="brand-name">Project Management Platform</span>
      </Link>
      <SearchBar />
      <div className="nav-right">
        <Link to="/notifications" className="icon-btn" aria-label="Notifications">
          <FiBell />
          {unread > 0 && <span className="dot">{unread}</span>}
        </Link>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <ProfileMenu profile={profile} onLogout={onLogout} />
      </div>
    </header>
  );
}
