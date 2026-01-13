import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import gigRoutes from "./routes/gigs.js";
import bidRoutes from "./routes/bids.js";
import { initSocket } from "./socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "GigFlow API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
