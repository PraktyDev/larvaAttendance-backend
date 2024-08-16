import Attendance from '../models/Attendance.js';

//CREATE ATTENDANCE
export const createAttendance = async (req, res) =>{
    try {
        const { body } = req
        const { date, status } = body
        const newAttendance = new Attendance({
            date,
            status,
        })
        await newAttendance.save()
        return res.status(201).json({ msg: "Attendance Marked", newAttendance })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ALL ATTENDANCE
export const attendances = async (req, res) =>{
    try {
        const attendance = await Attendance.find().populate('Student')
        if(attendance.length === 0){
            return res.status(404).json({ msg: 'No attendances in the database' })
        }
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ATTENDANCE BY ID (INDIVIDUAL ATTENDANCE)
export const attendance = async (req, res) =>{
    try {
        const { id } = req.params
        const attendance = await Attendance.findById(id).populate('Student')
        if(!attendance){
            return res.status(404).json({ msg: 'Attendance not found' })
        }
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}