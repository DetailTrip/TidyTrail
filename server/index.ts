// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/availability
app.get("/api/availability", (req: Request, res: Response) => {
  const date = req.query.date as string;
  const unavailable = ["2025-05-01", "2025-05-06"];
  const available = !unavailable.includes(date);
  res.json({ available });
});

// POST /api/bookings
app.post("/api/bookings", (req: Request, res: Response) => {
  console.log("📬 Booking received:", req.body);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("✅ Backend running at http://localhost:3001");
});
