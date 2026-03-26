import axios from '../api/axiosConfig';

const userService = {
  // Progress
  getProgress: (userId) => axios.get(`/progress/user/${userId}`).then(r => r.data),
  getProblemProgress: (userId, problemId) => axios.get(`/progress/user/${userId}/problem/${problemId}`).then(r => r.data),
  getProgressByStatus: (userId, status) => axios.get(`/progress/user/${userId}/status/${status}`).then(r => r.data),
  getBookmarks: (userId) => axios.get(`/progress/user/${userId}/bookmarks`).then(r => r.data),
  getStats: (userId) => axios.get(`/progress/user/${userId}/stats`).then(r => r.data),
  updateProgress: (userId, problemId, status, notes) =>
    axios.post(`/progress/user/${userId}/problem/${problemId}?status=${status}${notes ? `&notes=${encodeURIComponent(notes)}` : ''}`).then(r => r.data),
  toggleBookmark: (userId, problemId) =>
    axios.post(`/progress/user/${userId}/problem/${problemId}/bookmark`).then(r => r.data),

  // Companies
  getCompanies: () => axios.get('/companies').then(r => r.data),
  getCompanyById: (id) => axios.get(`/companies/${id}`).then(r => r.data),
  searchCompanies: (keyword) => axios.get(`/companies/search?keyword=${encodeURIComponent(keyword)}`).then(r => r.data),

  // Admin
  getAllUsers: () => axios.get('/admin/users').then(r => r.data),
  getDashboardStats: () => axios.get('/admin/dashboard').then(r => r.data),
  deactivateUser: (id) => axios.delete(`/admin/users/${id}`).then(r => r.data),
};

export default userService;
