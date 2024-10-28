// IMPORT NESCESSARY LIBRARIES
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 

// DATABASE SCHEMA FOR FAQ ENTITY
const FaqSchema = new mongoose.Schema({
  faqId: {
    type: String,
    required: true,
    unique: true,
  },
  faqQuestion: {
    type: String,
    ref: "FaqItem",
    required: true,
  },
  faqAnswer: {
    type: String,
    ref: "FaqItem",
    required: false,
  },
  eventId: {
    type: String,
    ref: "Event",
    required: true,
  },
});

// MIDDLEWARE TO AUTO-GENERATE UNIQUE FAQID BEFORE SAVING
FaqSchema.pre("save", function (next) {
  // AUTO-GENERATE UNIQUE FAQID
  if (!this.faqId) {
    this.faqId = uuidv4();
  }
  next();
});

// INSTANCE OF EVENT ENTITY
const Faq = mongoose.model("Faq", FaqSchema);
export default Faq;
