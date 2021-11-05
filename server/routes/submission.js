import express from "express";
import {
  createSubmission,
  getUserSubmissions,
  getQuizSubmissions,
  getSubmission,
} from "../controllers/submission.js";

const router = express.Router();

//crud on submissions
router.get("/getUserSubmissions/:id", getUserSubmissions);
router.post("/createSubmission", createSubmission);
router.get("/getQuizSubmissions/:uid/:qid", getQuizSubmissions);
router.get("/getSubmission/:id", getSubmission);

export default router;
