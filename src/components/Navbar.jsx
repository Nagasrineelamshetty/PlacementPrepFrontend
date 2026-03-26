import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getInitials } from '../utils/helpers';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <span style={styles.logo}>PP</span>
        <span style={styles.brandName}>PlacementPrep</span>
      </div>

      <div style={styles.right}>
        <div style={styles.searchBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input placeholder="Quick search..." style={styles.searchInput} />
          <kbd style={styles.kbd}>⌘K</kbd>
        </div>

        <div style={styles.userArea}>
          <div style={styles.notifBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={styles.notifDot}></span>
          </div>

          <div style={styles.avatarWrapper} onClick={() => setShowMenu(!showMenu)}>
            <div style={styles.avatar}>{getInitials(user?.fullName)}</div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.fullName || user?.username}</span>
              <span style={styles.userRole}>{user?.role}</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>

          {showMenu && (
            <div style={styles.dropdown} onClick={() => setShowMenu(false)}>
              <div style={styles.dropdownItem} onClick={() => navigate('/progress')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                My Progress
              </div>
              <div style={styles.dropdownDivider} />
              <div style={styles.dropdownItem} onClick={handleLogout} className="danger">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed', top: 0, left: 'var(--sidebar-width)', right: 0,
    height: 'var(--navbar-height)',
    background: 'rgba(10,12,18,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-subtle)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 28px', zIndex: 100,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: {
    width: 28, height: 28, background: 'var(--accent-primary)',
    color: 'var(--text-inverse)', borderRadius: 6,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-display)',
  },
  brandName: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' },
  right: { display: 'flex', alignItems: 'center', gap: 16 },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
    borderRadius: 8, padding: '6px 12px', width: 220,
  },
  searchInput: {
    background: 'transparent', border: 'none', outline: 'none',
    color: 'var(--text-primary)', fontSize: 13, flex: 1,
    fontFamily: 'var(--font-body)',
  },
  kbd: {
    background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)',
    borderRadius: 4, padding: '1px 5px', fontSize: 10,
    color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
  },
  userArea: { display: 'flex', alignItems: 'center', gap: 12, position: 'relative' },
  notifBtn: {
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
    borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute', top: 7, right: 7, width: 6, height: 6,
    background: 'var(--accent-rose)', borderRadius: '50%',
    border: '1.5px solid var(--bg-elevated)',
  },
  avatarWrapper: {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
    padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border-subtle)',
    background: 'var(--bg-elevated)', transition: 'all 0.2s',
  },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-blue))',
    color: 'var(--text-inverse)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 11, fontWeight: 700,
  },
  userInfo: { display: 'flex', flexDirection: 'column' },
  userName: { fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)' },
  userRole: { fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  dropdown: {
    position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 180,
    background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
    borderRadius: 10, padding: '6px', zIndex: 200,
    boxShadow: 'var(--shadow-lg)',
  },
  dropdownItem: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
    borderRadius: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)',
    transition: 'all 0.15s',
  },
  dropdownDivider: { height: 1, background: 'var(--border-subtle)', margin: '4px 0' },
};

export default Navbar;
