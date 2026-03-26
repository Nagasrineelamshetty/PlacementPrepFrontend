import axios from '../api/axiosConfig';

const testService = {
  getAll: () => axios.get('/mock-tests').then(r => r.data),
  getById: (id) => axios.get(`/mock-tests/${id}`).then(r => r.data),
  getByCompany: (name) => axios.get(`/mock-tests/company/${encodeURIComponent(name)}`).then(r => r.data),
  getByType: (type) => axios.get(`/mock-tests/type/${type}`).then(r => r.data),
  create: (data) => axios.post('/mock-tests', data).then(r => r.data),
  update: (id, data) => axios.put(`/mock-tests/${id}`, data).then(r => r.data),
  delete: (id) => axios.delete(`/mock-tests/${id}`).then(r => r.data),
};

export default testService;
