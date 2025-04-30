// src/features/booking/components/steps/CustomerForm.tsx
import React, { useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";

const CustomerForm: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();

  const [name, setName] = useState(bookingData.name || "");
  const [phone, setPhone] = useState(bookingData.phone || "");
  const [email, setEmail] = useState(bookingData.email || "");
  const [address, setAddress] = useState(bookingData.address || "");

  const isFormValid = name && phone && email && address;

  const handleContinue = () => {
    if (isFormValid) {
      updateBooking({ name, phone, email, address });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-tidy-green">Your Details</h2>

      <p className="text-center text-sm text-gray-600">
        We’ll use this to confirm your booking and keep you updated.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(705) 555-1234"
            required
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Maple Street, Timmins"
            required
            className="w-full border p-3 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!isFormValid}
        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        Continue
      </button>
    </div>
  );
};

export default CustomerForm;