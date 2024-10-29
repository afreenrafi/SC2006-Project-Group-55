// IMPORT NECESSARY LIBRARIES
import express from "express";
import multer from "multer";
import { createUser, userLogin } from "../controllers/userController.js"; // Adjust path as necessary

//  INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR USER ENTITY (AUTHENTICATION)
router.post("/register", createUser);
router.post("/login", userLogin);

export default router;
