//// controllers/users.js
import User from "../models/User.js"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 


//register function
export const registerUser = async (req, res) => {
    try{
        const {username, password, email, dob, role} = req.body; 

        const existingUser = await User.findOne({username}); 
        if(existingUser){
            return res.status(400).json({message : "Username already taken!"}); 
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUser = new User({
            username, 
            password: hashedPassword, 
            email, 
            dob, 
            role,
        });

        await newUser.save(); 
        res.status(201).json({message: "You are now registered on Cultivate!"}); 
    } catch(error){
        res.status(500).json({message: "Server error :("}); 
    }
};


//login function
export const loginUser = async(req, res) => {
    try{
        const {username, password} = req.body; 

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "User not found."}); 
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials."}); 
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h", 
        }); 

        res.status(200).json({message: "Login successful!", token});
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server error :("}); 
    }
}; 


//update account function
export const updateUserProfile = async (req, res) => {
    try{
        const {username} = req.params; 
        const {name, email, password} = req.body; 

        const user = await User.findOne({username}); 

        if(!user){
            return res.status(404).json({message: "User not found."}); 
        }

        if (name) user.name = name; 
        if (email) user.email = email; 
        if (password){
            user.password = await bcrypt.hash(password, 10); 
        }

        await user.save(); 

        res.status(200).json({message: "Profile updated successfully!"}); 
    } catch(error){
        console.error(error); 
        res.status(500).json({message: "Server error :("}); 
    }
}; 


//delete account function
export const deleteUserAccount = async (req, res) => {
    try{
        const {username} = req.params; 

        const user = await User.findOne({username}); 

        if(!user){
            return res.status(404).json({message: "User not found."}); 
        }

        await user.remove(); 
        res.status(200).json({message: "Account deleted successfully."}); 
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server error :("}); 
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


