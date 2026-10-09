import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  // Searching jumps to the Projects page filtered by the text
  const submit = (e) => {
    e.preventDefault();
    navigate(`/projects?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form className="search" onSubmit={submit}>
      <FiSearch />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, tasks, people..." />
    </form>
  );
}
