import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = authService.getUser();
    if (stored && authService.isAuthenticated()) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (usernameOrEmail, password) => {
    const data = await authService.login(usernameOrEmail, password);
    const userData = {
      id: data.userId, username: data.username, email: data.email,
      fullName: data.fullName, role: data.role,
    };
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    const userData = {
      id: data.userId, username: data.username, email: data.email,
      fullName: data.fullName, role: data.role,
    };
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
