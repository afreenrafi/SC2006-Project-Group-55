//routes/userRoutes.js
import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/userController.js";
import isAuth from "../middleware/auth.js";
import User from "../models/User.js";

// INSTANTIATE ROUTER
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// Create the upload instance
const upload = multer({ storage: storage });

// Use the upload middleware in the registration route
router.post("/register", upload.single("eventPermitId"), async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Create a new user
    const newUser = new User({
      username,
      password,
      role,
      eventPermitId: req.file ? req.file.path : null, // Store the file path if uploaded
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Define other routes
router.post("/login", loginUser);
router.put("/update/:username", isAuth, updateUserProfile);
router.delete("/delete/:username", isAuth, deleteUserAccount);

// Export the router
export default router;

// router.post('/verify-artist', isAuth, async (req, res) => {
//     const { artistUsername } = req.body;
//     const organizerId = req.user.id; // Assume req.user contains authenticated user info

//     const result = await verifyArtist(organizerId, artistUsername);

//     if (result.success) {
//         return res.status(200).json({ message: result.message });
//     } else {
//         return res.status(400).json({ message: result.message });
//     }
// });
