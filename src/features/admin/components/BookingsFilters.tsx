import React from "react";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  frequency: string;
  setFrequency: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  referralOnly: boolean;
  setReferralOnly: (v: boolean) => void;
  onClear: () => void;
  onExport: () => void;
}

const BookingsFilters: React.FC<Props> = ({
  search,
  setSearch,
  frequency,
  setFrequency,
  date,
  setDate,
  referralOnly,
  setReferralOnly,
  onClear,
  onExport,
}) => (
  <div className="flex flex-wrap gap-3 mb-4 items-end">
    <input
      type="text"
      placeholder="Search name, email, or address"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded text-sm"
    />

    <select
      value={frequency}
      onChange={(e) => setFrequency(e.target.value)}
      className="border p-2 rounded text-sm"
    >
      <option value="">All Frequencies</option>
      <option value="weekly">Weekly</option>
      <option value="biweekly">Bi‑Weekly</option>
      <option value="twice">Twice/Week</option>
      <option value="onetime">One‑Time</option>
    </select>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border p-2 rounded text-sm"
    />

    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={referralOnly}
        onChange={(e) => setReferralOnly(e.target.checked)}
      />
      Referral Only
    </label>

    <button
      onClick={onClear}
      className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
    >
      Clear Filters
    </button>

    <button
      onClick={onExport}
      className="ml-auto text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
    >
      Export CSV
    </button>
  </div>
);

export default BookingsFilters;
