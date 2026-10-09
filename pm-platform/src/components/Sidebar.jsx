import { NavLink } from 'react-router-dom';
import { FiGrid, FiFolder, FiCheckSquare, FiUsers, FiCalendar, FiBarChart2, FiBell, FiSettings } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/projects', label: 'Projects', icon: <FiFolder /> },
  { to: '/tasks', label: 'Tasks', icon: <FiCheckSquare /> },
  { to: '/team', label: 'Team', icon: <FiUsers /> },
  { to: '/calendar', label: 'Calendar', icon: <FiCalendar /> },
  { to: '/reports', label: 'Reports', icon: <FiBarChart2 /> },
  { to: '/notifications', label: 'Notifications', icon: <FiBell /> },
  { to: '/settings', label: 'Settings', icon: <FiSettings /> },
];

export default function Sidebar({ open, theme, setTheme, unread }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <nav>
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
            {item.label === 'Notifications' && unread > 0 && <em className="pill">{unread}</em>}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle theme={theme} setTheme={setTheme} split />
    </aside>
  );
}
