import mongoose from "mongoose";

const tutorSchema = mongoose.Schema({
    image: { 
        type: String, 
    },
    publicId: { 
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
        enum: ["Cyber Security", "Data Analysis", "Frontend Development", "Backend Development", "Mobile Development", "UIUX Design"]
    },
},{ timestamps: true });

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;