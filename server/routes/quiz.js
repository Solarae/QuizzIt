import express from 'express';
import { 
    createQuiz,
    deleteQuiz, editQuiz,
    addQuizQuestion, editQuizQuestion, deleteQuizQuestion,getQuiz,getQuestion
} from '../controllers/quiz.js';

const router = express.Router();

//crud on quiz
router.get("/:id",getQuiz);
router.post('/', createQuiz);
router.delete('/:id', deleteQuiz);
router.post('/:id/editQuiz', editQuiz);

//crud on quiz questions
router.get("/:id/getQuestion",getQuestion)
router.post('/:id/addQuestion', addQuizQuestion);
router.delete('/:id/deleteQuestion', deleteQuizQuestion);
router.post('/:id/editQuizQuestion', editQuizQuestion);

export default router;