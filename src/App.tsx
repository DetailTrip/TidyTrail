// src/App.tsx
import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import BookingWizard from "@booking/components/BookingWizard";
import AdminDashboard from "@/pages/AdminDashboard"; // ✅ Import admin page

/** Layout wrapper */
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-tidy-green">
        TidyTrails
      </Link>
      <Link
        to="/booking"
        className="px-4 py-2 rounded bg-tidy-green text-white hover:bg-green-800"
      >
        Book Now
      </Link>
    </header>

    <main className="flex-1">{children}</main>

    <footer className="text-center text-sm text-gray-500 p-4">
      © {new Date().getFullYear()} TidyTrails
    </footer>
  </div>
);

const App: React.FC = () => (
  <Shell>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingWizard />} />
      <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ Admin route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Shell>
);

export default App;
