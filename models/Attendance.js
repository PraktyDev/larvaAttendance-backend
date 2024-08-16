import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    status: {
        type: String,
        enum: ["present", "absent", "left"]
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
},{ timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;