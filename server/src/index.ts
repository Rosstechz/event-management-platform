import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./lib/db";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import blogRoutes from "./routes/blogRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

//DB connection
connectDb();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/blogs", blogRoutes);

//test route
app.get("/api/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, Express with TypeScript!" });
});

//Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error:", err.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
