// src/pages/AdminDashboard.tsx

import React, { useEffect, useState } from "react";

interface Booking {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  frequency?: string;
  firstServiceDate?: string;
  receivedAt: string;
  areas?: string[];
  addOns?: string[];
  referralCode?: string;
  wasteLevel?: string;
  total?: number;
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("adminToken"));
  const [passwordInput, setPasswordInput] = useState<string>("");

  const fetchBookings = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    setLoading(true);
    fetch("/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setAllBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) fetchBookings();
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("adminToken", "my-admin-token");
      setIsLoggedIn(true);
      setError(null);
    } else {
      setError("Invalid admin password.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto p-6 mt-20 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="search" className="sr-only">Search bookings</label>
          <input
            id="search"
            type="text"
            placeholder="Search bookings..."
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              const filtered = allBookings.filter((b) =>
                [b.name, b.email, b.address].some((field) =>
                  field?.toLowerCase().includes(query)
                )
              );
              setBookings(filtered);
            }}
            className="w-full max-w-sm border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="filter-frequency">Filter by frequency</label>
          <select
            id="filter-frequency"
            title="Filter bookings by frequency"
            onChange={(e) => {
              const freq = e.target.value;
              if (!freq) return setBookings(allBookings);
              const filtered = allBookings.filter((b) => b.frequency === freq);
              setBookings(filtered);
            }}
            className="w-full max-w-xs border p-2 rounded"
          >
            <option value="">All Frequencies</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="twice">Twice a Week</option>
            <option value="onetime">One-Time</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="start-date">Start date</label>
          <input
            id="start-date"
            type="date"
            onChange={(e) => {
              const startDate = new Date(e.target.value);
              const filtered = allBookings.filter((b) =>
                new Date(b.firstServiceDate || "") >= startDate
              );
              setBookings(filtered);
            }}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={() => setBookings(allBookings)}
          className="text-sm mt-6 md:mt-5 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            const csvHeader = "Name,Email,Phone,Address,Frequency,First Service,Received At,Areas,Add-Ons";
            const csvRows = bookings.map((b) =>
              [
                b.name || "",
                b.email || "",
                b.phone || "",
                b.address || "",
                b.frequency || "",
                b.firstServiceDate || "",
                new Date(b.receivedAt).toLocaleString(),
                (b.areas || []).join(" | "),
                (b.addOns || []).join(" | ")
              ].map((v) => `"${v.replace(/"/g, '""')}`)
              .join(",")
            );
            const csv = [csvHeader, ...csvRows].join("\n");

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `tidytrails-bookings.csv`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-4"
        >
          Export CSV
        </button>
        <h1 className="text-2xl font-bold">Admin Booking Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            setIsLoggedIn(false);
          }}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-2">Showing {bookings.length} of {allBookings.length} bookings</p>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Frequency</th>
            <th className="border p-2">First Service</th>
            <th className="border p-2">Received At</th>
            <th className="border p-2">Areas</th>
            <th className="border p-2">Add-Ons</th>
            <th className="border p-2">Referral</th>
            <th className="border p-2">Waste Level</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className={`text-sm ${new Date(b.firstServiceDate || '').getTime() < Date.now() ? 'bg-gray-100 text-gray-500' : ''}`}>
              <td className="border p-2">{b.name || "-"}</td>
              <td className="border p-2">{b.email || "-"}</td>
              <td className="border p-2">{b.phone || "-"}</td>
              <td className="border p-2">{b.address || "-"}</td>
              <td className="border p-2">{b.frequency || "-"}</td>
              <td className="border p-2">{b.firstServiceDate || "-"}</td>
              <td className="border p-2">{new Date(b.receivedAt).toLocaleString()}</td>
              <td className="border p-2">{(b.areas || []).join(', ')}</td>
              <td className="border p-2">{(b.addOns || []).join(', ')}</td>
              <td className="border p-2">{b.referralCode || "-"}</td>
              <td className="border p-2">{b.wasteLevel || "-"}</td>
              <td className="border p-2">{typeof b.total === 'number' ? `$${b.total.toFixed(2)}` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;