import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedLayout } from '../components/ProtectedLayout';

import { HomePage } from '../pages/HomePage';
import { ResortListingPage } from '../pages/ResortListingPage';
import { ResortDetailsPage } from '../pages/ResortDetailsPage';
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { OwnerLoginPage } from '../pages/OwnerLoginPage';
import { OwnerDashboardPage } from '../pages/OwnerDashboardPage';

// TODO: Connect Supabase Authentication
// TODO: Connect JWT Authentication
// TODO: Protected Routes

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resorts" element={<ResortListingPage />} />
        <Route path="/resorts/:id" element={<ResortDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/owner/login" element={<OwnerLoginPage />} />
        <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Protected Dashboard Pages wrapped in ProtectedLayout & DashboardLayout */}
      <Route element={<ProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

