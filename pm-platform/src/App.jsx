import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';
import Tasks from './pages/Tasks.jsx';
import Team from './pages/Team.jsx';
import Calendar from './pages/Calendar.jsx';
import Reports from './pages/Reports.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  // One theme state for the whole app (navbar + sidebar both use it)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const login = () => { localStorage.setItem('isLoggedIn', 'true'); setLoggedIn(true); };
  const logout = () => { localStorage.removeItem('isLoggedIn'); setLoggedIn(false); };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />} />
      {/* Protected routes: Navbar + Sidebar live in Layout, pages render in <Outlet /> */}
      <Route element={loggedIn ? <Layout theme={theme} setTheme={setTheme} onLogout={logout} /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
