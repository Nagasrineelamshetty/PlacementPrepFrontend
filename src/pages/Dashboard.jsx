import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import userService from '../services/userService';
import problemService from '../services/problemService';
import { getInitials } from '../utils/helpers';

const StatCard = ({ value, label, color, icon }) => (
  <div className={`stat-card ${color}`}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <div className="stat-value" style={{ color: `var(--${color === 'green' ? 'easy' : color === 'blue' ? 'accent-blue' : color === 'amber' ? 'accent-amber' : 'accent-rose'})` }}>{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div style={{ fontSize: 20, opacity: 0.6 }}>{icon}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [problemStats, setProblemStats] = useState(null);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userStats, pStats, problems] = await Promise.all([
          userService.getStats(user.id),
          problemService.getStats(),
          problemService.getAll(),
        ]);
        setStats(userStats);
        setProblemStats(pStats);
        setRecentProblems(problems.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchData();
  }, [user]);

  if (loading) return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <div className="loading-spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    </div>
  );

  const totalProblems = (problemStats?.easy || 0) + (problemStats?.medium || 0) + (problemStats?.hard || 0);
  const totalSolved = stats?.totalSolved || 0;
  const solvedPct = totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0;

  return (
    <div className="page-wrapper">
      {/* Welcome */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.avatar}>{getInitials(user?.fullName)}</div>
          <div>
            <h1 style={styles.welcome}>Good {getGreeting()}, {user?.fullName?.split(' ')[0]} 👋</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
              {user?.collegeName && `${user.collegeName} · `}
              {user?.graduationYear && `Class of ${user.graduationYear}`}
            </p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/problems')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
          </svg>
          Solve Problems
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard value={totalSolved} label="Problems Solved" color="green" icon="✓" />
        <StatCard value={stats?.solvedByDifficulty?.EASY || 0} label="Easy Solved" color="green" icon="○" />
        <StatCard value={stats?.solvedByDifficulty?.MEDIUM || 0} label="Medium Solved" color="amber" icon="◑" />
        <StatCard value={stats?.solvedByDifficulty?.HARD || 0} label="Hard Solved" color="rose" icon="●" />
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        {/* Overall Progress */}
        <div className="card">
          <div style={styles.cardHeader}>
            <h3 className="section-title">Overall Progress</h3>
            <span style={{ fontSize: 13, color: 'var(--accent-primary)', fontWeight: 600 }}>{solvedPct}%</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${solvedPct}%` }}></div>
            </div>
            <div style={styles.progressMeta}>
              <span>{totalSolved} solved</span>
              <span>{totalProblems} total</span>
            </div>
          </div>
          <div style={styles.diffRow}>
            {[
              { label: 'Easy', count: problemStats?.easy || 0, solved: stats?.solvedByDifficulty?.EASY || 0, color: 'var(--easy)' },
              { label: 'Medium', count: problemStats?.medium || 0, solved: stats?.solvedByDifficulty?.MEDIUM || 0, color: 'var(--medium)' },
              { label: 'Hard', count: problemStats?.hard || 0, solved: stats?.solvedByDifficulty?.HARD || 0, color: 'var(--hard)' },
            ].map(d => (
              <div key={d.label} style={styles.diffItem}>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: d.color }}>{d.solved}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/{d.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: 16 }}>Quick Actions</h3>
          <div style={styles.quickActions}>
            {[
              { label: 'Random Easy', path: '/problems', color: 'var(--easy)', icon: '○', sub: 'Warm up' },
              { label: 'Mock Test', path: '/mock-tests', color: 'var(--accent-blue)', icon: '◷', sub: 'Timed challenge' },
              { label: 'Company Prep', path: '/company-prep', color: 'var(--accent-violet)', icon: '🏢', sub: 'Target a company' },
              { label: 'Review Bookmarks', path: '/progress', color: 'var(--accent-amber)', icon: '🔖', sub: 'Your saved problems' },
            ].map(a => (
              <button key={a.label} style={styles.quickBtn} onClick={() => navigate(a.path)}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Problems */}
      <div className="card" style={{ marginTop: 24 }}>
        <div style={styles.cardHeader}>
          <h3 className="section-title">Recent Problems</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/problems')}>View all →</button>
        </div>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Category</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {recentProblems.map((p, i) => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/problems')}>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.title}</td>
                <td><span className={`badge badge-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></td>
                <td>{p.category}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  {p.tags?.split(',').slice(0, 2).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

const styles = {
  hero: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 28, gap: 16,
  },
  heroLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  avatar: {
    width: 48, height: 48, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-blue))',
    color: 'var(--text-inverse)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 16, fontWeight: 800, flexShrink: 0,
  },
  welcome: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  progressMeta: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 12, color: 'var(--text-muted)', marginTop: 8,
    fontFamily: 'var(--font-mono)',
  },
  diffRow: { display: 'flex', gap: 20, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' },
  diffItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  quickActions: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  quickBtn: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
    borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
  },
};

export default Dashboard;
