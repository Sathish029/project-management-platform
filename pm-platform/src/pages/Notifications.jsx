import { useOutletContext } from 'react-router-dom';
import NotificationCard from '../components/NotificationCard.jsx';

export default function Notifications() {
  const { notifications, setNotifications } = useOutletContext();

  const toggle = (id) => setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  const markAll = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));

  return (
    <>
      <div className="page-head">
        <h1>Notifications</h1>
        <button className="btn outline" onClick={markAll}>Mark all as read</button>
      </div>
      {notifications.length === 0 ? <div className="empty card">You're all caught up!</div> : (
        <div className="stack">{notifications.map((n) => <NotificationCard key={n.id} n={n} onToggle={toggle} />)}</div>
      )}
    </>
  );
}
