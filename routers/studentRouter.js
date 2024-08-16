import { Router } from 'express';
import { deleteStudent, registerStudent, student, students, updateStudent } from '../controllers/studentController.js';


const router = Router();

//CREATE OPERATION
router.post('/student/register', registerStudent)
//READ OPERATION
router.get('/students', students)
router.get('/student/:id', student)
//UPDATE OPERATION
router.put('/student/:id', updateStudent)
//DELETE OPERATION
router.delete('/student/:id', deleteStudent)


export default router;