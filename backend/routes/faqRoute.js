// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  createFaqItemQuestionAndFaq,
  createFaqItemAnswer,
  getAllFaqItems,
  getAllFaqs,
  getFaqItemById,
  getFaqById,
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
router.get("/faq/:faqId", getFaqById);
router.get('/profile', isAuth, (req, res) => {
  res.status(200).json({message: "Access granted.", userId: req.userId}); 
}); //Importing the session token for userId 

// UPDATE
router.put("/faqitem/:faqItemId", updateFaqItem);

// DELETE
router.delete("/faqitem/:faqItemId", deleteFaqItem);


export default router;
