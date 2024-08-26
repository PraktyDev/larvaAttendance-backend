import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    date: { 
        type: String,
    },
    status: {
        type: String,
        enum: ["present", "absent", "left"]
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        onDelete: 'pull'
    },
},{ timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;