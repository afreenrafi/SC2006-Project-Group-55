// IMPORT NECESSARY LIBRARIES
import express from "express";
import multer from "multer";
import { createUser, userLogin } from "../controllers/userController.js"; // Adjust path as necessary

//  INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR USER ENTITY (AUTHENTICATION)
router.get('/profile', isAuth, (req, res) => {
    res.status(200).json({message: "Access granted.", userId: req.userId}); 
}); //Importing the session token for userId 

router.post("/register", createUser);
router.post("/login", userLogin);

export default router;
