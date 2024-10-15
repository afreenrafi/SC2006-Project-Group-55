import express from 'express';
import multer from "multer"; 
const router = express.Router();

// Example route for user login
router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

// Example route for user registration
router.post('/register', (req, res) => {
    // Handle registration logic here
    res.send('Register route');
});

export default router;
