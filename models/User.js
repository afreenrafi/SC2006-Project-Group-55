import mongoose from "mongoose";

/**
 * Schema that how users are stored 
 * @property {string} username - username unique to the account user that is between 2-50 characters
 * @property {string} password - password of the account user of minimum 6 characters with at least 1 number and 1 special character
 * @property {string} email - unique email address
 * @property {date} dateofbirth - user's birthday to find their age (current year - year of birth)
 * @property {string} role - user chooses between general public and organiser with general public being default
 * @todo we want a pfp?
 */ 
const UserSchema = new mongoose.Schema(
  {

    username:{
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
        validator: function (v){
            return /^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v);
        },
        message: props => `${props.value} must contain at least one number and one special character!`,
      },
    },

    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address.', 
        ], 
    }, 

    dob: {
        type: Date, 
        required: true, 
    }, 

    role: {
        type: String, 
        enum: ['General_Public', 'Organiser', 'Artist'],
        default: 'General_Public',  
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

const User = mongoose.model("User", UserSchema);
export default User;