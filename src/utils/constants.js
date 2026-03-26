export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const TOKEN_KEY = 'pp_token';
export const USER_KEY = 'pp_user';

export const DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const SOLVE_STATUS = {
  NOT_ATTEMPTED: 'NOT_ATTEMPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  SOLVED: 'SOLVED',
  NEEDS_REVIEW: 'NEEDS_REVIEW',
};

export const TEST_TYPE = {
  TECHNICAL: 'TECHNICAL',
  APTITUDE: 'APTITUDE',
  CODING: 'CODING',
  MIXED: 'MIXED',
};

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const CATEGORIES = [
  'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs',
  'Dynamic Programming', 'Binary Search', 'Two Pointers', 'Sliding Window',
  'Backtracking', 'Greedy', 'Sorting', 'Hashing', 'Design', 'Math',
];

export const TOP_COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
  'Netflix', 'Uber', 'Airbnb', 'Adobe', 'Flipkart',
];

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/problems', label: 'Problems', icon: 'Code2' },
  { path: '/mock-tests', label: 'Mock Tests', icon: 'ClipboardList' },
  { path: '/company-prep', label: 'Company Prep', icon: 'Building2' },
  { path: '/progress', label: 'Progress', icon: 'TrendingUp' },
  { path: '/resume', label: 'Resume Builder', icon: 'FileText' },
  { path: '/forum', label: 'Discussion', icon: 'MessageSquare' },
];
