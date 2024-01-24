import express from 'express';
import { gettingQuestions, postingNewQuestion, gettingAnswer } from '../controllers/questions.js';

const router = express.Router();

router.get('/getquestions', gettingQuestions);
router.get('/getanswer', gettingAnswer);

router.post('/postnewquestion', postingNewQuestion);

export default router;