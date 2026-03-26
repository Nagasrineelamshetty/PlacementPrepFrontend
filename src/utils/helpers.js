export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
};

export const getDifficultyColor = (difficulty) => {
  const map = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };
  return map[difficulty?.toUpperCase()] || 'blue';
};

export const getStatusColor = (status) => {
  const map = {
    SOLVED: 'primary',
    IN_PROGRESS: 'amber',
    NEEDS_REVIEW: 'rose',
    NOT_ATTEMPTED: 'muted',
  };
  return map[status] || 'muted';
};

export const getStatusLabel = (status) => {
  const map = {
    SOLVED: 'Solved',
    IN_PROGRESS: 'In Progress',
    NEEDS_REVIEW: 'Needs Review',
    NOT_ATTEMPTED: 'Not Attempted',
  };
  return map[status] || status;
};

export const truncate = (str, len = 80) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const parseTags = (tagStr) => {
  if (!tagStr) return [];
  return tagStr.split(',').map(t => t.trim()).filter(Boolean);
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const calcPercentage = (solved, total) => {
  if (!total) return 0;
  return Math.round((solved / total) * 100);
};

export const getScoreGrade = (percentage) => {
  if (percentage >= 90) return { label: 'Excellent', color: 'var(--easy)' };
  if (percentage >= 75) return { label: 'Good', color: 'var(--accent-blue)' };
  if (percentage >= 60) return { label: 'Average', color: 'var(--medium)' };
  return { label: 'Needs Work', color: 'var(--hard)' };
};

export const formatDuration = (minutes) => {
  if (!minutes) return '—';
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};
