import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { projects, fmt } from '../data/projects.js';
import { tasks } from '../data/tasks.js';

const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const now = new Date();
  const [cur, setCur] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const y = cur.getFullYear();
  const m = cur.getMonth();

  // Build a map: date -> list of events
  const events = {};
  projects.forEach((p) => (events[p.due] = [...(events[p.due] || []), { text: p.name, type: 'project' }]));
  tasks.forEach((t) => (events[t.due] = [...(events[t.due] || []), { text: t.title, type: 'task' }]));

  const blanks = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(blanks).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <>
      <div className="page-head">
        <h1>Calendar</h1>
        <div className="toolbar">
          <button className="icon-btn" onClick={() => setCur(new Date(y, m - 1, 1))}><FiChevronLeft /></button>
          <strong className="month">{cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong>
          <button className="icon-btn" onClick={() => setCur(new Date(y, m + 1, 1))}><FiChevronRight /></button>
        </div>
      </div>
      <div className="legend"><span className="badge blue">Project deadline</span><span className="badge amber">Task deadline</span></div>
      <div className="card cal">
        {names.map((n) => <div key={n} className="cal-head">{n}</div>)}
        {cells.map((d, i) => {
          const key = d ? fmt(new Date(y, m, d)) : '';
          const isToday = d && key === fmt(now);
          return (
            <div key={i} className={`cal-cell ${d ? '' : 'blank'} ${isToday ? 'today' : ''}`}>
              {d && <span className="cal-num">{d}</span>}
              {d && (events[key] || []).map((e, j) => <span key={j} className={`event ${e.type}`} title={e.text}>{e.text}</span>)}
            </div>
          );
        })}
      </div>
    </>
  );
}
