import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// TODO: Protected Routes
// TODO: JWT Authentication
// TODO: Connect Supabase Authentication

export function ProtectedLayout() {
  // Simulating authentication status.
  // Set to true so students can view and test the Dashboard UI right away.
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
