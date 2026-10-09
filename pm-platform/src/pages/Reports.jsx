import { projects } from '../data/projects.js';
import { tasks } from '../data/tasks.js';
import { team } from '../data/team.js';

const monthly = [
  { m: 'Apr', v: 55 }, { m: 'May', v: 62 }, { m: 'Jun', v: 58 },
  { m: 'Jul', v: 74 }, { m: 'Aug', v: 69 }, { m: 'Sep', v: 82 },
];

export default function Reports() {
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const taskPct = Math.round((completed / tasks.length) * 100);
  const maxTasks = Math.max(...team.map((m) => m.tasks));

  return (
    <>
      <div className="page-head"><h1>Reports</h1></div>
      <div className="grid cards2">
        <section className="card section">
          <h2>Project Completion</h2>
          {projects.map((p) => (
            <div key={p.id} className="progress-row">
              <div className="row between"><span>{p.name}</span><span>{p.progress}%</span></div>
              <div className="bar"><div style={{ width: `${p.progress}%` }} /></div>
            </div>
          ))}
        </section>

        <section className="card section center">
          <h2>Task Completion</h2>
          <div className="donut" style={{ background: `conic-gradient(var(--primary) ${taskPct * 3.6}deg, var(--border) 0)` }}>
            <div><strong>{taskPct}%</strong><small className="muted">{completed}/{tasks.length} done</small></div>
          </div>
        </section>

        <section className="card section">
          <h2>Team Productivity</h2>
          {team.map((m) => (
            <div key={m.id} className="progress-row">
              <div className="row between"><span>{m.name}</span><span>{m.tasks} tasks</span></div>
              <div className="bar"><div style={{ width: `${(m.tasks / maxTasks) * 100}%` }} /></div>
            </div>
          ))}
        </section>

        <section className="card section">
          <h2>Monthly Performance</h2>
          <div className="columns">
            {monthly.map((x) => (
              <div key={x.m} className="col"><div className="col-bar" style={{ height: `${x.v}%` }}><small>{x.v}</small></div><small className="muted">{x.m}</small></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
