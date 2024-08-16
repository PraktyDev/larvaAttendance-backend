import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
        enum: ["Secretary", "Head of School", "Assistant Principal", "Student Coordinator"]
    },
},{ timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;