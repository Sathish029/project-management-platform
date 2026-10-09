import { FiCheckCircle, FiClock, FiUserPlus, FiRefreshCw, FiClipboard } from 'react-icons/fi';

const icons = { task: <FiClipboard />, deadline: <FiClock />, done: <FiCheckCircle />, member: <FiUserPlus />, status: <FiRefreshCw /> };

export default function NotificationCard({ n, onToggle }) {
  return (
    <div className={`card notif ${n.read ? '' : 'unread'}`} onClick={() => onToggle(n.id)}>
      <span className="stat-icon">{icons[n.type]}</span>
      <div className="grow">
        <p>{n.message}</p>
        <small className="muted">{n.time}</small>
      </div>
      <span className={`badge ${n.read ? 'gray' : 'blue'}`}>{n.read ? 'Read' : 'Unread'}</span>
    </div>
  );
}
