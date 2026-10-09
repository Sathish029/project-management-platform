import { pretty } from '../data/projects.js';

const priorityClass = { High: 'red', Medium: 'amber', Low: 'green' };
const statusClass = { 'To Do': 'gray', 'In Progress': 'blue', Completed: 'green' };

// One table row for a task. Pass onStatusChange to make the status editable.
export default function TaskCard({ task, onStatusChange }) {
  return (
    <tr>
      <td><strong>{task.title}</strong></td>
      <td>{task.project}</td>
      <td>{task.assignee}</td>
      <td><span className={`badge ${priorityClass[task.priority]}`}>{task.priority}</span></td>
      <td>
        {onStatusChange ? (
          <select className={`badge-select ${statusClass[task.status]}`} value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}>
            <option>To Do</option><option>In Progress</option><option>Completed</option>
          </select>
        ) : (
          <span className={`badge ${statusClass[task.status]}`}>{task.status}</span>
        )}
      </td>
      <td>{pretty(task.due)}</td>
    </tr>
  );
}
