import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    image: { 
        type: String, 
        required: true 
    },
    publicId: { 
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    studentNumber: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
        enum: ["Cyber Security", "Data Analysis", "Frontend Development", "Backend Development", "Mobile Development", "UIUX Design"]
    },
    cohort: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6]
    },
    attendance: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
},{ timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;