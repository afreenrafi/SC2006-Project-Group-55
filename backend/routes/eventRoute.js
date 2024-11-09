// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
  bookmarkEvent,
} from "../controllers/eventController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR EVENT ENTITY

// CREATE
router.post("/", createEvent);

// READ
router.get("/", getAllEvents);
router.get("/search", searchEvents);
router.get("/:eventId", getEventById);

// UPDATE
router.put("/:eventId", updateEvent);

// DELETE
router.delete("/:eventId", deleteEvent);

// BOOKMARK / UNBOOKMARK EVENT FOR USER
router.put("/bookmark/:userId/:eventId", bookmarkEvent);

export default router;
