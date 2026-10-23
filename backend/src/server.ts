import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import trustedByRoutes from "./routes/trustedBy.route.js";
import workRoutes from "./routes/work.routes.js";
import founderRoutes from "./routes/founder.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { seedAdminAccount } from "./controllers/auth.controller.js";

const app = express();
dotenv.config();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//routes
app.use("/trusted-by", trustedByRoutes);
app.use("/work", workRoutes);
app.use("/founders", founderRoutes);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await seedAdminAccount();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});