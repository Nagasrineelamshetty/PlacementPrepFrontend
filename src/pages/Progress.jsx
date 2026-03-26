import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import userService from '../services/userService';
import ProgressChart from '../components/ProgressChart';
import { getStatusLabel, formatDate } from '../utils/helpers';

const Progress = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const load = async () => {
      try {
        const [s, p, b] = await Promise.all([
          userService.getStats(user.id),
          userService.getProgress(user.id),
          userService.getBookmarks(user.id),
        ]);
        setStats(s);
        setProgressList(p.filter(x => x.status !== 'NOT_ATTEMPTED'));
        setBookmarks(b);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  if (loading) return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <div className="loading-spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <h1 className="page-title" style={{ marginBottom: 6 }}>My Progress</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Track your preparation journey
      </p>

      {/* Top Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card green">
          <div className="stat-value" style={{ color: 'var(--easy)' }}>{stats?.totalSolved || 0}</div>
          <div className="stat-label">Total Solved</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>{progressList.filter(p => p.status === 'IN_PROGRESS').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{progressList.filter(p => p.status === 'NEEDS_REVIEW').length}</div>
          <div className="stat-label">Needs Review</div>
        </div>
        <div className="stat-card rose">
          <div className="stat-value" style={{ color: 'var(--accent-rose)' }}>{bookmarks.length}</div>
          <div className="stat-label">Bookmarked</div>
        </div>
      </div>

      {/* Charts */}
      <ProgressChart stats={stats} />

      {/* Tabs */}
      <div style={{ marginTop: 28 }}>
        <div className="tabs">
          {[
            { id: 'overview', label: 'All Activity' },
            { id: 'solved', label: `Solved (${stats?.totalSolved || 0})` },
            { id: 'bookmarks', label: `Bookmarks (${bookmarks.length})` },
          ].map(t => (
            <div key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
            </div>
          ))}
        </div>

        {activeTab === 'overview' && (
          <ProgressTable data={progressList} />
        )}
        {activeTab === 'solved' && (
          <ProgressTable data={progressList.filter(p => p.status === 'SOLVED')} />
        )}
        {activeTab === 'bookmarks' && (
          <ProgressTable data={bookmarks} />
        )}
      </div>
    </div>
  );
};

const ProgressTable = ({ data }) => {
  if (!data.length) return (
    <div className="empty-state">
      <p style={{ color: 'var(--text-muted)' }}>No records yet. Start solving problems!</p>
    </div>
  );

  const statusColors = {
    SOLVED: 'primary', IN_PROGRESS: 'amber', NEEDS_REVIEW: 'rose', NOT_ATTEMPTED: 'muted',
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Problem</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Status</th>
            <th>Attempts</th>
            <th>Last Attempted</th>
          </tr>
        </thead>
        <tbody>
          {data.map(p => (
            <tr key={p.id}>
              <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.problem?.title}</td>
              <td>
                {p.problem?.difficulty && (
                  <span className={`badge badge-${p.problem.difficulty.toLowerCase()}`}>
                    {p.problem.difficulty}
                  </span>
                )}
              </td>
              <td>{p.problem?.category}</td>
              <td>
                <span className={`badge badge-${statusColors[p.status] || 'blue'}`}>
                  {getStatusLabel(p.status)}
                </span>
              </td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{p.attempts}</td>
              <td style={{ fontSize: 13 }}>{formatDate(p.lastAttemptedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
