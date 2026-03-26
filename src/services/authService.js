import axios from '../api/axiosConfig';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

const authService = {
  async login(usernameOrEmail, password) {
    const res = await axios.post('/auth/login', { usernameOrEmail, password });
    const data = res.data;
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: data.userId, username: data.username, email: data.email,
      fullName: data.fullName, role: data.role,
    }));
    return data;
  },

  async register(payload) {
    const res = await axios.post('/auth/register', payload);
    const data = res.data;
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: data.userId, username: data.username, email: data.email,
      fullName: data.fullName, role: data.role,
    }));
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    return this.getUser()?.role === 'ADMIN';
  },
};

export default authService;
