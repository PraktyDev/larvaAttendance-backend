import { Router } from 'express';
import { ensureAuthenticated } from '../utils/authMiddleware.js';
import { authStatus, deleteTutor, login, register, tutor, tutors, updatePw, updateTutor } from '../controllers/tutorController.js';

const router = Router();

//CREATE OPERATION
router.post('/tutor/register', register)
router.post('/tutor/login', login)
//READ OPERATION
router.get('/tutor/auth/status', ensureAuthenticated, authStatus)
router.get('/tutors', tutors)
router.get('/tutor/:id', tutor)
//UPDATE OPERATION
router.put('/tutor/:id', updateTutor)
router.put('/tutor/updatepw/:id', updatePw)
//DELETE OPERATION
router.delete('/tutor/:id', deleteTutor)


export default router;