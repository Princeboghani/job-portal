import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWbhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {clerkMiddleware} from "@clerk/express";

//initiallize express
const app = express();

//connect db
await connectDB();
await connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//routes
app.get("/", (req, res) => res.send("api is working not working thats"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWbhooks)
app.use("/api/company",companyRoutes)
app.use("/api/jobs",jobRoutes)
app.use("/api/users", userRoutes);

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`server is running port http://localhost:${PORT}`);
});
