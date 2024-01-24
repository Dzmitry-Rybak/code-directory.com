import express from 'express';

import userRouter from './users.js';
import questionsRouter from './questions.js';
import filtersRouter from './filters.js';

const router = express.Router();

router.use('/', userRouter);
router.use('/', questionsRouter);
router.use('/', filtersRouter);

export default router;