import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import sweetRoutes from "./modules/sweets/sweet.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
