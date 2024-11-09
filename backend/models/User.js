// IMPORT NECESSARY LIBRARIES
import mongoose from "mongoose";
import { validate } from "uuid";

// DISCRIMINATOR FOR USER ENTITY
const userOptions = { discriminatorKey: "userRole" };

// VALIDATION FUNCTIONS FOR USER ENTITY

// USERID
function validateUserId(value) {
  const errors = [];
  const valueTrimmed = value.trim();

  if (!/^(?=.*[0-9])/.test(valueTrimmed)) {
    errors.push("User Id must contain at least one digit!");
  }
  return errors;
}

// USERPASSWORD
function validateUserPassword(value) {
  const errors = [];
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const valueTrimmed = value.trim();

  if (!passwordRegex.test(valueTrimmed)) {
    errors.push("User Password must contain at least one digit!");
  }
  return errors;
}

// USEREMAIL
function validateUserEmail(value) {
  const errors = [];
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const valueTrimmed = value.trim();

  if (!emailRegex.test(valueTrimmed)) {
    errors.push("User Email is not valid!");
  }
  return errors;
}

// USERAGE
function validateUserAge(age) {
  const errors = [];
  const minAge = 13;
  const maxAge = 99;

  if (isNaN(age) || age < minAge || age > maxAge) {
    errors.push("User age must be between 13 and 99 years old!");
  }

  return errors;
}

// DATABASE SCHEMA FOR USER ENTITY
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 50,
      unique: true,
      validate: {
        validator: function (value) {
          const errors = validateUserId(value);
          return errors.length === 0;
        },
        message: function (props) {
          const errors = validateUserId(props.value);
          return errors.join("\n");
        },
      },
    },
    userName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    userPassword: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (value) {
          const errors = validateUserPassword(value);
          return errors.length === 0;
        },
        message: function (props) {
          const errors = validateUserPassword(props.value);
          return errors.join("\n");
        },
      },
    },
    userEmail: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const errors = validateUserEmail(value);
          return errors.length === 0;
        },
        message: function (props) {
          const errors = validateUserEmail(props.value);
          return errors.join("\n");
        },
      },
    },

    userAge: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Convert `value` to a number before validation
          const age = Number(value);
          if (isNaN(age)) return false; // Ensure value is numeric
          const errors = validateUserAge(age);
          return errors.length === 0;
        },
        message: function (props) {
          const age = Number(props.value);
          if (isNaN(age)) return "Age must be a number.";
          const errors = validateUserAge(age);
          return errors.join("\n");
        },
      },
    },
    userBookmark: [
      {
        type: String,
        default: null,
      },
    ],
    userRole: {
      type: String,
      required: true,
      enum: ["Public", "Organiser", "Artist"],
      default: "Public",
    },
    userStripeId: {
      type: String,
      default: null,
    },
    userPaymentMethods: [
      {
        type: String,
        default: null,
      },
    ],
    TicketBooked: {
      type: [String], // Array of strings to store bookingId values
      default: [],
    },
  },
  userOptions
);

// ADDITIONAL SCHEMA FOR ORGANISERS
const OrganiserSchema = new mongoose.Schema({
  organiserEventPermitId: {
    type: String,
    default: null,
  },
});

// ADDITIONAL SCHEMA FOR ARTISTS
const ArtistSchema = new mongoose.Schema({
  artistVerifiedBy: {
    type: String,
    ref: "User",
    default: null,
  },
});

// INSTANCE OF EVENT ENTITY
const User = mongoose.model("User", UserSchema);
const Organiser = User.discriminator("Organiser", OrganiserSchema);
const Artist = User.discriminator("Artist", ArtistSchema);
export { User, Organiser, Artist };
