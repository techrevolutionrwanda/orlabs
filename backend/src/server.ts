import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recordRoutes from "./routes/record.routes.js";
import trustedByRoutes from "./routes/trustedBy.route.js";
import workRoutes from "./routes/work.routes.js";

let app = express();
dotenv.config();
connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// The store of the portal: the frontend reads the content of the website and
// writes what the portal saves from here.
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", database: "mongodb" });
});

app.use("/api", recordRoutes);

//routes
app.use("/trusted-by", trustedByRoutes);
app.use("/work", workRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
