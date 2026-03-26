import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Problems from '../pages/Problems';
import MockTests from '../pages/MockTests';
import CompanyPrep from '../pages/CompanyPrep';
import ResumeBuilder from '../pages/ResumeBuilder';
import DiscussionForum from '../pages/DiscussionForum';
import Progress from '../pages/Progress';
import AdminPanel from '../pages/AdminPanel';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-screen">
      <div className="loading-spinner" style={{ width: 36, height: 36 }}></div>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading...</span>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      {children}
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout><Dashboard /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/problems" element={
        <ProtectedRoute>
          <AppLayout><Problems /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/mock-tests" element={
        <ProtectedRoute>
          <AppLayout><MockTests /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/company-prep" element={
        <ProtectedRoute>
          <AppLayout><CompanyPrep /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/progress" element={
        <ProtectedRoute>
          <AppLayout><Progress /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/resume" element={
        <ProtectedRoute>
          <AppLayout><ResumeBuilder /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/forum" element={
        <ProtectedRoute>
          <AppLayout><DiscussionForum /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin" element={
        <AdminRoute>
          <AppLayout><AdminPanel /></AppLayout>
        </AdminRoute>
      } />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
