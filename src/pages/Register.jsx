import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [form, setForm] = useState({
    username: '', email: '', password: '', fullName: '', collegeName: '', graduationYear: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register({ ...form, graduationYear: form.graduationYear ? parseInt(form.graduationYear) : null });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgDecor}></div>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logo}>PP</div>
          <span style={styles.logoText}>PlacementPrep</span>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h1 style={styles.heading}>Create your account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Start your placement preparation today</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.twoCol}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" type="text" placeholder="John Doe" value={form.fullName} onChange={set('fullName')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Username *</label>
              <input className="form-input" type="text" placeholder="john_doe" value={form.username} onChange={set('username')} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input className="form-input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} required />
          </div>

          <div style={styles.twoCol}>
            <div className="form-group">
              <label className="form-label">College</label>
              <input className="form-input" type="text" placeholder="IIT Delhi" value={form.collegeName} onChange={set('collegeName')} />
            </div>
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input className="form-input" type="number" placeholder="2025" value={form.graduationYear} onChange={set('graduationYear')} min="2020" max="2030" />
            </div>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <button className="btn btn-primary" style={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? <span className="loading-spinner" style={{ width: 16, height: 16 }}></span> : null}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Already have an account?</span>
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontSize: 13, fontWeight: 600 }}>Sign in →</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', padding: '20px',
  },
  bgDecor: {
    position: 'absolute', top: '10%', right: '5%', width: 500, height: 500,
    background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none',
  },
  card: {
    background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
    borderRadius: 20, padding: '40px', width: '100%', maxWidth: 520,
    position: 'relative', zIndex: 1, boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 },
  logo: {
    width: 36, height: 36, background: 'var(--accent-primary)',
    color: 'var(--text-inverse)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-display)',
  },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 },
  heading: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 6 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  errorBox: {
    background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)',
    color: 'var(--accent-rose)', borderRadius: 8, padding: '10px 14px', fontSize: 13,
  },
  submitBtn: { width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 15, marginTop: 4 },
};

export default Register;
