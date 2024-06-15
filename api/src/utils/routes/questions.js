import express from 'express';
import { gettingQuestions, postingNewQuestion, gettingAnswer, verifyCode, getCodeStacks } from '../controllers/questions.js';

const router = express.Router();

router.get('/getquestions', gettingQuestions);
router.get('/getanswer', gettingAnswer);

router.post('/postnewquestion', postingNewQuestion);

router.post('/verify-code', verifyCode);
router.get('/getcodestacks', getCodeStacks);

export default router;