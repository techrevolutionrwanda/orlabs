import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import trustedByRoutes from "./routes/trustedBy.route.js";
import workRoutes from "./routes/work.routes.js";
import founderRoutes from "./routes/founder.routes.js";

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

//routes
app.use("/trusted-by", trustedByRoutes);
app.use("/work", workRoutes);
app.use("/founders", founderRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});