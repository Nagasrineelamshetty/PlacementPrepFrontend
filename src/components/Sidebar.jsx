import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const icons = {
  LayoutDashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Code2: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  ),
  ClipboardList: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
    </svg>
  ),
  Building2: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
      <polyline points="17,6 23,6 23,12"/>
    </svg>
  ),
  FileText: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  MessageSquare: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

const NavItem = ({ to, iconKey, label, badge }) => {
  const Icon = icons[iconKey];
  return (
    <NavLink to={to} style={({ isActive }) => ({
      ...styles.navItem,
      ...(isActive ? styles.navItemActive : {}),
    })}>
      {({ isActive }) => (
        <>
          <span style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }}>
            {Icon && <Icon />}
          </span>
          <span style={styles.navLabel}>{label}</span>
          {badge && <span style={styles.navBadge}>{badge}</span>}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const { isAdmin } = useAuth();

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoArea}>
        <div style={styles.logoIcon}>PP</div>
        <div>
          <div style={styles.logoText}>PlacementPrep</div>
          <div style={styles.logoSub}>Interview Mastery</div>
        </div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.navGroup}>
          <span style={styles.navGroupLabel}>Main</span>
          <NavItem to="/dashboard" iconKey="LayoutDashboard" label="Dashboard" />
          <NavItem to="/problems" iconKey="Code2" label="Problems" badge="250+" />
          <NavItem to="/mock-tests" iconKey="ClipboardList" label="Mock Tests" />
        </div>

        <div style={styles.navGroup}>
          <span style={styles.navGroupLabel}>Prep</span>
          <NavItem to="/company-prep" iconKey="Building2" label="Company Prep" />
          <NavItem to="/progress" iconKey="TrendingUp" label="My Progress" />
          <NavItem to="/resume" iconKey="FileText" label="Resume Builder" />
        </div>

        <div style={styles.navGroup}>
          <span style={styles.navGroupLabel}>Community</span>
          <NavItem to="/forum" iconKey="MessageSquare" label="Discussion" />
        </div>

        {isAdmin && (
          <div style={styles.navGroup}>
            <span style={styles.navGroupLabel}>Admin</span>
            <NavItem to="/admin" iconKey="Shield" label="Admin Panel" />
          </div>
        )}
      </nav>

      <div style={styles.sidebarFooter}>
        <div style={styles.tagline}>
          <span style={styles.taglineDot}></span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Ready for placements</span>
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'fixed', top: 0, left: 0, bottom: 0,
    width: 'var(--sidebar-width)',
    background: 'var(--bg-surface)',
    borderRight: '1px solid var(--border-subtle)',
    display: 'flex', flexDirection: 'column',
    zIndex: 200, overflow: 'hidden',
  },
  logoArea: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '18px 20px 16px',
    borderBottom: '1px solid var(--border-subtle)',
  },
  logoIcon: {
    width: 34, height: 34, background: 'var(--accent-primary)',
    color: 'var(--text-inverse)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-display)',
    flexShrink: 0,
  },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.3px' },
  logoSub: { fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' },
  nav: { flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 },
  navGroup: { marginBottom: 20 },
  navGroupLabel: {
    display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 10px', marginBottom: 4,
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 8, color: 'var(--text-secondary)',
    fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
    textDecoration: 'none', marginBottom: 1,
  },
  navItemActive: {
    background: 'var(--accent-primary-dim)',
    color: 'var(--accent-primary)',
    fontWeight: 600,
  },
  navLabel: { flex: 1 },
  navBadge: {
    background: 'var(--bg-overlay)', color: 'var(--text-muted)',
    fontSize: 10, padding: '1px 6px', borderRadius: 99,
    fontFamily: 'var(--font-mono)',
  },
  sidebarFooter: {
    padding: '12px 20px',
    borderTop: '1px solid var(--border-subtle)',
  },
  tagline: { display: 'flex', alignItems: 'center', gap: 7 },
  taglineDot: {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--easy)',
    boxShadow: '0 0 6px rgba(110,231,183,0.6)',
  },
};

export default Sidebar;
