import { Router } from 'express';
import { ensureAuthenticated } from '../utils/authMiddleware.js';
import { authStatus, deleteTutor, login, logout, register, tutor, tutors, updateTutor } from '../controllers/tutorController.js';

const router = Router();

//CREATE OPERATION
router.post('/tutor/register', register)
router.post('/tutor/login', login)
//READ OPERATION
router.get('/tutor/auth/status', ensureAuthenticated, authStatus)
router.get('/tutor/logout', logout)
router.get('/tutors', tutors)
router.get('/tutor/:id', tutor)
//UPDATE OPERATION
router.put('/tutor/:id', updateTutor)
//DELETE OPERATION
router.delete('/tutor/:id', deleteTutor)


export default router;