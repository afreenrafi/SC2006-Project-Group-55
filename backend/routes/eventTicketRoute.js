// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  createEventTicket,
  getAllEventTickets,
  getEventTicketsById,
  updateEventTicket,
  deleteEventTicket,
} from "../controllers/eventTicketController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR EVENTTICKET ENTITY

// CREATE
router.post("/", createEventTicket);

// READ
router.get("/", getAllEventTickets);
router.get("/:eventTicketIds", getEventTicketsById); 


// UPDATE
router.put("/:eventTicketId", updateEventTicket);

// DELETE
router.delete("/:eventTicketId", deleteEventTicket); 

export default router;
