import express from 'express';
import upload from '../utils/multer.js'

import { 
    createQuiz,
    deleteQuiz, editQuiz,
    addQuizQuestion, editQuizQuestion,getQuestion,getPlatformQuiz,
    deleteQuizQuestion,getQuiz,getQuizzesByFilter, upvoteQuiz, downvoteQuiz, 
    uploadImage, getLeaderboard, searchLeaderboard
} from '../controllers/quiz.js';
import { reportQuiz } from '../controllers/report.js';

const router = express.Router();

//crud on quiz
router.get("/:id",getQuiz);
router.get('/', getQuizzesByFilter);
router.get('/:id/leaderboard', getLeaderboard)
router.get('/:id/leaderboard/search', searchLeaderboard);
router.post('/', createQuiz);
router.delete("/:id", deleteQuiz);
router.post('/:id/editQuiz', editQuiz);
router.post('/:id/upload', upload.single("image"), uploadImage)
router.get("/getPlatformQuiz/:id",getPlatformQuiz)
router.post('/upvote/:id',upvoteQuiz)
router.post('/downvote/:id',downvoteQuiz)
router.post('/:id/report',reportQuiz)

//crud on quiz questions
router.get("/:id/getQuestion",getQuestion)
router.post('/:id/addQuestion', addQuizQuestion);
router.post('/:id/deleteQuestion', deleteQuizQuestion);
router.post('/:id/editQuizQuestion', editQuizQuestion);

export default router;