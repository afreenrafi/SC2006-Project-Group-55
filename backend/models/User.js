// IMPORT NECESSARY LIBRARIES
import mongoose from "mongoose";

// DATABASE SCHEMA FOR USER ENTITY
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 50,
    unique: true, // prevent duplicate username
  },

  password: {
    type: String,
    required: true,
    min: 6,
    validate: {
      validator: function (v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v);
      },
      message: (props) =>
        `${props.value} must contain at least one number and one special character!`,
    },
  },

  email: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address.",
    ],
  },

  dob: {
    type: Date,
    required: true,
  },

  role: {
    type: String,
    enum: ["General_Public", "Organiser", "Artist"],
    default: "General_Public",
    required: true,
  },

  eventPermitID: {
    type: String,
  },

  isVerifiedArtist: {
    type: Boolean,
    default: false,
  },
});

// INSTANCE OF EVENT ENTITY
const User = mongoose.model("User", UserSchema);
export default User;
