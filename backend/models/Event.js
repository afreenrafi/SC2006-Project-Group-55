// IMPORT NECESSARY LIBRARIES
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// VALIDATION FUNCTIONS FOR EVENT ENTITY

// EVENTNAME & EVENTDESCRIPTION
function validateEventNameDescription(value) {
  const errors = [];
  if (value.trim().length === 0) {
    errors.push("Cannot consist of only whitespaces!");
  }
  return errors;
}

// EVENTLOCATION
function validateEventLocation(value) {
  const errors = [];
  if (value.trim().length === 0) {
    errors.push("Cannot consist of only whitespaces!");
  }
  return errors;
}

// EVENTSTARTDATE
function validateEventStartDate(eventStartDate) {
  const errors = [];
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  if (eventStartDate < todayDate) {
    errors.push("Start Date cannot be in the past!");
  }
  return errors;
}

// EVENTENDDATE
function validateEventEndDate(eventEndDate, eventStartDate) {
  const errors = [];
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  if (eventEndDate < eventStartDate) {
    errors.push("End Date must be greater than or equal to the Start Date!");
  }

  return errors;
}

// DATABASE SCHEMA FOR EVENT ENTITY
const EventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  eventName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
    validate: {
      validator: function (value) {
        const errors = validateEventNameDescription(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventNameDescription(props.value);
        return errors.join("\n");
      },
    },
  },
  eventDescription: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
    validate: {
      validator: function (value) {
        const errors = validateEventNameDescription(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventNameDescription(props.value);
        return errors.join("\n");
      },
    },
  },
  eventGenre: {
    type: String,
    required: true,
    enum: ["All", "Museums", "Exhibitions", "Performances", "Festivals"],
  },
  eventLocation: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
    validate: {
      validator: function (value) {
        const errors = validateEventLocation(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventLocation(props.value);
        return errors.join("\n");
      },
    },
  },
  eventType: {
    type: String,
    required: true,
    enum: ["Free", "Chargeable"],
  },
  eventStartDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const errors = validateEventStartDate(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventStartDate(props.value);
        return errors.join("\n");
      },
    },
  },
  eventEndDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const errors = validateEventEndDate(value, this.eventStartDate);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventEndDate(props.value, this.eventStartDate);
        return errors.join("\n");
      },
    },
  },
  eventOpen: {
    type: Date,
    required: true,
  },
  eventClose: {
    type: Date,
    required: true,
  },
  eventTicket: [
    {
      type: String,
      ref: "EventTicket",
      default: null,
    },
  ],
  eventArtist: [
    {
      type: String,
      required: true,
      ref: "User",
      default: null,
    },
  ],
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
});

// INSTANCE OF EVENT ENTITY
const Event = mongoose.model("Event", EventSchema);
export default Event;
