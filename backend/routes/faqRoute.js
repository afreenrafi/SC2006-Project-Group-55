// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  createFaqItemQuestionAndFaq,
  createFaqItemAnswer,
  getAllFaqItems,
  getAllFaqs,
  getFaqItemById,
  getFaqById,
  getFaqByEventId,
  updateFaqItem,
  deleteFaqItem,
} from "../controllers/faqController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR BOTH FAQITEM ENTITY AND FAQ ENTITY
// CREATE
router.post("/faqitemfaq", createFaqItemQuestionAndFaq);
router.post("/faqitem", createFaqItemAnswer);

// READ
router.get("/faqitem", getAllFaqItems);
router.get("/faq", getAllFaqs);
router.get("/faqitem/:faqItemId", getFaqItemById);
router.get("/faq/event/:eventId", getFaqByEventId);
router.get("/faq/:faqId", getFaqById);


// UPDATE
router.put("/faqitem/:faqItemId", updateFaqItem);

// DELETE
router.delete("/faqitem/:faqItemId", deleteFaqItem);


export default router;
