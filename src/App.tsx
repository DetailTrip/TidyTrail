// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import BookingWizard from "@booking/components/BookingWizard";
import AdminDashboard from "@/pages/AdminDashboard";
import ThankYouPage from "@/pages/ThankYouPage";

import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);

const App: React.FC = () => (
  <Shell>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingWizard />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Shell>
);

export default App;
