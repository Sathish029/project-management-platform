import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects as initial, inDays } from '../data/projects.js';

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const [list, setList] = useState(initial);
  const [status, setStatus] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const q = params.get('q') || '';

  const visible = list.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) && (status === 'All' || p.status === status)
  );

  const addProject = () => {
    const name = window.prompt('New project name:');
    if (!name || !name.trim()) return;
    setList([{ id: Date.now(), name: name.trim(), description: 'New project created from the dashboard.', progress: 0, status: 'Active', due: inDays(30), team: ['SA'] }, ...list]);
  };

  return (
    <>
      <div className="page-head">
        <h1>Projects</h1>
        <div className="toolbar">
          <div className="field"><FiSearch /><input placeholder="Search projects" value={q} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})} /></div>
          <button className="btn outline" onClick={() => setShowFilter(!showFilter)}><FiFilter /> Filter</button>
          <button className="btn primary" onClick={addProject}><FiPlus /> New Project</button>
        </div>
      </div>

      {showFilter && (
        <div className="chips">
          {['All', 'Active', 'On Hold', 'Completed'].map((s) => (
            <button key={s} className={`chip ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty card">No projects found. Try a different search or filter.</div>
      ) : (
        <div className="grid cards3">
          {visible.map((p) => <ProjectCard key={p.id} project={p} onView={(pr) => alert(`${pr.name}\n\n${pr.description}\nProgress: ${pr.progress}%`)} />)}
        </div>
      )}
    </>
  );
}
