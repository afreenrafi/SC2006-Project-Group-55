import express from 'express';
import multer from "multer"; 
import { registerUser, loginUser } from '../controllers/users.js'; // Adjust path as necessary
const router = express.Router();

// Example route for user login
router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

// Example route for user registration
router.post('/register', registerUser);

export default router;
