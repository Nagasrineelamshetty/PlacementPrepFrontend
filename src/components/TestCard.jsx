import React from 'react';
import { formatDuration } from '../utils/helpers';

const typeColors = {
  TECHNICAL: 'blue', APTITUDE: 'amber', CODING: 'primary', MIXED: 'violet',
};

const TestCard = ({ test, onStart }) => {
  const problems = test.problems || [];
  const colorKey = typeColors[test.testType] || 'blue';

  return (
    <div className="card" style={styles.card}>
      <div style={styles.header}>
        <span className={`badge badge-${colorKey}`}>{test.testType}</span>
        {test.companyName && (
          <span style={styles.company}>{test.companyName}</span>
        )}
      </div>

      <h3 style={styles.title}>{test.title}</h3>

      {test.description && (
        <p style={styles.desc}>{test.description.slice(0, 80)}...</p>
      )}

      <div style={styles.stats}>
        <div style={styles.stat}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>{formatDuration(test.durationMinutes)}</span>
        </div>
        <div style={styles.stat}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
            <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
          </svg>
          <span>{problems.length} problems</span>
        </div>
        {test.totalMarks && (
          <div style={styles.stat}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span>{test.totalMarks} marks</span>
          </div>
        )}
      </div>

      <button className="btn btn-primary" style={styles.startBtn} onClick={() => onStart && onStart(test)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
        Start Test
      </button>
    </div>
  );
};

const styles = {
  card: { display: 'flex', flexDirection: 'column', gap: 12 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  company: {
    fontSize: 11, color: 'var(--text-muted)', fontWeight: 600,
    letterSpacing: '0.04em', textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
    color: 'var(--text-primary)', lineHeight: 1.3,
  },
  desc: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 },
  stats: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  stat: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
  },
  startBtn: { marginTop: 4, justifyContent: 'center' },
};

export default TestCard;
