import React, { useState } from 'react';

const SECTIONS = ['Personal', 'Education', 'Experience', 'Projects', 'Skills'];

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('Personal');
  const [data, setData] = useState({
    personal: { fullName: '', email: '', phone: '', linkedin: '', github: '', location: '' },
    education: [{ institution: '', degree: '', field: '', year: '', gpa: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    projects: [{ name: '', tech: '', description: '', link: '' }],
    skills: { languages: '', frameworks: '', tools: '', others: '' },
  });

  const updatePersonal = (key, val) => setData(d => ({ ...d, personal: { ...d.personal, [key]: val } }));

  const addItem = (section) => {
    const templates = {
      education: { institution: '', degree: '', field: '', year: '', gpa: '' },
      experience: { company: '', role: '', duration: '', description: '' },
      projects: { name: '', tech: '', description: '', link: '' },
    };
    setData(d => ({ ...d, [section]: [...d[section], templates[section]] }));
  };

  const updateItem = (section, idx, key, val) => {
    setData(d => ({
      ...d,
      [section]: d[section].map((item, i) => i === idx ? { ...item, [key]: val } : item),
    }));
  };

  const removeItem = (section, idx) => {
    setData(d => ({ ...d, [section]: d[section].filter((_, i) => i !== idx) }));
  };

  return (
    <div className="page-wrapper">
      <div style={styles.header}>
        <div>
          <h1 className="page-title">Resume Builder</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            Build an ATS-friendly resume for placements
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('PDF export coming soon!')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export PDF
        </button>
      </div>

      <div style={styles.layout}>
        {/* Editor */}
        <div style={styles.editor}>
          <div className="tabs">
            {SECTIONS.map(s => (
              <div key={s} className={`tab ${activeSection === s ? 'active' : ''}`}
                onClick={() => setActiveSection(s)}>{s}</div>
            ))}
          </div>

          {activeSection === 'Personal' && (
            <div style={styles.formGrid}>
              {[
                { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
                { key: 'email', label: 'Email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone', placeholder: '+91 9876543210' },
                { key: 'location', label: 'Location', placeholder: 'Hyderabad, India' },
                { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe' },
                { key: 'github', label: 'GitHub', placeholder: 'github.com/johndoe' },
              ].map(f => (
                <div className="form-group" key={f.key}>
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" placeholder={f.placeholder}
                    value={data.personal[f.key]} onChange={e => updatePersonal(f.key, e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'Education' && (
            <div>
              {data.education.map((edu, i) => (
                <div key={i} className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Education #{i + 1}</span>
                    {data.education.length > 1 && (
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem('education', i)}>Remove</button>
                    )}
                  </div>
                  <div style={styles.formGrid}>
                    {[
                      { key: 'institution', label: 'Institution', placeholder: 'IIT Delhi' },
                      { key: 'degree', label: 'Degree', placeholder: 'B.Tech' },
                      { key: 'field', label: 'Field', placeholder: 'Computer Science' },
                      { key: 'year', label: 'Year', placeholder: '2021 – 2025' },
                      { key: 'gpa', label: 'GPA / %', placeholder: '8.5 / 10' },
                    ].map(f => (
                      <div className="form-group" key={f.key}>
                        <label className="form-label">{f.label}</label>
                        <input className="form-input" placeholder={f.placeholder}
                          value={edu[f.key]} onChange={e => updateItem('education', i, f.key, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm" onClick={() => addItem('education')}>+ Add Education</button>
            </div>
          )}

          {activeSection === 'Experience' && (
            <div>
              {data.experience.map((exp, i) => (
                <div key={i} className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Experience #{i + 1}</span>
                    {data.experience.length > 1 && (
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem('experience', i)}>Remove</button>
                    )}
                  </div>
                  <div style={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input className="form-input" placeholder="Google" value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <input className="form-input" placeholder="SWE Intern" value={exp.role} onChange={e => updateItem('experience', i, 'role', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input className="form-input" placeholder="Jun 2024 – Aug 2024" value={exp.duration} onChange={e => updateItem('experience', i, 'duration', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 12 }}>
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" rows={3} placeholder="Describe your work and impact..."
                      value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm" onClick={() => addItem('experience')}>+ Add Experience</button>
            </div>
          )}

          {activeSection === 'Projects' && (
            <div>
              {data.projects.map((proj, i) => (
                <div key={i} className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Project #{i + 1}</span>
                    {data.projects.length > 1 && (
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem('projects', i)}>Remove</button>
                    )}
                  </div>
                  <div style={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Project Name</label>
                      <input className="form-input" placeholder="E-Commerce Platform" value={proj.name} onChange={e => updateItem('projects', i, 'name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tech Stack</label>
                      <input className="form-input" placeholder="React, Spring Boot, MySQL" value={proj.tech} onChange={e => updateItem('projects', i, 'tech', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub / Live Link</label>
                      <input className="form-input" placeholder="github.com/..." value={proj.link} onChange={e => updateItem('projects', i, 'link', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 12 }}>
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" rows={3} placeholder="Describe the project..."
                      value={proj.description} onChange={e => updateItem('projects', i, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm" onClick={() => addItem('projects')}>+ Add Project</button>
            </div>
          )}

          {activeSection === 'Skills' && (
            <div style={styles.formGrid}>
              {[
                { key: 'languages', label: 'Programming Languages', placeholder: 'Java, Python, JavaScript, C++' },
                { key: 'frameworks', label: 'Frameworks & Libraries', placeholder: 'Spring Boot, React, Node.js' },
                { key: 'tools', label: 'Tools & Platforms', placeholder: 'Git, Docker, AWS, Linux' },
                { key: 'others', label: 'Other Skills', placeholder: 'System Design, DSA, Problem Solving' },
              ].map(f => (
                <div className="form-group" key={f.key} style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" placeholder={f.placeholder}
                    value={data.skills[f.key]} onChange={e => setData(d => ({ ...d, skills: { ...d.skills, [f.key]: e.target.value } }))} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview */}
        <div style={styles.preview}>
          <div style={styles.previewLabel}>Live Preview</div>
          <div style={styles.resumeDoc}>
            <div style={styles.resumeHeader}>
              <h2 style={styles.resumeName}>{data.personal.fullName || 'Your Name'}</h2>
              <div style={styles.resumeContact}>
                {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' · ')}
              </div>
              <div style={styles.resumeLinks}>
                {[data.personal.linkedin, data.personal.github].filter(Boolean).join(' · ')}
              </div>
            </div>

            {data.education.some(e => e.institution) && (
              <ResumeSection title="Education">
                {data.education.filter(e => e.institution).map((e, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={styles.resumeItemHeader}>
                      <strong>{e.institution}</strong>
                      <span>{e.year}</span>
                    </div>
                    <div style={styles.resumeItemSub}>{[e.degree, e.field].filter(Boolean).join(' in ')}{e.gpa && ` · ${e.gpa}`}</div>
                  </div>
                ))}
              </ResumeSection>
            )}

            {data.experience.some(e => e.company) && (
              <ResumeSection title="Experience">
                {data.experience.filter(e => e.company).map((e, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={styles.resumeItemHeader}>
                      <strong>{e.role}</strong>
                      <span>{e.duration}</span>
                    </div>
                    <div style={styles.resumeItemSub}>{e.company}</div>
                    {e.description && <p style={styles.resumeItemDesc}>{e.description}</p>}
                  </div>
                ))}
              </ResumeSection>
            )}

            {data.projects.some(p => p.name) && (
              <ResumeSection title="Projects">
                {data.projects.filter(p => p.name).map((p, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={styles.resumeItemHeader}>
                      <strong>{p.name}</strong>
                      {p.tech && <span style={{ fontStyle: 'italic', fontSize: 9 }}>{p.tech}</span>}
                    </div>
                    {p.description && <p style={styles.resumeItemDesc}>{p.description}</p>}
                  </div>
                ))}
              </ResumeSection>
            )}

            {Object.values(data.skills).some(Boolean) && (
              <ResumeSection title="Skills">
                {Object.entries(data.skills).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 4, fontSize: 10 }}>
                    <strong style={{ textTransform: 'capitalize' }}>{k}: </strong>{v}
                  </div>
                ))}
              </ResumeSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeSection = ({ title, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #333', paddingBottom: 3, marginBottom: 8 }}>{title}</div>
    {children}
  </div>
);

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' },
  editor: { background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  preview: { background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, position: 'sticky', top: 80 },
  previewLabel: { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 },
  resumeDoc: { background: '#fff', borderRadius: 6, padding: '24px 20px', fontSize: 10, color: '#111', minHeight: 400, fontFamily: 'Arial, sans-serif', lineHeight: 1.4 },
  resumeHeader: { textAlign: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid #111' },
  resumeName: { fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 4 },
  resumeContact: { fontSize: 9, color: '#444', marginBottom: 2 },
  resumeLinks: { fontSize: 9, color: '#666' },
  resumeItemHeader: { display: 'flex', justifyContent: 'space-between', fontSize: 10 },
  resumeItemSub: { fontSize: 9, color: '#555', marginTop: 1 },
  resumeItemDesc: { fontSize: 9, color: '#444', marginTop: 3, lineHeight: 1.4 },
};

export default ResumeBuilder;
