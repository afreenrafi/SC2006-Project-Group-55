// IMPORT NESCESSARY LIBRARIES
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// VALIDATION FUNCTIONS FOR FAQITEM ENTITY

// FAQCONTENT
function validateFaqContent(value) {
  const errors = [];
  if (value.trim().length === 0) {
    errors.push("Cannot consist of only whitespaces!");
  }
  return errors;
}

// DATABASE SCHEMA FOR FAQITEM ENTITY
const FaqItemSchema = new mongoose.Schema({
  faqItemId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  faqItemContent: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
    validate: {
      validator: function (value) {
        const errors = validateFaqContent(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateFaqContent(props.value);
        return errors.join("\n");
      },
    },
  },
  faqItemType: {
    type: String,
    required: true,
    enum: ["Question", "Answer"],
  },
  faqItemDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId:{
    type:String,
    required:true,
    ref: "User"
  }
});

// INSTANCE OF EVENT ENTITY
const FaqItem = mongoose.model("FaqItem", FaqItemSchema);
export default FaqItem;
