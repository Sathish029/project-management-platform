import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import { initialNotifications } from '../data/notifications.js';

export default function Layout({ theme, setTheme, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile') || 'null') || { name: 'Satish', email: 'satish@example.com', avatar: '' }
  );
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => localStorage.setItem('profile', JSON.stringify(profile)), [profile]);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="app">
      <Navbar theme={theme} setTheme={setTheme} onMenu={() => setMenuOpen(!menuOpen)} profile={profile} unread={unread} onLogout={onLogout} />
      <Sidebar open={menuOpen} theme={theme} setTheme={setTheme} unread={unread} />
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <main className="content">
        <Outlet context={{ theme, setTheme, onLogout, profile, setProfile, notifications, setNotifications }} />
      </main>
    </div>
  );
}
