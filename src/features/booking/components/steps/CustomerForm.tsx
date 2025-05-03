// src/features/booking/components/steps/CustomerForm.tsx
import React, { useState, useEffect } from "react";
import { useBookingContext } from "@booking/context/BookingContext";

const CustomerForm: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const [name, setName] = useState(bookingData.name || "");
  const [phone, setPhone] = useState(bookingData.phone || "");
  const [email, setEmail] = useState(bookingData.email || "");
  const [address, setAddress] = useState(bookingData.address || "");

  useEffect(() => {
    updateBooking({ name, phone, email, address });
  }, [name, phone, email, address]);

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
            className="w-full border p-3 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;