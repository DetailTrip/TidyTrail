// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import App from "@/App";
import { BookingProvider } from "@booking/context/BookingContext";

import "@/styles/global.css";

// Create the client instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BookingProvider>
          <App />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: "14px",
              },
            }}
          />
        </BookingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
