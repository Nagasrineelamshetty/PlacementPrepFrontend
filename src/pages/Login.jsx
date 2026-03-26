import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.usernameOrEmail, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgDecor1}></div>
      <div style={styles.bgDecor2}></div>

      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logo}>PP</div>
          <span style={styles.logoText}>PlacementPrep</span>
        </div>

        <div style={styles.headingArea}>
          <h1 style={styles.heading}>Welcome back</h1>
          <p style={styles.subheading}>Sign in to continue your prep journey</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label">Username or Email</label>
            <input
              className="form-input"
              type="text"
              placeholder="john_doe or john@example.com"
              value={form.usernameOrEmail}
              onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <button className="btn btn-primary" style={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? <span className="loading-spinner" style={{ width: 16, height: 16 }}></span> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Don't have an account?</span>
          <Link to="/register" style={styles.link}>Create account →</Link>
        </div>

        <div style={styles.demoNote}>
          <span style={styles.demoIcon}>💡</span>
          <span>Demo: register a new account to get started</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', padding: 20,
  },
  bgDecor1: {
    position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600,
    background: 'radial-gradient(circle, rgba(110,231,183,0.06) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500,
    background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none',
  },
  card: {
    background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
    borderRadius: 20, padding: '40px', width: '100%', maxWidth: 440,
    position: 'relative', zIndex: 1,
    boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
    animation: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
  },
  logo: {
    width: 36, height: 36, background: 'var(--accent-primary)',
    color: 'var(--text-inverse)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-display)',
  },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 },
  headingArea: { marginBottom: 28 },
  heading: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 6 },
  subheading: { color: 'var(--text-secondary)', fontSize: 14 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  errorBox: {
    background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)',
    color: 'var(--accent-rose)', borderRadius: 8, padding: '10px 14px', fontSize: 13,
  },
  submitBtn: { width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 15, marginTop: 4 },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 },
  link: { color: 'var(--accent-primary)', fontSize: 13, fontWeight: 600 },
  demoNote: {
    display: 'flex', alignItems: 'center', gap: 8, marginTop: 16,
    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
    borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--text-muted)',
  },
  demoIcon: { fontSize: 14 },
};

export default Login;
