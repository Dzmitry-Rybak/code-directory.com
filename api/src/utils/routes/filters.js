import express from 'express';
import { getFilters, postFilters } from '../controllers/filters.js';

const router = express.Router();

router.get('/updateFilter', getFilters);
router.post('/updateFilter', postFilters);

export default router;