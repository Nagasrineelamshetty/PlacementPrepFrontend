import axios from '../api/axiosConfig';

const problemService = {
  getAll: () => axios.get('/problems').then(r => r.data),
  getById: (id) => axios.get(`/problems/${id}`).then(r => r.data),
  getByDifficulty: (d) => axios.get(`/problems/difficulty/${d}`).then(r => r.data),
  getByCategory: (c) => axios.get(`/problems/category/${encodeURIComponent(c)}`).then(r => r.data),
  search: (keyword) => axios.get(`/problems/search?keyword=${encodeURIComponent(keyword)}`).then(r => r.data),
  getByCompany: (name) => axios.get(`/problems/company/${encodeURIComponent(name)}`).then(r => r.data),
  getCategories: () => axios.get('/problems/categories').then(r => r.data),
  getStats: () => axios.get('/problems/stats').then(r => r.data),
  create: (data) => axios.post('/problems', data).then(r => r.data),
  update: (id, data) => axios.put(`/problems/${id}`, data).then(r => r.data),
  delete: (id) => axios.delete(`/problems/${id}`).then(r => r.data),
};

export default problemService;
