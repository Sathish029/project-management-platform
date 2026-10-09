import { useState } from 'react';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import TaskCard from '../components/TaskCard.jsx';
import { tasks as initial, } from '../data/tasks.js';
import { inDays } from '../data/projects.js';
import { projects } from '../data/projects.js';
import { team } from '../data/team.js';

export default function Tasks() {
  const [list, setList] = useState(initial);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', project: projects[0].name, assignee: team[0].name, priority: 'Medium' });

  const visible = list.filter(
    (t) => t.title.toLowerCase().includes(q.toLowerCase()) && (status === 'All' || t.status === status)
  );

  const changeStatus = (id, s) => setList(list.map((t) => (t.id === id ? { ...t, status: s } : t)));

  const addTask = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setList([{ id: Date.now(), ...form, title: form.title.trim(), status: 'To Do', due: inDays(7) }, ...list]);
    setForm({ ...form, title: '' });
    setShowForm(false);
  };

  return (
    <>
      <div className="page-head">
        <h1>Tasks</h1>
        <div className="toolbar">
          <div className="field"><FiSearch /><input placeholder="Search tasks" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <button className="btn outline" onClick={() => setShowFilter(!showFilter)}><FiFilter /> Filter</button>
          <button className="btn primary" onClick={() => setShowForm(!showForm)}><FiPlus /> Add Task</button>
        </div>
      </div>

      {showFilter && (
        <div className="chips">
          {['All', 'To Do', 'In Progress', 'Completed'].map((s) => (
            <button key={s} className={`chip ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
      )}

      {showForm && (
        <form className="card form-row" onSubmit={addTask}>
          <input placeholder="Task name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>{projects.map((p) => <option key={p.id}>{p.name}</option>)}</select>
          <select value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })}>{team.map((m) => <option key={m.id}>{m.name}</option>)}</select>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>High</option><option>Medium</option><option>Low</option></select>
          <button className="btn primary" type="submit">Save</button>
        </form>
      )}

      <div className="card table-wrap">
        {visible.length === 0 ? (
          <div className="empty">No tasks found.</div>
        ) : (
          <table>
            <thead><tr><th>Task</th><th>Project</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Due Date</th></tr></thead>
            <tbody>{visible.map((t) => <TaskCard key={t.id} task={t} onStatusChange={changeStatus} />)}</tbody>
          </table>
        )}
      </div>
    </>
  );
}
