import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Sweet Shop Backend is running 🚀",
    status: "OK"
  });
});


import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import sweetRoutes from "./modules/sweets/sweet.routes";



app.use(
  cors({
    origin: "https://sweetfrontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop Backend is running! 🍬", status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
