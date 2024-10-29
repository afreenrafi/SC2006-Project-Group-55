// BUSINESS LOGIC FOR USER ENTITY (CRUD)
// IMPORT NECESSARY LIBRARIES
import { User, Organiser, Artist } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CREATING NEW USER OBJECT
export const createUser = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEUSER
    const {
      userId,
      userName,
      userPassword,
      userEmail,
      userDob,
      userRole,
      organiserEventPermitId,
      artistVerified,
    } = req.body;

    // CHECKS IF EXISTING USERS IN DATABASE HAVE THE SAME USERID AS NEW USER
    const existingUser = await User.findOne({ userId: userId });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Id has already been taken!" });
    }

    // HASH USERPASSWORD FOR ADDITIONAL SECURITY
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    // INSTANTIATING NEW USER OBJECT
    let createdUser = null;

    switch (userRole) {
      case "Public":
        createdUser = new User({
          userId: userId,
          userName: userName,
          userPassword: hashedPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
        });
        break;

      case "Organiser":
        createdUser = new Organiser({
          userId: userId,
          userName: userName,
          userPassword: hashedPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
          organiserEventPermitId: organiserEventPermitId,
        });
        break;

      case "Artist":
        createdUser = new Artist({
          userId: userId,
          userName: userName,
          userPassword: hashedPassword,
          userEmail: userEmail,
          userDob: userDob,
          userRole: userRole,
          artistVerified: artistVerified,
        });
        break;
    }

    // SAVE NEW USER OBJECT TO DATABASE
    await createdUser.save();

    res.status(201).json({ message: "Successfully created new User!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING ALL USER OBJECTS FROM DATABASE
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC USER OBJECT FROM DATABASE USING USERID
export const getUserById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETUSERBYID
    const { userId } = req.params;

    // CHECKS IF EXISTING USERS IN DATABASE HAVE THE SAME USERID AS USER LOGGING IN
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// UPDATING USER OBJECT FROM DATABASE
export const updateUser = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION UPDATEUSER
    const { userId } = req.params;
    const { userName, userPassword, userEmail } = req.body;

    // RETRIEVE CURRENT USER OBJECT FROM DATABASE
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // UPDATES EACH USER OBJECT ATTRIBUTE RESPECTIVELY, IF PROVIDED
    if (userName) user.userName = userName;
    if (userEmail) user.userEmail = userEmail;
    if (userPassword) {
      user.userPassword = await bcrypt.hash(userPassword, 10);
    }

    // SAVE UPDATED USER OBJECT TO DATABASE
    await user.save();

    res.status(200).json({ message: "User profile updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// DELETING USER OBJECT FROM DATABASE
export const deleteUser = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION DELETEUSER
    const { userId } = req.params;

    // RETRIEVE CURRENT USER OBJECT FROM DATABASE
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // DELETE USER OBJECT FROM DATABASE
    await user.remove();

    res.status(200).json({ message: "User account deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// LOGIN VALIDATION OF USER OBJECT
export const userLogin = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETUSER
    const { userId, userPassword } = req.body;

    // CHECKS IF EXISTING USERS IN DATABASE HAVE THE SAME USERID AS USER LOGGING IN
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // CHECKS IF USERPASSWORD MATCHES USERPASSWORD ASSOCIATED WITH USERID
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // GENERATE SESSION TOKEN (JWT)
    const sessionToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful!", sessionToken: sessionToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// const verifyArtist = async (organizerId, artistUsername) => {
//     try {
//         // Find the organizer by ID
//         const organizer = await User.findById(organizerId);
//         if (!organizer || organizer.role !== 'organizer') {
//             throw new Error('Only organizers can verify artists.');
//         }

//         // Find the artist by username
//         const artist = await User.findOne({ username: artistUsername });
//         if (!artist) {
//             return { success: false, message: 'Artist not found.' };
//         }

//         // Check if the user is already a verified artist
//         if (artist.role === 'artist' && artist.isVerifiedArtist) {
//             return { success: false, message: 'Artist is already verified.' };
//         }

//         // Update the artist status to verified
//         artist.role = 'artist';
//         artist.isVerifiedArtist = true;
//         await artist.save();

//         return { success: true, message: 'Artist successfully verified.' };
//     } catch (error) {
//         console.error(error);
//         return { success: false, message: error.message };
//     }
// };

// Export each function using named exports
