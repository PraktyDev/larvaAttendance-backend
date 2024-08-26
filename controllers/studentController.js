import Student from '../models/Student.js';

//REGISTER STUDENT
export const registerStudent = async (req, res) =>{
    try {
        const { body } = req
        const newStudent = new Student(body)
        await newStudent.save()
        return res.status(201).json({ msg: "Student Registered", newStudent })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ALL STUDENTS
export const students = async (req, res) =>{
    try {
        const student = await Student.find().populate('attendance', '-_id -createdAt -updatedAt -__v')
        if(student.length === 0){
            return res.status(404).json({ msg: 'No students in the database' })
        }
        return res.status(200).json(student)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH STUDENT BY ID (INDIVIDUAL STUDENT)
export const student = async (req, res) =>{
    try {
        const { id } = req.params
        const student = await Student.findById(id).populate('attendance', '-_id -createdAt -updatedAt -__v')
        if(!student){
            return res.status(404).json({ msg: 'Student not found' })
        }
        return res.status(200).json(student)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//UPDATE STUDENT BY ID
export const updateStudent = async (req, res) =>{
    try {
        const { id } = req.params;
        const student = req.body;
    
        const updatedStudent = await Student.findByIdAndUpdate(id, student, { new: true });
    
        if (!updatedStudent) {
          return res.status(404).json({ msg: 'Student not found' });
        }
        res.status(200).json({ msg: "Student is updated", updatedStudent });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

//DELETE STUDENT BY ID
export const deleteStudent = async (req, res) =>{
    try{
        const { id } = req.params
        const deletedStudent = await Student.findByIdAndDelete(id)
        if(!deletedStudent){
            return res.status(400).json({ msg: "Student not found in database" })
        }
        return res.status(200).json({ msg: "Student is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}