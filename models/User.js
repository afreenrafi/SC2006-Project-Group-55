//models/User.js
import mongoose from "mongoose";

/**
 * Schema for how users are stored
 * @property {string} username - unique to the account user, between 2-50 characters
 * @property {string} password - password with a minimum of 6 characters, at least 1 number and 1 special character
 * @property {string} email - unique email address
 * @property {date} dob - user's birthday to calculate their age
 * @property {string} role - user chooses between general public, organiser, and artist, default is general public
 * @property {string} stripeCustomerId - Stripe customer ID, generated and stored upon creation
 * @property {boolean} isVerifiedArtist - default is false, becomes true if the user is verified as an artist
 * @property {array} paymentMethods - list of Stripe payment method IDs for the user
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true, // Ensures no duplicate usernames
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v); // At least 1 number and 1 special character
      },
      message: (props) =>
        `${props.value} must contain at least one number and one special character!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address.",
    ],
  },
  dob: {
    type: Date,
    required: true, // Used to calculate age
  },
  role: {
    type: String,
    enum: ["General_Public", "Organiser", "Artist"],
    default: "General_Public",
    required: true,
  },
  stripeCustomerId: {
    type: String, // Stripe customer ID
    required: true, // This is generated by Stripe and stored
  },
  paymentMethods: [
    {
      type: String, // Stores Stripe PaymentMethod IDs
    },
  ],
  eventPermitID: {
    type: String, // Only for organisers
  },
  isVerifiedArtist: {
    type: Boolean,
    default: false, // Becomes true if the artist is verified
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Helper function to find or create a user by email
userSchema.statics.findOrCreate = async function (email, username) {
  let user = await this.findOne({ email });
  if (!user) {
    // If the user doesn't exist, create a new one
    user = await this.create({
      email,
      username,
      stripeCustomerId: "", // Stripe customer ID will be generated and updated later
    });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;