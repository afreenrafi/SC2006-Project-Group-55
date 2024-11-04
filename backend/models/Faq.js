// IMPORT NECESSARY LIBRARIES
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// DATABASE SCHEMA FOR FAQ ENTITY
const FaqSchema = new mongoose.Schema({
  faqId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  faqQuestion: {
    type: String,
    required: true,
    ref: "FaqItem",
  },
  faqAnswer: {
    type: String,
    ref: "FaqItem",
    default: null,
  },
  eventId: {
    type: String,
    required: true,
    ref: "Event",
  },
});

// INSTANCE OF EVENT ENTITY
const Faq = mongoose.model("Faq", FaqSchema);
export default Faq;
