// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByName,
} from "../controllers/eventController.js";


// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR EVENT ENTITY

// CREATE
// router.post("/createEvent", createEvent); // POST /api/eventRoute/createEvent - Create a new event
router.post("/", createEvent); // POST /api/eventRoute/ - Create a new event

// READ
// router.get("/readEvent", getAllEvents); // GET /api/eventRoute/readEvent - Get all events
// router.get("/readEvent/:id", getEventById); // GET /api/eventRoute/readEvent/:id - Get event by eventId
// router.get("/searchEvent", getEventByName); // GET /api/eventRoute/searchEvent?PARAMETER= - Get event by PARAMETER (PARTIAL / FULL)
router.get("/", getAllEvents); // GET /api/eventRoute/ - Get all events
router.get("/search", getEventByName); // GET /api/eventRoute/search?parameter= - Get event by PARAMETER (PARTIAL / FULL)
router.get("/:id", getEventById); // GET /api/eventRoute/:id - Get event by eventId


// UPDATE
// router.put("/updateEvent/:id", updateEvent); // PUT /api/eventRoute/updateEvent/:id - Update an event
router.put("/:id", updateEvent); // PUT /api/eventRoute/:id - Update an event

// DELETE
// router.delete("/deleteEvent/:id", deleteEvent); // DELETE /api/eventRoute/deleteEvent/:id - Delete an event
router.delete("/:id", deleteEvent); // DELETE /api/eventRoute/:id - Delete an event

export default router;
