import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
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
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cookie", cookieRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/admin", adminRoutes);

export { app };
