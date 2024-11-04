// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NECESSARY LIBRARIES
import Event from "../models/Event.js";
import Faq from "../models/Faq.js";
import FaqItem from "../models/FaqItem.js";

// CREATING NEW FAQITEM AND FAQ OBJECT (FOR QUESTION)
export const createFaqItemQuestionAndFaq = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEFAQITEMANDFAQ
  const { eventId, faqItemContent, faqItemType, userId } = req.body;

  try {
    // CHECKS IF EXISTING EVENTS IN DATABASE HAVE THE SAME EVENTID
    const event = await Event.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    // 1. INSTANTIATING NEW FAQITEM OBJECT (FOR QUESTION)
    const newFaqItemQuestion = new FaqItem({
      faqItemContent: faqItemContent,
      faqItemType: faqItemType,
      userId: userId,
    });

    // SAVE NEW FAQITEM OBJECT TO DATABASE
    const savedFaqItemQuestion = await newFaqItemQuestion.save();

    // 2. INSTANTIATING NEW FAQ OBJECT
    const newFaq = new Faq({
      faqQuestion: savedFaqItemQuestion.faqItemId,
      eventId: eventId,
    });

    // SAVE NEW FAQ OBJECT TO DATABASE
    await newFaq.save();

    res
      .status(201)
      .json({ message: "Successfully created new FAQItem and FAQ!" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// CREATING NEW FAQITEM AND FAQ OBJECT (FOR ANSWER)
export const createFaqItemAnswer = async (req, res) => {
  const { faqId, faqItemContent, faqItemType, userId } = req.body;

  try {
    // CHECKS IF EXISTING FAQS IN DATABASE HAVE THE SAME FAQID
    const faq = await Faq.findOne({ faqId: faqId });
    if (!faq) return res.status(404).json({ message: "Faq not found!" });

    // 1. INSTANTIATING NEW faq OBJECT (FOR ANSWER)
    const newFaqItemAnswer = new FaqItem({
      faqItemContent: faqItemContent,
      faqItemType: faqItemType,
      userId: userId,
    });

    // SAVE NEW FAQITEM OBJECT TO DATABASE
    const savedFaqItemAnswer = await newFaqItemAnswer.save();

    // 2. UPDATE FAQ OBJECT'S FAQANSWER ATTRIBUTE WITH FAQITEMID
    faq.faqAnswer = savedFaqItemAnswer.faqItemId;

    // SAVE UPDATED FAQ OBJECT TO DATABASE
    const updateFaq = await faq.save();

    if (!updateFaq) return res.status(404).json({ message: "Faq not found!" });
    res.status(200).json({
      message: "Successfully created FAQItem object and updated FAQ!",
    });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING ALL FAQITEMS OBJECTS FROM DATABASE
export const getAllFaqItems = async (req, res) => {
  try {
    const faqItems = await FaqItem.find();
    res.status(200).json(faqItems);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};
// RETRIEVING ALL FAQ OBJECTS FROM DATABASE
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC FAQITEM OBJECT FROM DATABASE USING FAQITEMID
export const getFaqItemById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETFAQITEMBYID
    const { faqItemId } = req.params;

    // CHECKS IF EXISTING FAQITEMS IN DATABASE HAVE THE SAME FAQITEMID
    const faqItem = await FaqItem.findOne({ faqItemId: faqItemId });
    if (!faqItem)
      return res.status(404).json({ message: "FaqItem not found!" });

    res.status(200).json(faqItem);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC FAQ OBJECT FROM DATABASE USING FAQID
export const getFaqById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETFAQBYID
    const { faqId } = req.params;

    // CHECKS IF EXISTING FAQS IN DATABASE HAVE THE SAME FAQITEMID
    const faq = await Faq.findOne({ faqId: faqId });
    if (!faq) return res.status(404).json({ message: "Faq not found!" });

    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// UPDATING SPECIFIC EXISTENCE OF EXISTING FAQITEM ENTITY
export const updateFaqItem = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION UPDATEEVENT
    const { faqItemId } = req.params;

    // RETRIEVE CURRENT FAQITEM OBJECT FROM DATABASE
    const faqItem = await FaqItem.findOneAndUpdate(
      { faqItemId: faqItemId },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!faqItem) {
      return res.status(404).json({ message: "FaqItem not found!" });
    }

    res.status(200).json({ message: "FaqItem updated successfully!", faqItem });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// DELETING SPECIFIC INSTANCE OF EXISTING FAQITEM OBJECT IF REQUIRED, UPDATE / DELETE CORRESPONDING FAQ ENITTY INSTANCE
export const deleteFaqItem = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION DELETEFAQITEM
    const { faqItemId } = req.params;

    // RETRIEVE CURRENT FAQITEM OBJECT FROM DATABASE
    const faqItem = await FaqItem.findOne({ faqItemId: faqItemId });
    if (!faqItem)
      return res.status(404).json({ message: "FaqItem not found!" });

    // IF FAQITEMTYPE IS "QUESTION", DELETE CORRESPONDING FAQ, INCLUDING ALL CORRESPONDING FAQITEMS
    if (faqItem.faqItemType === "Question") {
      await deleteFaqItemsAndFaq(
        { params: { faqItemId: faqItem.faqItemId } },
        res
      );
      return;
    } else {
      //  IF FAQITEMTYPE IS "ANSWER", DELETE FAQITEM ONLY, UPDATE CORRESPONDING FAQ ENTITY INSTANCE
      // RETRIEVE CURRENT FAQITEM OBJECT FROM DATABASE AND SET FAQANSWER TO NULL
      const faq = await Faq.findOne({
        faqAnswer: faqItem.faqItemId,
      });
      if (faq) {
        faq.faqAnswer = null;

        // SAVE UPDATED FAQ OBJECT TO DATABASE
        await faq.save();
      }

      // DELETE FAQITEM (ANSWER) ENTITY INSTANCE
      await faqItem.deleteOne();
      res
        .status(200)
        .json({
          message: "Successfully deleted FaqItem and set Faq answer to null!",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// DELETING SPECIFIC INSTANCE OF EXISTING FAQ OBJECT
export const deleteFaqItemsAndFaq = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION DELETEFAQITEM
    const { faqItemId } = req.params;

    // 1. RETRIEVE CURRENT FAQ OBJECT FROM DATABASE USING FAQITEMID (QUESTION)
    const faq = await Faq.findOne({ faqQuestion: faqItemId });
    if (!faq) return res.status(404).json({ message: "FAQ not found!" });

    // 2. DELETE ASSOCIATED FAQITEM OBJECTS FOR QUESTION AND ANSWER
    if (faq.faqQuestion) {
      await FaqItem.findOneAndDelete({ faqItemId: faq.faqQuestion });
    }
    if (faq.faqAnswer) {
      await FaqItem.findOneAndDelete({ faqItemId: faq.faqAnswer });
    }

    // 3. DELETE FAQ OBJECT ITSELF
    await faq.deleteOne();

    res
      .status(200)
      .json({ message: "Successfully deleted FAQ and associated FAQItems!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};
