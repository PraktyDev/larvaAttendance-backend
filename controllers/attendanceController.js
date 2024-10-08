import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

//CREATE ATTENDANCE
export const createAttendance = async (req, res) =>{
    try {
        const { date, status, studentId } = req.body
        const student = await Student.findById(studentId)
        if(!student){
            return res.status(404).json({ error: "Student not found" })
        }
        const newAttendance = new Attendance({
            date,
            status,
            student: studentId,
        })
        await newAttendance.save()
        
        student.attendance.push(newAttendance._id)
        await student.save()

        return res.status(201).json({ msg: "Attendance Marked", newAttendance })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ALL ATTENDANCE
export const attendances = async (req, res) =>{
    try {
        const attendance = await Attendance.find().populate('student', 'image name studentNumber course cohort attendance')
        if(attendance.length === 0){
            return res.status(404).json({ msg: 'No attendances in the database' })
        }
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ATTENDANCE BY DATE
export const attendance = async (req, res) =>{
    try {
        const { date } = req.params
        const attendance = await Attendance.find({date}).populate('student', 'image name studentNumber course cohort attendance')
        if(!attendance){
            return res.status(404).json({ msg: 'Attendance not found' })
        }
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//DELETE STUDENT BY ID
export const deleteAttendance = async (req, res) =>{
    try{
        const { id } = req.params
        const deletedAttendance = await Attendance.findByIdAndDelete(id)
        if(!deletedAttendance){
            return res.status(400).json({ msg: "Attendance not found in database" })
        }
        return res.status(200).json({ msg: "Attendance is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}