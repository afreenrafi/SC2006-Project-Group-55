// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  createFaqItemQuestionAndFaq,
  createFaqItemAnswer,
  getAllFaqItems,
  getFaqItemById,
  updateFaqItem,
  deleteFaqItem,
  deleteFaqItemsAndFaq,
} from "../controllers/faqController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR BOTH FAQITEM ENTITY AND FAQ ENTITY
// CREATE
router.post("/faqitemfaq", createFaqItemQuestionAndFaq); // POST /api/faqRoute/faqitemfaq - Create a question faqitem and faq

// DEFINE ROUTES FOR FAQITEM ENTITY
// CREATE
router.post("/faqitem", createFaqItemAnswer); // POST /api/faqRoute/faqitem - Add an answer faqitem to an existing faq

// READ
router.get("/faqitem", getAllFaqItems); // GET /api/faqRoute/faqitem - Get all faqitems
router.get("/faqitem/:id", getFaqItemById); // GET /api/faqRoute/:id - Get faqitem by faqItemId

// UPDATE
router.put("/faqitem/:id", updateFaqItem); // PUT /api/faqRoute/faqitem/:id - Update faqitem by faqItemId

// DELETE
router.delete("/faqitem/:id", deleteFaqItem); // DELETE /api/faqRoute/faqitem/:id - Delete faqitem by faqItemId

// DEFINE ROUTES FOR FAQ ENTITY
// DELETE
// router.delete("/faq/:id", deleteFaqItemsAndFaq); // DELETE /api/faqRoute/:fagId - Delete faq and associated faqitems
export default router;
