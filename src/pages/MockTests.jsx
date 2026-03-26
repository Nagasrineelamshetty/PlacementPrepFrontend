import React, { useEffect, useState } from 'react';
import testService from '../services/testService';
import TestCard from '../components/TestCard';

const TYPES = ['ALL', 'TECHNICAL', 'APTITUDE', 'CODING', 'MIXED'];

const MockTests = () => {
  const [tests, setTests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('ALL');
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    testService.getAll()
      .then(data => { setTests(data); setFiltered(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeType === 'ALL') setFiltered(tests);
    else setFiltered(tests.filter(t => t.testType === activeType));
  }, [activeType, tests]);

  const handleStart = (test) => setActiveModal(test);

  return (
    <div className="page-wrapper">
      <div style={styles.header}>
        <div>
          <h1 className="page-title">Mock Tests</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            Simulate real interview conditions
          </p>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 24 }}>
        {TYPES.map(t => (
          <button key={t} className={`filter-chip ${activeType === t ? 'active' : ''}`}
            onClick={() => setActiveType(t)}>
            {t === 'ALL' ? 'All Types' : t}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
          <div className="loading-spinner" style={{ width: 32, height: 32 }}></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p style={{ color: 'var(--text-secondary)' }}>No tests available yet</p>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map(test => (
            <TestCard key={test.id} test={test} onStart={handleStart} />
          ))}
        </div>
      )}

      {/* Start Test Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              {activeModal.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
              {activeModal.description || 'Ready to test your skills?'}
            </p>

            <div style={styles.testInfo}>
              {[
                { label: 'Duration', value: `${activeModal.durationMinutes || 60} minutes` },
                { label: 'Problems', value: `${activeModal.problems?.length || 0} questions` },
                { label: 'Total Marks', value: activeModal.totalMarks || 100 },
                { label: 'Type', value: activeModal.testType },
              ].map(info => (
                <div key={info.label} style={styles.infoRow}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{info.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{info.value}</span>
                </div>
              ))}
            </div>

            <div style={styles.modalNote}>
              ⚠️ Once started, the timer cannot be paused. Make sure you're ready.
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }}
                onClick={() => { alert('Test started! (Backend integration needed)'); setActiveModal(null); }}>
                Start Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  testInfo: { display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--bg-elevated)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-subtle)' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 16px',
    borderBottom: '1px solid var(--border-subtle)',
  },
  modalNote: {
    background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
    color: 'var(--accent-amber)', borderRadius: 8, padding: '10px 14px',
    fontSize: 13, marginTop: 16,
  },
};

export default MockTests;
