import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getInitials, timeAgo } from '../utils/helpers';

// Static seed data for the forum (in a real app this would be from the backend)
const SEED_POSTS = [
  {
    id: 1, title: 'How to approach Dynamic Programming problems?',
    body: 'I keep getting stuck on DP problems. Any tips for identifying when to use DP and how to come up with the recurrence relation?',
    author: 'Priya S', category: 'DSA', votes: 24, comments: 8, createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    tags: ['dynamic-programming', 'interview-tips'],
  },
  {
    id: 2, title: 'Google SWE Intern experience - Summer 2025',
    body: 'Just completed my Google internship interview. There were 3 rounds - 2 coding (LC medium-hard level) and 1 system design. Happy to share more details.',
    author: 'Aryan M', category: 'Experience', votes: 56, comments: 21, createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    tags: ['google', 'internship', 'interview'],
  },
  {
    id: 3, title: 'Best resources for System Design preparation?',
    body: 'I have placements in 6 months and want to start system design prep. Which resources should I focus on?',
    author: 'Kavya R', category: 'Resources', votes: 18, comments: 12, createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    tags: ['system-design', 'resources'],
  },
  {
    id: 4, title: 'Amazon OA pattern - spotted in 2025 drives',
    body: 'Amazon OA has been consistently asking 2 questions in 105 minutes. I noticed a pattern in the types of problems. Let me break it down...',
    author: 'Rohan T', category: 'Company', votes: 42, comments: 15, createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    tags: ['amazon', 'OA', 'preparation'],
  },
];

const CATEGORIES = ['All', 'DSA', 'Experience', 'Resources', 'Company', 'General'];
const catColors = { DSA: 'primary', Experience: 'amber', Resources: 'blue', Company: 'violet', General: 'rose' };

const DiscussionForum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(SEED_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', category: 'General', tags: '' });
  const [voted, setVoted] = useState(new Set());

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  const handleVote = (id) => {
    if (voted.has(id)) return;
    setPosts(prev => prev.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
    setVoted(prev => new Set([...prev, id]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const post = {
      id: Date.now(), ...newPost, author: user?.fullName || user?.username,
      votes: 0, comments: 0, createdAt: new Date().toISOString(),
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', body: '', category: 'General', tags: '' });
    setShowNew(false);
  };

  return (
    <div className="page-wrapper">
      <div style={styles.header}>
        <div>
          <h1 className="page-title">Discussion Forum</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            Share experiences, ask questions, help others
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(!showNew)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </button>
      </div>

      {showNew && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Create Post</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-input" placeholder="Ask a question or share an insight..."
                value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea className="form-textarea" rows={4} placeholder="Provide details..."
                value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={newPost.category}
                  onChange={e => setNewPost({ ...newPost, category: e.target.value })}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input className="form-input" placeholder="dp, arrays, google"
                  value={newPost.tags} onChange={e => setNewPost({ ...newPost, tags: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" type="submit">Post</button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-bar" style={{ marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-chip ${activeCategory === c ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(post => (
          <div key={post.id} className="card" style={styles.postCard}>
            <div style={styles.voteCol}>
              <button style={{ ...styles.voteBtn, ...(voted.has(post.id) ? styles.votedBtn : {}) }}
                onClick={() => handleVote(post.id)}>
                ▲
              </button>
              <span style={styles.voteCount}>{post.votes}</span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.postMeta}>
                <span className={`badge badge-${catColors[post.category] || 'blue'}`} style={{ fontSize: 10 }}>
                  {post.category}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{timeAgo(post.createdAt)}</span>
              </div>

              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postBody}>{post.body.slice(0, 140)}{post.body.length > 140 ? '...' : ''}</p>

              {post.tags?.length > 0 && (
                <div style={styles.postTags}>
                  {(Array.isArray(post.tags) ? post.tags : post.tags.split(',')).slice(0, 4).map(tag => (
                    <span key={tag} style={styles.postTag}>{tag.trim()}</span>
                  ))}
                </div>
              )}

              <div style={styles.postFooter}>
                <div style={styles.authorInfo}>
                  <div style={styles.authorAvatar}>{getInitials(post.author)}</div>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{post.author}</span>
                </div>
                <div style={styles.commentInfo}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span style={{ fontSize: 12 }}>{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  postCard: { display: 'flex', gap: 16 },
  voteCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 2 },
  voteBtn: {
    background: 'none', border: '1px solid var(--border-subtle)', borderRadius: 4,
    color: 'var(--text-muted)', cursor: 'pointer', width: 28, height: 26, fontSize: 10,
    transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  votedBtn: { background: 'var(--accent-primary-dim)', color: 'var(--accent-primary)', borderColor: 'rgba(110,231,183,0.3)' },
  voteCount: { fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' },
  postMeta: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  postTitle: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 },
  postBody: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 },
  postTags: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  postTag: {
    fontSize: 10, padding: '2px 8px', borderRadius: 99,
    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
    color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
  },
  postFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  authorInfo: { display: 'flex', alignItems: 'center', gap: 7 },
  authorAvatar: {
    width: 22, height: 22, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-blue))',
    color: 'var(--text-inverse)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 9, fontWeight: 700,
  },
  commentInfo: { display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' },
};

export default DiscussionForum;
