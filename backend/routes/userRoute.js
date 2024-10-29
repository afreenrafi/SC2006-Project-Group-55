//routes/userRoutes.js
import express from "express";
import multer from "multer";
import {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import isAuth from "../middleware/authMiddleware.js";

// INSTANTIATE ROUTER
const router = express.Router();

// CONFIGURE MULTER FOR FILE UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // FOLDER WHERE FILES WILL BE SAVED
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // UNIQUE FILENAME
  },
});

const upload = multer({ storage: storage });


// DEFINE ROUTES FOR USER ENTITY

// CREATE
// router.post("/register", upload.single("eventPermitId"), createUser);
// Use the upload middleware in the registration route
router.post("/register", upload.single("eventPermitId"), async (req, res) => {
  const { userId, userName, userPassword, userEmail, userDob, userRole, organiserEventPermitId, artistVerified } = req.body;
  try {
    switch (userRole) {
      case "Public":
        createdUser = new User({
          userId: userId,
          userName: userName,
          userPassword: userPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
        });
        break;

      case "Organiser":
        createdUser = new Organiser({
          userId: userId,
          userName: userName,
          userPassword: userPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
          organiserEventPermitId: req.file ? req.file.path : null,
        });
        break;

      case "Artist":
        createdUser = new Artist({
          userId: userId,
          userName: userName,
          userPassword: userPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
          artistVerified: artistVerified,
        });
        break;
    }

    await createdUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// READ
// ENABLE THIS ONCE ISAUTH FROM AUTHMIDDLEWARE.JS IS WORKING FINE
// router.get("/all", isAuth, getAllUsers);
// router.get("/:userId", isAuth, getUserById);

router.get("/all", getAllUsers);
router.get("/:userId", getUserById);

// UPDATE
// ENABLE THIS ONCE ISAUTH FROM AUTHMIDDLEWARE.JS IS WORKING FINE
// router.put("/update/:userId", isAuth, updateUser);

router.put("/update/:userId", updateUser);

// DELETE
// ENABLE THIS ONCE ISAUTH FROM AUTHMIDDLEWARE.JS IS WORKING FINE
// router.delete("/delete/:userId", isAuth, deleteUser);

router.delete("/delete/:userId", deleteUser);

// LOGIN
router.post("/login", userLogin);


export default router;






// // Define other routes
// router.post("/login", loginUser);
// router.put("/update/:username", isAuth, updateUserProfile);
// router.delete("/delete/:username", isAuth, deleteUserAccount);


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
