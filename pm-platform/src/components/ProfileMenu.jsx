import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

export default function ProfileMenu({ profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="profile" ref={ref}>
      <button className="profile-btn" onClick={() => setOpen(!open)}>
        {profile.avatar ? <img className="avatar" src={profile.avatar} alt="" /> : <span className="avatar">{profile.name.slice(0, 2).toUpperCase()}</span>}
        <span className="profile-name">{profile.name}</span>
      </button>
      {open && (
        <div className="dropdown">
          <button onClick={() => { setOpen(false); navigate('/settings'); }}><FiUser /> Profile & Settings</button>
          <button onClick={onLogout}><FiLogOut /> Logout</button>
        </div>
      )}
    </div>
  );
}
