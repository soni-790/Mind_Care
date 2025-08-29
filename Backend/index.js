// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";
import meditationRoutes from "./routes/meditations.routes.js";
import resourceRoutes from "./routes/resources.routes.js";

dotenv.config(); 
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
   origin: "http://localhost:5173"
   
   }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("MindCare API is running 🚀");
});

app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/resources", resourceRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
