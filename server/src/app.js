import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Health Check Route
app.get("/api/health", async (req, res) => {
  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,

    database: dbState === 1 ? "connected" : "disconnected",

    uptime: process.uptime(),

    memoryUsage: process.memoryUsage(),

    timestamp: new Date(),
  });
});

import authRoutes from "./routes/auth.routes.js";
import cookieRoutes from "./routes/cookie.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cookie", cookieRoutes);

export { app };
