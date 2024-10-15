import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import auth from './middleware/auth.js';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
 // Ensure the correct path

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(helmet()); // Set various HTTP headers to improve security
app.use(morgan("common")); // HTTP request logger middleware
app.use(bodyParser.json({ limit: "10mb", extended: true })); // Parse incoming requests with JSON payloads with size limit
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Parse incoming requests with URL-encoded payloads with size limit
app.use(cors()); // Enable CORS for all routes

// API routes for user management and authentication
app.use("/api/authRoutes", authRoutes); // Handle authentication routes (login, register)
app.use("/api/userRoutes", userRoutes); // Handle user routes (update, delete)

// Mongoose setup
const PORT = process.env.PORT || 5000; // Default port

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
	})
	.catch((error) => console.log(`${error} did not connect`));

