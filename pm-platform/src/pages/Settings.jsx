import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiMoon, FiSun, FiLogOut } from 'react-icons/fi';

export default function Settings() {
  const { theme, setTheme, onLogout, profile, setProfile } = useOutletContext();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [msg, setMsg] = useState('');
  const [pw, setPw] = useState({ current: '', next: '' });
  const [prefs, setPrefs] = useState(JSON.parse(localStorage.getItem('notifPrefs') || '{"email":true,"task":true,"project":false}'));

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 2500); };

  const saveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return flash('Name cannot be empty.');
    setProfile({ ...profile, name: name.trim(), email });
    flash('Profile saved!');
  };

  const pickPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile({ ...profile, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const togglePref = (key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    localStorage.setItem('notifPrefs', JSON.stringify(next));
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (pw.next.length < 6) return flash('New password must be at least 6 characters.');
    setPw({ current: '', next: '' });
    flash('Password updated (demo).');
  };

  return (
    <>
      <div className="page-head"><h1>Settings</h1>{msg && <span className="badge green">{msg}</span>}</div>

      <section className="card section">
        <h2>Profile</h2>
        <form className="settings-form" onSubmit={saveProfile}>
          <div className="row gap">
            {profile.avatar ? <img className="avatar lg" src={profile.avatar} alt="" /> : <span className="avatar lg">{profile.name.slice(0, 2).toUpperCase()}</span>}
            <input type="file" accept="image/*" onChange={pickPhoto} />
          </div>
          <label>Name</label><input value={name} onChange={(e) => setName(e.target.value)} />
          <label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn primary" type="submit">Save changes</button>
        </form>
      </section>

      <section className="card section">
        <h2>Appearance</h2>
        <div className="row gap">
          <button className={`btn ${theme === 'light' ? 'primary' : 'outline'}`} onClick={() => setTheme('light')}><FiSun /> Light mode</button>
          <button className={`btn ${theme === 'dark' ? 'primary' : 'outline'}`} onClick={() => setTheme('dark')}><FiMoon /> Dark mode</button>
        </div>
      </section>

      <section className="card section">
        <h2>Notifications</h2>
        {[['email', 'Email notifications'], ['task', 'Task notifications'], ['project', 'Project notifications']].map(([k, label]) => (
          <label key={k} className="switch-row">
            <span>{label}</span>
            <input type="checkbox" checked={prefs[k]} onChange={() => togglePref(k)} />
          </label>
        ))}
      </section>

      <section className="card section">
        <h2>Account</h2>
        <form className="settings-form" onSubmit={changePassword}>
          <label>Change password</label>
          <input type="password" placeholder="Current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          <input type="password" placeholder="New password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          <button className="btn outline" type="submit">Update password</button>
        </form>
        <button className="btn danger" onClick={onLogout}><FiLogOut /> Logout</button>
      </section>
    </>
  );
}
