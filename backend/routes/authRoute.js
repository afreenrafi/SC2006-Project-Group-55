// IMPORT NECESSARY LIBRARIES
import express from "express";
import multer from "multer";
import { registerUser, loginUser } from "../controllers/userController.js"; // Adjust path as necessary

//  INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR USER ENTITY (AUTHENTICATION)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
