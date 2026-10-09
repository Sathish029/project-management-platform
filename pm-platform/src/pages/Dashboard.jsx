import { useEffect, useState } from 'react';
import { FiFolder, FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatCard from '../components/StatCard.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { projects, pretty } from '../data/projects.js';
import { tasks } from '../data/tasks.js';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  if (loading) return <div className="loader"><div className="spinner" /></div>;

  const active = projects.filter((p) => p.status === 'Active').length;
  const done = projects.filter((p) => p.status === 'Completed').length;
  const pending = tasks.filter((t) => t.status !== 'Completed').length;

  return (
    <>
      <h1>Good Morning, Satish 👋</h1>
      <p className="muted subtitle">Here's what's happening with your projects today.</p>

      <div className="grid cards4">
        <StatCard icon={<FiFolder />} title="Total Projects" value={projects.length} note="+2 this month" color="#4f46e5" />
        <StatCard icon={<FiActivity />} title="Active Projects" value={active} note="On track" color="#0ea5e9" />
        <StatCard icon={<FiCheckCircle />} title="Completed Projects" value={done} note="+12% vs last month" color="#16a34a" />
        <StatCard icon={<FiClock />} title="Pending Tasks" value={pending} note="3 due this week" color="#d97706" />
      </div>

      <section className="card section">
        <h2>Project Progress</h2>
        {projects.slice(0, 5).map((p) => (
          <div key={p.id} className="progress-row">
            <div className="row between"><strong>{p.name}</strong><span>{p.progress}%</span></div>
            <div className="bar"><div style={{ width: `${p.progress}%` }} /></div>
            <div className="row between">
              <div className="avatars">{p.team.map((t) => <span key={t} className="avatar sm">{t}</span>)}</div>
              <small className="muted">Due {pretty(p.due)}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="card section">
        <h2>Recent Tasks</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Task</th><th>Project</th><th>Assigned</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead>
            <tbody>{tasks.slice(0, 5).map((t) => <TaskCard key={t.id} task={t} />)}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
