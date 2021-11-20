import express from 'express';
import upload from '../utils/multer.js'

import { 
    createQuiz,
    deleteQuiz, editQuiz,
    addQuizQuestion, editQuizQuestion,getQuestion,getPlatformQuiz,
    deleteQuizQuestion,getQuiz,getQuizzesByFilter, upvoteQuiz, downvoteQuiz, reportQuiz,
    uploadImage
} from '../controllers/quiz.js';

const router = express.Router();

//crud on quiz
router.get("/:id",getQuiz);
router.get('/', getQuizzesByFilter);
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
router.delete('/:id/deleteQuestion', deleteQuizQuestion);
router.post('/:id/editQuizQuestion', editQuizQuestion);

export default router;