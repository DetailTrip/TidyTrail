// src/pages/AdminDashboard.tsx
import { useEffect } from "react";
import { supabase } from "@utils/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import BookingsTable from "@admin/components/BookingsTable";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      // Check if we already have a session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) return; // already signed in

      // Otherwise sign in silently
      const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Admin sign‑in failed:", error.message);
        return;
      }
      // When sign‑in completes, refetch the bookings query
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    })();
  }, [queryClient]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <BookingsTable />
    </div>
  );
};

export default AdminDashboard;