import React, { useEffect, useState, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import problemService from '../services/problemService';
import userService from '../services/userService';
import ProblemCard from '../components/ProblemCard';

const DIFFICULTIES = ['ALL', 'EASY', 'MEDIUM', 'HARD'];

const Problems = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('ALL');
  const [category, setCategory] = useState('ALL');

  useEffect(() => {
    const load = async () => {
      try {
        const [probs, cats, progList] = await Promise.all([
          problemService.getAll(),
          problemService.getCategories(),
          userService.getProgress(user.id),
        ]);
        setProblems(probs);
        setFiltered(probs);
        setCategories(cats);
        const map = {};
        progList.forEach(p => { map[p.problem?.id] = p; });
        setProgressMap(map);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const applyFilters = useCallback(() => {
    let list = [...problems];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    if (difficulty !== 'ALL') list = list.filter(p => p.difficulty === difficulty);
    if (category !== 'ALL') list = list.filter(p => p.category === category);
    setFiltered(list);
  }, [problems, search, difficulty, category]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const handleBookmark = async (problemId) => {
    try {
      const updated = await userService.toggleBookmark(user.id, problemId);
      setProgressMap(prev => ({ ...prev, [problemId]: updated }));
    } catch (e) { console.error(e); }
  };

// 🔥 REPLACE THIS FUNCTION
const handleSolve = (problem) => {
  if (problem.problemLink) {
    window.open(problem.problemLink, "_blank");
  } else {
    alert("No problem link available");
  }
};

// 🔥 ADD THIS NEW FUNCTION
const handleMarkSolved = async (problem) => {
  try {
    const updated = await userService.updateProgress(
      user.id,
      problem.id,
      'SOLVED'
    );
    setProgressMap(prev => ({ ...prev, [problem.id]: updated }));
  } catch (e) {
    console.error(e);
  }
};


  const solved = problems.filter(p => progressMap[p.id]?.status === 'SOLVED').length;

  return (
    <div className="page-wrapper">
      <div style={styles.header}>
        <div>
          <h1 className="page-title">Problems</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            {solved} / {problems.length} solved
          </p>
        </div>
      </div>

      {/* Progress strip */}
      <div style={styles.progressStrip}>
        <div style={styles.progressFill(problems.length ? (solved / problems.length) * 100 : 0)}></div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div className="search-wrapper" style={{ flex: 1, maxWidth: 320 }}>
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="form-input search-input"
            placeholder="Search problems, tags, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          {DIFFICULTIES.map(d => (
            <button key={d} className={`filter-chip ${difficulty === d ? 'active' : ''}`}
              onClick={() => setDifficulty(d)}>
              {d === 'ALL' ? 'All' : d}
            </button>
          ))}
        </div>

        <select className="form-select" style={{ width: 160 }} value={category}
          onChange={e => setCategory(e.target.value)}>
          <option value="ALL">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={styles.resultsInfo}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> problems
        </span>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
          <div className="loading-spinner" style={{ width: 32, height: 32 }}></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>No problems match your filters</p>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setDifficulty('ALL'); setCategory('ALL'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map(problem => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              progress={progressMap[problem.id]}
              onSolve={handleSolve}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  progressStrip: {
    height: 3, background: 'var(--bg-overlay)', borderRadius: 99, marginBottom: 24, overflow: 'hidden',
  },
  progressFill: (pct) => ({
    height: '100%', width: `${pct}%`,
    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-blue))',
    borderRadius: 99, transition: 'width 1s ease',
  }),
  filters: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 },
  resultsInfo: { marginBottom: 20 },
};

export default Problems;
