// src/features/admin/components/BookingsTable.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { supabase } from "@utils/supabaseClient";
import BookingsFilters from "./BookingsFilters";

// tiny flag so we can confirm build in console
// @ts-ignore
window.__TIDYTRAILS_TABLE_CHECK__ = "status-inline-final";

/** Booking row shape */
interface Booking {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  unit?: string;
  city?: string;
  specialInstructions?: string;
  preferredContact?: string;
  bestTime?: string;
  dogNames?: string;
  marketingOptIn?: boolean;
  frequency?: string;
  dogCount?: number;
  wasteLevel?: string;
  areas?: string;
  addOns?: string;
  referralCode?: string;
  firstServiceDate?: string;
  totalPrice?: number;
  status?: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  "Scheduled",
  "In-Progress",
  "Completed",
  "Cancelled",
];

const BookingsTable: React.FC = () => {
  /* ---------------- local state ---------------- */
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState("");
  const [referralOnly, setReferralOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  /* ---------------- fetch on mount ---------------- */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else {
        const normalised: Booking[] = (data ?? []).map((b: any) => ({
          id: b.id,
          firstName: b.first_name,
          lastName: b.last_name,
          email: b.email,
          phone: b.phone,
          address: b.address,
          unit: b.unit,
          city: b.city,
          specialInstructions: b.special_instructions,
          preferredContact: b.preferred_contact,
          bestTime: b.best_time,
          dogNames: b.dog_names,
          marketingOptIn: b.marketing_opt_in,
          frequency: b.frequency,
          dogCount: b.dog_count,
          wasteLevel: b.waste_level,
          areas: b.areas,
          addOns: b.add_ons,
          referralCode: b.referral_code,
          firstServiceDate: b.first_service_date,
          totalPrice: b.total_price,
          status: b.status ?? "Scheduled",
          createdAt: b.created_at,
        }));
        setRows(normalised);
      }
      setLoading(false);
    })();
  }, []);

  /* ---------------- filters ---------------- */
  const filtered = useMemo(() => {
    return rows.filter((b) => {
      const matchesSearch =
        !search.trim() ||
        [b.firstName, b.lastName, b.email, b.address].some((f) =>
          f?.toLowerCase().includes(search.toLowerCase())
        );
      const matchesFrequency = !frequencyFilter || b.frequency === frequencyFilter;
      const matchesReferral = !referralOnly || !!b.referralCode;
      const matchesDate =
        !dateFilter || new Date(b.firstServiceDate ?? "") >= new Date(dateFilter);
      return matchesSearch && matchesFrequency && matchesReferral && matchesDate;
    });
  }, [rows, search, frequencyFilter, referralOnly, dateFilter]);

  /* ---------------- column defs ---------------- */
  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Street Address" },
      { accessorKey: "unit", header: "Unit" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "specialInstructions", header: "Notes" },
      { accessorKey: "preferredContact", header: "Preferred Contact" },
      { accessorKey: "bestTime", header: "Best Time" },
      { accessorKey: "dogNames", header: "Dog's Names" },
      {
        accessorKey: "marketingOptIn",
        header: "Marketing Opt-In",
        cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
      },
      { accessorKey: "frequency", header: "Frequency" },
      { accessorKey: "dogCount", header: "Dogs" },
      { accessorKey: "wasteLevel", header: "Waste Level" },
      { accessorKey: "areas", header: "Areas" },
      { accessorKey: "addOns", header: "Add-Ons" },
      { accessorKey: "referralCode", header: "Referral" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row, getValue }) => {
          const current = (getValue() as string) ?? "Scheduled";
          const id = row.original.id;
          return (
            <select
              className="border rounded px-1 py-0.5 text-xs"
              value={current}
              onChange={async (e) => {
                const newStatus = e.target.value;
                setRows((prev) =>
                  prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
                );
                await supabase
                  .from("bookings")
                  .update({ status: newStatus })
                  .eq("id", id);
              }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        },
      },
      {
        accessorKey: "totalPrice",
        header: "Total",
        cell: (info) =>
          typeof info.getValue() === "number"
            ? `$${(info.getValue() as number).toFixed(2)}`
            : "—",
      },
      {
        accessorKey: "firstServiceDate",
        header: "First Service",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString("en-CA"),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString("en-CA"),
      },
    ],
    []
  );

  /* ---------------- table instance ---------------- */
  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  /* ---------------- csv export ---------------- */
  const exportCSV = () => {
    const header = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Street Address",
      "Unit",
      "City",
      "Notes",
      "Preferred Contact",
      "Best Time",
      "Dog's Names",
      "Marketing Opt-In",
      "Frequency",
      "Dogs",
      "Waste Level",
      "Areas",
      "Add-Ons",
      "Referral",
      "Status",
      "First Service",
      "Total",
      "Created At",
    ].join(",");

    const rowsCsv = filtered.map((b) =>
      [
        b.firstName,
        b.lastName,
        b.email,
        b.phone,
        b.address,
        b.unit,
        b.city,
        b.specialInstructions,
        b.preferredContact,
        b.bestTime,
        b.dogNames,
        b.marketingOptIn ? "Yes" : "No",
        b.frequency,
        b.dogCount,
        b.wasteLevel,
        b.areas,
        b.addOns,
        b.referralCode,
        b.status,
        b.firstServiceDate,
        b.totalPrice,
        b.createdAt,
      ]
        .map((v = "") => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [header, ...rowsCsv].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "tidytrails-bookings.csv",
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading bookings…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  /* ---------------- render ---------------- */
  return (
    <div className="overflow-x-auto mt-4">
      <BookingsFilters
        search={search}
        setSearch={setSearch}
        frequency={frequencyFilter}
        setFrequency={setFrequencyFilter}
        date={dateFilter}
        setDate={setDateFilter}
        referralOnly={referralOnly}
        setReferralOnly={setReferralOnly}
        onClear={() => {
          setSearch("");
          setFrequencyFilter("");
          setReferralOnly(false);
          setDateFilter("");
        }}
        onExport={exportCSV}
      />

      <p className="text-sm text-gray-600 mb-2">
        Showing {filtered.length} of {rows.length} bookings
      </p>

      <table className="w-full text-sm border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-left">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="p-2 cursor-pointer select-none"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === "asc" && " ▲"}
                  {h.column.getIsSorted() === "desc" && " ▼"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination controls */}
      <div className="flex items-center justify-end gap-2 mt-2 text-sm">
        <button
          className="px-2 py-0.5 border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <span>
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="px-2 py-0.5 border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingsTable;
