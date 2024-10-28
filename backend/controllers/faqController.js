// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import Event from "../models/Event.js";
import Faq from "../models/Faq.js";
import FaqItem from "../models/FaqItem.js";
import { v4 as uuidv4 } from "uuid";

// CREATING NEW INSTANCE OF FAQITEM (QUESTION) ENTITY and FAQ ENTITY (WHEN SUBMITTING A QUESTION)
export const createFaqItemQuestionAndFaq = async (req, res) => {
  const { faqItemContent, eventId, userId } = req.body;

  try {
    // CHECKING IF EVENTID EXISTS IN EVENT COLLECTION
    const event = await Event.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    // 1. CREATING NEW INSTANCE OF FAQITEM (QUESTION) ENTITY
    const newFaqItemQuestion = new FaqItem({
      faqItemContent,
      // userId,
      faqItemDate: Date.now(),
      faqItemType: "Question",
      faqItemId: uuidv4(), // Generate a unique ID for the faqitem
    });
    const savedFaqItemQuestion = await newFaqItemQuestion.save(); // Save the new faqitem in the database

    // 2. CREATING NEW INSTANCE OF FAQ ENTITY WITH FAQITEM INSTANCE REFERENCE AND LINK IT TO EVENT ENTITY INSTANCE
    const newFaq = new Faq({
      faqQuestion: savedFaqItemQuestion.faqItemId,
      faqAnswer: null,
      eventId,
      faqId: uuidv4(), // Generate a unique ID for the faq
    });
    const savedFaq = await newFaq.save(); // Save the new faq in the database

    res.status(201).json({ faqItem: savedFaqItemQuestion, faq: savedFaq });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

// CREATING NEW INSTANCE OF FAQITEM (ANSWER) ENTITY TO ADD TO EXISTING FAQ (SUBMITTING AN ANSWER)
export const createFaqItemAnswer = async (req, res) => {
  const { faqItemContent, faqId, userId } = req.body;

  try {
    // CHECKING IF FAQID EXISTS IN FAQ COLLECTION
    const faq = await Faq.findOne({ faqId: faqId });
    if (!faq) return res.status(404).json({ message: "Faq not found!" });

    // 1. CREATING NEW INSTANCE OF FAQITEM ENTITY FOR ANSWER
    const newFaqItemAnswer = new FaqItem({
      faqItemContent,
      // userId,
      faqItemDate: Date.now(),
      faqItemType: "Answer",
      faqItemId: uuidv4(), // Generate a unique ID for the faqitem
    });
    const savedFaqItemAnswer = await newFaqItemAnswer.save();

    // 2. UPDATING RESPECTIVE FAQ ENTITY INSTANCE WITH FAQITEMID
    faq.faqAnswer = savedFaqItemAnswer.faqItemId;
    const updateFaq = await faq.save();

    if (!updateFaq) return res.status(404).json({ message: "Faq not found!" });
    res.status(200).json({ faq: updateFaq, answer: savedFaqItemAnswer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READING ALL INSTANCES OF FAQ ENTITY
export const getAllFaqItems = async (req, res) => {
  try {
    const faqItems = await FaqItem.find();
    res.status(200).json(faqItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READING SPECIFIC INSTANCE OF FAQITEM ENTITY
export const getFaqItemById = async (req, res) => {
  try {
    const faqItem = await FaqItem.findOne({ faqItemId: req.params.id });
    if (!faqItem)
      return res.status(404).json({ message: "FaqItem not found!" });
    res.status(200).json(faqItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATING SPECIFIC EXISTENCE OF EXISTING FAQITEM ENTITY
export const updateFaqItem = async (req, res) => {
  try {
    const updatedFaqItem = await FaqItem.findOneAndUpdate(
      { faqItemId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedFaqItem)
      return res.status(404).json({ message: "FaqItem not found!" });
    res.status(200).json(updatedFaqItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETING SPECIFIC INSTANCE OF EXISTING FAQITEM ENTITY, IF REQUIRED, UPDATE / DELETE CORRESPONDING FAQ ENITTY INSTANCE
export const deleteFaqItem = async (req, res) => {
  try {
    // CHECKING IF FAQITEMID EXISTS IN FAQITEM COLLECTION
    const deletedFaqItem = await FaqItem.findOne({ faqItemId: req.params.id });
    if (!deletedFaqItem)
      return res.status(404).json({ message: "FaqItem not found!" });

    // IF FAQITEMTYPE IS "QUESTION", DELETE CORRESPONDING FAQ, INCLUDING ALL CORRESPONDING FAQITEMS
    if (deletedFaqItem.faqItemType === "Question") {
      await deleteFaqItemsAndFaq(
        { params: { id: deletedFaqItem.faqItemId } },
        res
      );
      return;
    } else {
      //  IF FAQITEMTYPE IS "ANSWER", DELETE FAQITEM ONLY, UPDATE CORRESPONDING FAQ ENTITY INSTANCE
      const correspondingFaq = await Faq.findOne({
        faqAnswer: deletedFaqItem.faqItemId,
      });
      if (correspondingFaq) {
        correspondingFaq.faqAnswer = null;
        await correspondingFaq.save();
      }

      // DELETE FAQITEM (ANSWER) ENTITY INSTANCE
      await deletedFaqItem.deleteOne();
      res
        .status(200)
        .json({ message: "FaqItem deleted and Faq answer set to null!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETING SPECIFIC INSTANCE OF EXISTING FAQ ENTITY, ALONG WITH ALL OF ITS RESPECTIVE FAQITEM ENTITY INSTANCES, USING FAQITEMID (QUESTION)
export const deleteFaqItemsAndFaq = async (req, res) => {
  try {
    // 1. FINDING SPECIFIC FAQ ENTITY INSTANCE USING FAQITEMID (QUESTION)
    const deletedFaq = await Faq.findOne({ faqQuestion: req.params.id });
    if (!deletedFaq) return res.status(404).json({ message: "FAQ not found!" });

    // 2. DELETING ASSOCIATED FAQITEM ENTITY INSTANCES FOR QUESTION AND ANSWER
    if (deletedFaq.faqQuestion != null) {
      await FaqItem.findOneAndDelete({ faqItemId: deletedFaq.faqQuestion });
    }
    if (deletedFaq.faqAnswer) {
      await FaqItem.findOneAndDelete({ faqItemId: deletedFaq.faqAnswer });
    }

    // 3. DELETE FAQ ENTITY INSTANCE ITSELF
    await deletedFaq.deleteOne();

    res
      .status(200)
      .json({ message: "FAQ and associated FAQItems deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
