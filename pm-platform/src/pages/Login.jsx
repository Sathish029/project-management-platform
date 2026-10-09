import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLayers, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(!!localStorage.getItem('rememberedEmail'));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    if (remember) localStorage.setItem('rememberedEmail', email);
    else localStorage.removeItem('rememberedEmail');
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo"><FiLayers /></div>
        <h1>Project Management Platform</h1>
        <p className="muted">Sign in to continue to your workspace</p>

        <label>Email</label>
        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <div className="password-wrap">
          <input type={show ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Show or hide password">
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="row between">
          <label className="check"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link would be sent to your email (demo).'); }}>Forgot password?</a>
        </div>

        <button className="btn primary full" type="submit">Login</button>
      </form>
    </div>
  );
}
