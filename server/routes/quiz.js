import express from 'express';
import { 
    createQuiz,
    deleteQuiz, editQuiz,
    addQuizQuestion, editQuizQuestion, deleteQuizQuestion
} from '../controllers/quiz.js';

const router = express.Router();

//crud on quiz
router.post('/', createQuiz);
router.delete('/:id', deleteQuiz);
router.post('/:id/editQuiz', editQuiz);

//crud on quiz questions
router.post('/:id/addQuestion', addQuizQuestion);
router.delete('/:id/deleteQuestion', deleteQuizQuestion);
router.post('/:id/editQuizQuestion', editQuizQuestion);

export default router;