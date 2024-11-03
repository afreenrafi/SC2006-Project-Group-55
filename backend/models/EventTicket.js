// IMPORT NESCESSARY LIBRARIES
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// VALIDATION FUNCTIONS FOR EVENTTICKET ENTITY

// EVENTTICKETQUANTITY
function validateEventTicketQuantity(value) {
  const errors = [];
  if (value < 1) {
    errors.push("Event Ticket Quantity must be greater than or equal to 1!");
  }
  if (!Number.isInteger(value)) {
    errors.push(" Event Ticket Quantity must be an integer!");
  }
  return errors;
}

// DATABASE SCHEMA FOR EVENTTICKET ENTITY
const EventTicketSchema = new mongoose.Schema({
  eventTicketId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  eventTicketType: {
    type: String,
    required: true,
    enum: ["Adult", "Child", "Senior Citizen", "VIP"],
  },
  eventTicketQuantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: function (value) {
        const errors = validateEventTicketSettingQuantity(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventTicketSettingQuantity(props.value);
        return errors.join("\n");
      },
    },
  },
  eventTicketQuantityBooked: {
    type: Number,
    default: 0,
  },
  eventId: {
    type: String,
    required: true,
    ref: "Event",
  },
});

// INSTANCE OF EVENTTICKET ENTITY
const EventTicket = mongoose.model("EventTicket", EventTicketSchema);
export default EventTicket;
