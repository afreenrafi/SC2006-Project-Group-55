// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";


// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR EVENT ENTITY
router.get("/", getAllEvents); // GET /api/events - Get all events
router.get("/:id", getEventById); // GET /api/events/:id - Get event by ID
router.post("/", createEvent); // POST /api/events - Create a new event
router.put("/:id", updateEvent); // PUT /api/events/:id - Update an event
router.delete("/:id", deleteEvent); // DELETE /api/events/:id - Delete an event

export default router;
