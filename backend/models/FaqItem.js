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
  },
  faqItemContent: {
    type: String,
    required: true,
    min: 1,
    max: 500,
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
  faqItemType: { type: String, enum: ["Question", "Answer"], required: true },
  faqItemDate: {
    type: Date,
    required: true,
  },
});

// MIDDLEWARE TO AUTO-GENERATE UNIQUE FAQITEMID AND FAQITEMDATE BEFORE SAVING
FaqItemSchema.pre("save", function (next) {
  // AUTO-GENERATE UNIQUE FAQITEMID
  if (!this.faqItemId) {
    this.faqItemId = uuidv4();
  }

  // AUTO-GENERATE FAQITEMDATE
  if (!this.faqItemDate) {
    this.faqItemDate = Date.now();
  }
  next();
});

// INSTANCE OF EVENT ENTITY
const FaqItem = mongoose.model("FaqItem", FaqItemSchema);
export default FaqItem;
