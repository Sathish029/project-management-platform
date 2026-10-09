import { team } from '../data/team.js';

export default function Team() {
  return (
    <>
      <div className="page-head"><h1>Team</h1></div>
      <div className="grid cards4">
        {team.map((m) => (
          <div key={m.id} className="card member">
            <span className="avatar lg">{m.initials}</span>
            <h3>{m.name}</h3>
            <p className="muted">{m.role}</p>
            <small>{m.email}</small>
            <span className={`badge ${m.active ? 'green' : 'gray'}`}>{m.active ? 'Active' : 'Away'}</span>
            <p><strong>{m.tasks}</strong> <span className="muted">assigned tasks</span></p>
          </div>
        ))}
      </div>
    </>
  );
}
