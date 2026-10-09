import { pretty } from '../data/projects.js';

const statusClass = { Active: 'blue', Completed: 'green', 'On Hold': 'amber' };

export default function ProjectCard({ project, onView }) {
  return (
    <div className="card project-card">
      <div className="row between">
        <h3>{project.name}</h3>
        <span className={`badge ${statusClass[project.status]}`}>{project.status}</span>
      </div>
      <p className="muted">{project.description}</p>
      <div className="row between"><small>Progress</small><small>{project.progress}%</small></div>
      <div className="bar"><div style={{ width: `${project.progress}%` }} /></div>
      <div className="row between">
        <div className="avatars">{project.team.map((t) => <span key={t} className="avatar sm">{t}</span>)}</div>
        <small className="muted">Due {pretty(project.due)}</small>
      </div>
      <button className="btn outline" onClick={() => onView(project)}>View Project</button>
    </div>
  );
}
