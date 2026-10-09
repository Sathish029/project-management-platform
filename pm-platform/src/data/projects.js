const pad = (n) => String(n).padStart(2, '0');
export const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// Dates are relative to today so the calendar always shows events
export const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return fmt(d); };
export const pretty = (s) =>
  new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const projects = [
  { id: 1, name: 'Website Redesign', description: 'Refresh the company website with a modern look and better UX.', progress: 80, status: 'Active', due: inDays(12), team: ['SA', 'PR', 'AR'] },
  { id: 2, name: 'Mobile Application', description: 'Cross-platform app for customers to track orders and support.', progress: 65, status: 'Active', due: inDays(25), team: ['AR', 'RA'] },
  { id: 3, name: 'CRM Dashboard', description: 'Internal dashboard to manage leads, deals and customer data.', progress: 45, status: 'Active', due: inDays(40), team: ['SA', 'AR', 'RA'] },
  { id: 4, name: 'Marketing Platform', description: 'Campaign planning and analytics tool for the marketing team.', progress: 30, status: 'On Hold', due: inDays(55), team: ['PR', 'RA'] },
  { id: 5, name: 'Portfolio Website', description: 'Personal portfolio built with React to showcase projects.', progress: 90, status: 'Active', due: inDays(5), team: ['SA'] },
  { id: 6, name: 'Internal Wiki', description: 'Knowledge base for onboarding and team documentation.', progress: 100, status: 'Completed', due: inDays(-10), team: ['PR', 'RA'] },
];
