
import React from 'react';
import { parseTags, truncate } from '../utils/helpers';

const ProblemCard = ({ problem, onSolve, onMarkSolved, progress, onBookmark }) => {
  const diff = problem.difficulty?.toLowerCase();
  const tags = parseTags(problem.tags);
  const isSolved = progress?.status === 'SOLVED';
  const isBookmarked = progress?.isBookmarked;

  return (
    <div style={styles.card} className="card">
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <span className={`badge badge-${diff}`}>{problem.difficulty}</span>
          {isSolved && (
            <span style={styles.solvedBadge}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Solved
            </span>
          )}
        </div>

        <button
          style={{ ...styles.bookmarkBtn, ...(isBookmarked ? styles.bookmarked : {}) }}
          onClick={() => onBookmark && onBookmark(problem.id)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={isBookmarked ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </button>
      </div>

      <h3 style={styles.title}>{problem.title}</h3>
      <p style={styles.desc}>{truncate(problem.description, 90)}</p>

      <div style={styles.tags}>
        {tags.slice(0, 3).map(tag => (
          <span key={tag} className="badge badge-blue" style={{ fontSize: 11 }}>
            {tag}
          </span>
        ))}
        {tags.length > 3 && <span style={styles.moreTags}>+{tags.length - 3}</span>}
      </div>

      <div style={styles.footer}>
        <div style={styles.meta}>
          {problem.timeComplexity && (
            <span style={styles.complexity}>
              <span style={{ color: 'var(--text-muted)' }}>T:</span> {problem.timeComplexity}
            </span>
          )}
          {problem.spaceComplexity && (
            <span style={styles.complexity}>
              <span style={{ color: 'var(--text-muted)' }}>S:</span> {problem.spaceComplexity}
            </span>
          )}
        </div>

        {/* 🔥 BUTTONS SECTION */}
        <div style={{ display: 'flex', gap: 8 }}>
          
          {/* Solve → Opens LeetCode */}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onSolve(problem)}
          >
            Solve
          </button>

          {/* Mark as Solved / Solved */}
          {isSolved ? (
            <button className="btn btn-sm btn-secondary" disabled>
              ✔ Solved
            </button>
          ) : (
            <button
              className="btn btn-sm btn-success"
              onClick={() => onMarkSolved(problem)}
            >
              Mark as Solved
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { display: 'flex', flexDirection: 'column', gap: 10 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  titleRow: { display: 'flex', alignItems: 'center', gap: 8 },
  solvedBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 11, color: 'var(--easy)', background: 'rgba(110,231,183,0.1)',
    padding: '2px 8px', borderRadius: 99, fontWeight: 600,
  },
  bookmarkBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--text-muted)', padding: 4, borderRadius: 4,
    display: 'flex', transition: 'color 0.15s',
  },
  bookmarked: { color: 'var(--accent-amber)' },
  title: {
    fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
    color: 'var(--text-primary)', lineHeight: 1.3,
  },
  desc: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  moreTags: { fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--border-subtle)',
  },
  meta: { display: 'flex', gap: 12 },
  complexity: { fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' },
};

export default ProblemCard;
