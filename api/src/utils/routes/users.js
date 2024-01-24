import express from 'express';
import { signupUser, signinUser, logoutUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.post('/logout', logoutUser);
router.delete('/delete', deleteUser);

export default router;