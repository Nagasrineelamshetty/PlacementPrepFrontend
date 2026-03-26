import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import problemService from '../services/problemService';

const CompanyPrep = () => {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [companyProblems, setCompanyProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [probLoading, setProbLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    userService.getCompanies()
      .then(setCompanies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectCompany = async (company) => {
    setSelected(company);
    setProbLoading(true);
    try {
      const probs = await problemService.getByCompany(company.name);
      setCompanyProblems(probs);
    } catch (e) { console.error(e); setCompanyProblems([]); }
    finally { setProbLoading(false); }
  };

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <h1 className="page-title" style={{ marginBottom: 6 }}>Company Prep</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Study problems and patterns for specific companies
      </p>

      <div style={styles.layout}>
        {/* Company List */}
        <div style={styles.companyList}>
          <div className="search-wrapper" style={{ marginBottom: 12 }}>
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input className="form-input search-input" placeholder="Search companies..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
              <div className="loading-spinner"></div>
            </div>
          ) : (
            filtered.map(c => (
              <div key={c.id} style={{ ...styles.companyItem, ...(selected?.id === c.id ? styles.companyItemActive : {}) }}
                onClick={() => handleSelectCompany(c)}>
                <div style={styles.companyLogo}>
                  {c.logoUrl ? <img src={c.logoUrl} alt={c.name} style={{ width: 28, height: 28, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} /> : c.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: selected?.id === c.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{c.industry}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Company Detail */}
        <div style={styles.companyDetail}>
          {!selected ? (
            <div className="empty-state" style={{ height: '100%' }}>
              <div style={{ fontSize: 40 }}>🏢</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Select a company to see prep material</p>
            </div>
          ) : (
            <div>
              <div style={styles.companyHeader}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>{selected.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{selected.industry}</p>
                </div>
                {selected.website && (
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                )}
              </div>

              {selected.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  {selected.description}
                </p>
              )}

              <div style={styles.metaGrid}>
                {selected.foundedYear && <InfoChip label="Founded" value={selected.foundedYear} />}
                {selected.salaryRange && <InfoChip label="Salary Range" value={selected.salaryRange} />}
                {selected.difficultyLevel && <InfoChip label="Interview Difficulty" value={selected.difficultyLevel} />}
              </div>

              {selected.interviewProcess && (
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 className="section-title" style={{ marginBottom: 10 }}>Interview Process</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {selected.interviewProcess}
                  </p>
                </div>
              )}

              <h3 className="section-title" style={{ marginBottom: 14 }}>
                Frequently Asked Problems
                {companyProblems.length > 0 && (
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>
                    ({companyProblems.length} problems)
                  </span>
                )}
              </h3>

              {probLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                  <div className="loading-spinner"></div>
                </div>
              ) : companyProblems.length === 0 ? (
                <div className="empty-state" style={{ padding: '30px 20px' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No problems tagged for this company yet</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Difficulty</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyProblems.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.title}</td>
                        <td><span className={`badge badge-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></td>
                        <td>{p.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoChip = ({ label, value }) => (
  <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '8px 14px' }}>
    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
  </div>
);

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, minHeight: 500 },
  companyList: {
    background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)', padding: 12, overflowY: 'auto', maxHeight: 720,
  },
  companyItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
    borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 2,
  },
  companyItemActive: { background: 'var(--accent-primary-dim)' },
  companyLogo: {
    width: 34, height: 34, borderRadius: 8, background: 'var(--bg-overlay)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, flexShrink: 0, overflow: 'hidden',
  },
  companyDetail: {
    background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)', padding: 24, overflowY: 'auto', maxHeight: 720,
  },
  companyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  metaGrid: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 },
};

export default CompanyPrep;
