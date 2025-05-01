// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const BOOKINGS_FILE = path.join(__dirname, "bookings.json");

const requireToken: express.RequestHandler = (req, res, next) => {
  console.log("🛡️ Token received:", req.headers.authorization);
  const token = req.headers.authorization;
  if (token !== "Bearer my-admin-token") {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  next();
};

// GET /api/availability
app.get("/api/availability", (req: Request, res: Response) => {
  const date = req.query.date as string;
  const unavailable = ["2025-05-01", "2025-05-06"];
  const available = !unavailable.includes(date);
  res.json({ available });
});

// GET /api/bookings
app.get("/api/bookings", requireToken, (_req: Request, res: Response) => {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    res.json([]);
    return;
  }
  const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
  res.json(bookings);
});

// POST /api/bookings
app.post("/api/bookings", (req: Request, res: Response) => {
  const booking = {
    id: Date.now(),
    ...req.body,
    receivedAt: new Date().toISOString(),
  };

  const existingBookings = fs.existsSync(BOOKINGS_FILE)
    ? JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"))
    : [];

  existingBookings.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(existingBookings, null, 2));

  console.log("📬 Booking saved:", booking);
  res.json({ success: true, bookingId: booking.id });
});

app.listen(3001, () => {
  console.log("✅ Backend running at http://localhost:3001");
});