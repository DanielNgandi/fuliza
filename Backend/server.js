import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./Router/paymentRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Routes
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("M-Pesa API Running 🚀");
});

// Error handler (important)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("SHORTCODE:", process.env.SHORTCODE);
console.log("PASSKEY LENGTH:", process.env.PASSKEY?.length);
//console.log("TOKEN EXISTS:", !!token);

// Graceful shutdown (important with Prisma)
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  server.close();
  process.exit(0);
});