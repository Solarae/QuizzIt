import express from 'express';
import { 
    createSubmission, getSubmissions, getQuizSubmissions, getSubmission
   
} from '../controllers/submission.js';

const router = express.Router();

//crud on submissions
router.get("/", getSubmissions);
router.post("/createSubmission",createSubmission);
router.get("/getQuizSubmissions/:uid/:qid",getQuizSubmissions)
router.get("/:id", getSubmission)


export default router

