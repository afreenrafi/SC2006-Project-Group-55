// IMPORT NESCESSARY LIBRARIES
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

  if (eventEndDate < todayDate) {
    errors.push("End Date cannot be in the past!");
  }
  return errors;
}

// EVENTPRICE
function validateEventPrice(value) {
  const errors = [];
  if (value < 0) {
    errors.push("Event Price must be greater than or equal to 0.");
  }
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    errors.push(" Event Price must be rounded to 2 decimal places.");
  }
  return errors;
}

// DATABASE SCHEMA FOR EVENT ENTITY
const EventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  eventName: {
    type: String,
    required: true,
    min: 1,
    max: 100,
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
    min: 1,
    max: 500,
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
  eventPrice: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        const errors = validateEventPrice(value);
        return errors.length === 0;
      },
      message: function (props) {
        const errors = validateEventPrice(props.value);
        return errors.join("\n");
      },
    },
  },
});

// MIDDLEWARE TO AUTO-GENERATE UNIQUE EVENTID BEFORE SAVING
EventSchema.pre("save", function (next) {
  if (!this.eventId) {
    this.eventId = uuidv4();
  }
  next();
});

// INSTANCE OF EVENT ENTITY
const Event = mongoose.model("Event", EventSchema);
export default Event;
