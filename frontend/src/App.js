// filepath: /d:/React/evaleasy-frontend/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Shared/Navbar';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import RepresentativeDashboard from './components/Representative/RepresentativeDashboard';
import InstructorDashboard from './components/Instructor/InstructorDashboard';
import InstitutionDetails from './components/Admin/InstitutionDetails';
import PrivateRoute from './components/PrivateRoute';
import RedirectHandler from './components/RedirectHandler';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <RedirectHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/representative"
            element={
              <PrivateRoute allowedRoles={['institution representative']}>
                <RepresentativeDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <PrivateRoute allowedRoles={['instructor']}>
                <InstructorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/institution/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <InstitutionDetails />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;