import express from 'express';
import { 
    createSubmission,getAllSubmissions
   
} from '../controllers/submission.js';

const router = express.Router();

//crud on submissions
router.get("/:id",getAllSubmissions);
router.post("/",createSubmission);


export default router

