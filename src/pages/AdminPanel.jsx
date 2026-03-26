import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import problemService from '../services/problemService';
import { formatDate, getInitials } from '../utils/helpers';

const AdminPanel = () => {
  const [tab, setTab] = useState('dashboard'); 
  const [users, setUsers] = useState([]);
  const [dashStats, setDashStats] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewProblem, setShowNewProblem] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: '', description: '', difficulty: 'EASY', category: '',
    tags: '', constraints: '', sampleInput: '', sampleOutput: '',
    solutionApproach: '', timeComplexity: '', spaceComplexity: '', companyTags: '',problemLink: '',
  });
  const [editingProblem, setEditingProblem] = useState(null);
  useEffect(() => {
    const load = async () => {
      try {
        const [u, s, p] = await Promise.all([
          userService.getAllUsers(),
          userService.getDashboardStats(),
          problemService.getAll(),
        ]);
        setUsers(u);
        setDashStats(s);
        setProblems(p);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleDeactivate = async (id) => {
    if (!window.confirm('Deactivate this user?')) return;
    try {
      await userService.deactivateUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, active: false } : u));
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
  };

  const handleCreateProblem = async (e) => {
  e.preventDefault();
  try {
    let result;

    if (editingProblem) {
      result = await problemService.update(editingProblem, newProblem);
      setProblems(prev =>
        prev.map(p => (p.id === editingProblem ? result : p))
      );
    } else {
      result = await problemService.create(newProblem);
      setProblems(prev => [result, ...prev]);
    }

    setShowNewProblem(false);
    setEditingProblem(null);

    setNewProblem({
      title: '', description: '', difficulty: 'EASY', category: '',
      tags: '', constraints: '', sampleInput: '', sampleOutput: '',
      solutionApproach: '', timeComplexity: '', spaceComplexity: '',
      companyTags: '', problemLink: ''
    });

  } catch (e) {
    alert(e.response?.data?.message || 'Error');
  }
};
  const handleEdit = (problem) => {
  setEditingProblem(problem.id);
  setShowNewProblem(true);
  setNewProblem(problem);
};
  if (loading) return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <div className="loading-spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, background: 'rgba(251,113,133,0.15)', border: '1px solid rgba(251,113,133,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>Platform management</p>
        </div>
      </div>

      <div className="tabs">
        {['dashboard', 'users', 'problems'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}
            style={{ textTransform: 'capitalize' }}>
            {t}
          </div>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div>
          <div className="grid-4" style={{ marginBottom: 24 }}>
            <div className="stat-card blue">
              <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{dashStats?.totalUsers || 0}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card green">
              <div className="stat-value" style={{ color: 'var(--easy)' }}>{dashStats?.problemStats?.easy || 0}</div>
              <div className="stat-label">Easy Problems</div>
            </div>
            <div className="stat-card amber">
              <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>{dashStats?.problemStats?.medium || 0}</div>
              <div className="stat-label">Medium Problems</div>
            </div>
            <div className="stat-card rose">
              <div className="stat-value" style={{ color: 'var(--accent-rose)' }}>{dashStats?.problemStats?.hard || 0}</div>
              <div className="stat-label">Hard Problems</div>
            </div>
          </div>
          <div className="card">
            <h3 className="section-title" style={{ marginBottom: 4 }}>Welcome to Admin Panel</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Manage users, create problems, and monitor platform activity from here.
            </p>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>College</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-blue))', color: 'var(--text-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                        {getInitials(u.fullName)}
                      </div>
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.fullName}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-rose' : 'badge-blue'}`}>{u.role}</span>
                  </td>
                  <td>{u.collegeName || '—'}</td>
                  <td style={{ fontSize: 12 }}>{formatDate(u.createdAt)}</td>
                  <td>
                    <span className={`badge ${u.active ? 'badge-primary' : 'badge-rose'}`}>
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {u.active && u.role !== 'ADMIN' && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(u.id)}>
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'problems' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button className="btn btn-primary" onClick={() => setShowNewProblem(!showNewProblem)}>
              + Add Problem
            </button>
          </div>

          {showNewProblem && (
            <div className="card" style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New Problem</h3>
              <form onSubmit={handleCreateProblem} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  <div className="form-group" style={{ gridColumn: '1 / 3' }}>
                    <label className="form-label">Title *</label>
                    <input className="form-input" required value={newProblem.title} onChange={e => setNewProblem({ ...newProblem, title: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Difficulty *</label>
                    <select className="form-select" value={newProblem.difficulty} onChange={e => setNewProblem({ ...newProblem, difficulty: e.target.value })}>
                      <option>EASY</option><option>MEDIUM</option><option>HARD</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <input className="form-input" required value={newProblem.category} onChange={e => setNewProblem({ ...newProblem, category: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags (comma separated)</label>
                    <input className="form-input" value={newProblem.tags} onChange={e => setNewProblem({ ...newProblem, tags: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time Complexity</label>
                    <input className="form-input" placeholder="O(n)" value={newProblem.timeComplexity} onChange={e => setNewProblem({ ...newProblem, timeComplexity: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Space Complexity</label>
                    <input className="form-input" placeholder="O(n)" value={newProblem.spaceComplexity} onChange={e => setNewProblem({ ...newProblem, spaceComplexity: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Company Tags</label>
                    <input className="form-input" placeholder="Google,Amazon,Microsoft" value={newProblem.companyTags} onChange={e => setNewProblem({ ...newProblem, companyTags: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Problem Link (LeetCode)</label>
                    <input
                      className="form-input"
                      placeholder="https://leetcode.com/..."
                      value={newProblem.problemLink}
                      onChange={e => setNewProblem({ ...newProblem, problemLink: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea className="form-textarea" rows={4} required value={newProblem.description} onChange={e => setNewProblem({ ...newProblem, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Sample Input</label>
                    <textarea className="form-textarea" rows={3} value={newProblem.sampleInput} onChange={e => setNewProblem({ ...newProblem, sampleInput: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sample Output</label>
                    <textarea className="form-textarea" rows={3} value={newProblem.sampleOutput} onChange={e => setNewProblem({ ...newProblem, sampleOutput: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary" type="submit">{editingProblem ? "Update Problem" : "Create Problem"}</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setShowNewProblem(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Companies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>#{p.id}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.title}</td>
                    <td><span className={`badge badge-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></td>
                    <td>{p.category}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.companyTags?.split(',').slice(0, 2).join(', ')}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={async () => {
                        if (window.confirm('Delete this problem?')) {
                          try { await problemService.delete(p.id); setProblems(prev => prev.filter(x => x.id !== p.id)); }
                          catch (e) { alert('Error deleting'); }
                        }
                      }}>Delete</button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
