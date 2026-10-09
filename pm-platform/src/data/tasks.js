import { inDays } from './projects.js';

export const tasks = [
  { id: 1, title: 'Design homepage layout', project: 'Website Redesign', assignee: 'Priya', priority: 'High', status: 'In Progress', due: inDays(2) },
  { id: 2, title: 'Build login API', project: 'Mobile Application', assignee: 'Arun', priority: 'High', status: 'To Do', due: inDays(4) },
  { id: 3, title: 'Create dashboard charts', project: 'CRM Dashboard', assignee: 'Satish', priority: 'Medium', status: 'In Progress', due: inDays(6) },
  { id: 4, title: 'Write campaign brief', project: 'Marketing Platform', assignee: 'Rahul', priority: 'Low', status: 'To Do', due: inDays(9) },
  { id: 5, title: 'Fix responsive navbar', project: 'Portfolio Website', assignee: 'Satish', priority: 'Medium', status: 'Completed', due: inDays(-1) },
  { id: 6, title: 'Set up CI pipeline', project: 'Mobile Application', assignee: 'Arun', priority: 'Low', status: 'Completed', due: inDays(-3) },
  { id: 7, title: 'User testing session', project: 'Website Redesign', assignee: 'Priya', priority: 'Medium', status: 'To Do', due: inDays(14) },
  { id: 8, title: 'Sprint planning', project: 'CRM Dashboard', assignee: 'Rahul', priority: 'High', status: 'In Progress', due: inDays(1) },
];
