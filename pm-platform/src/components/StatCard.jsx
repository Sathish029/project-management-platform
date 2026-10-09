export default function StatCard({ icon, title, value, note, color }) {
  return (
    <div className="card stat">
      <span className="stat-icon" style={{ background: `${color}22`, color }}>{icon}</span>
      <div>
        <p className="muted">{title}</p>
        <h2>{value}</h2>
        <small className="muted">{note}</small>
      </div>
    </div>
  );
}
