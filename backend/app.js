// IMPORT NECESSARY LIBRARIES
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// IMPORT NECESSARY ROUTES
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import faqRoute from "./routes/faqRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD ENVIRONMENT VARIABLES
dotenv.config();

const app = express();

// MIDDLEWARE

// PARSE INCOMING REQUESTS WITH JSON PAYLOADS
app.use(express.json());

// ADD SECURITY HEADERS TO APPLICATION
app.use(helmet());

// LOG HTTP REQUESTS FOR DEBUGGING PURPOSES
app.use(morgan("common"));

// HANDLE INCOMING JSON REQUESTS WITH SIZE LIMIT OF 10MB
app.use(bodyParser.json({ limit: "10mb", extended: true }));

// HANDLE INCOMING URL-ENCODED REQUESTS
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// ALLOW CROSS-ORIGIN REQUESTS
// ESSENTIAL FOR APIS ACCESSED BY FRONTENDS HOSTED ON DIFFERENT DOMAINS
app.use(cors());

// API ROUTES FOR USER MANAGEMENT AND AUTHENTICATION

// HANDLE USER ROUTES (CRUD)
app.use("/api/authRoute", authRoute);
app.use("/api/userRoute", userRoute);

// HANDLE EVENT ROUTES (CRUD)
app.use("/api/eventRoute", eventRoute);

// HANDLE EVENT ROUTES (CRUD)
app.use("/api/faqRoute", faqRoute);

// HANDLE BOOKING ROUTES (C)
app.use("/api/bookingRoute", bookingRoute);

// MONGOOSE SETUP

// DEFAULT PORT
const PORT = process.env.PORT || 5000;

// SET UP MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
