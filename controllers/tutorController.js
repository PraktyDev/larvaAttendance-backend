import Tutor from '../models/Tutor.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//TUTOR REGISTRATION
export const register = async (req, res) =>{
    try {
        const { body } = req
        const { image, publicId, name, email, password, course } = body
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const newTutor = new Tutor({
            image,
            publicId,
            name,
            email,
            password: hashPassword,
            course,
        })
        await newTutor.save()
        return res.status(201).json({ msg: "Tutor is created", newTutor })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//TUTOR LOGIN
export const login = async (req, res) =>{
    try {
        const { body } = req
        const { email, password } = body
        const tutor = await Tutor.findOne({ email })
        if(!tutor){
            return res.status(401).json({ msg: 'Email or Password incorrect' })
        }
        const passwordCompare = await bcrypt.compare(password, tutor.password)
        if(!passwordCompare){
            return res.status(404).json({ msg: 'Invalid credentials' })
        }

        const accessToken = jwt.sign(
            { userId: tutor._id },
            process.env.JWT_ACCESS_SECRET,
            { subject: 'accessApi', expiresIn: process.env.TOKEN_EXPIRATION }
        )
        
        res.cookie('accessToken', accessToken, { maxAge: 60000 })
        // res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' })
        return res.status(200).json({
            id: tutor._id,
            name: tutor.name,
            email: tutor.email,
            login: true
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//TUTOR LOGOUT
export const logout = (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Logout failed", error: error.message });
    }
};

//Tutor Auth Status
export const authStatus = async (req,res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({ Authenticate: false, msg: "Invalid Token" });
        }

        const tutor = await Tutor.findOne({ _id: req.user.id })

        if (!tutor) {
            return res.status(404).json({ Authenticate: false, msg: "Tutor not found" });
        }

        return res.status(200).json({ Authenticate: true, id: tutor._id, name: tutor.name });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

//FETCH ALL TUTORS
export const tutors = async (req, res) =>{
    try {
        const tutor = await Tutor.find()
        if(tutor.length === 0){
            return res.status(404).json({ msg: 'No tutors in the database' })
        }
        return res.status(200).json(tutor)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH TUTOR BY ID (INDIVIDUAL TUTOR)
export const tutor = async (req, res) =>{
    try {
        const { id } = req.params
        const tutor = await Tutor.findById(id)
        if(!tutor){
            return res.status(404).json({ msg: 'Tutor not found' })
        }
        return res.status(200).json(tutor)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//UPDATE TUTOR BY ID
export const updateTutor = async (req, res) =>{
    try {
        const { id } = req.params;
        const tutor = req.body;
    
        const updatedTutor = await Tutor.findByIdAndUpdate(id, tutor, { new: true });
    
        if (!updatedTutor) {
          return res.status(404).json({ msg: 'Tutor not found' });
        }
        res.status(200).json({ msg: "Tutor is updated", updatedTutor });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

//DELETE TUTOR BY ID
export const deleteTutor = async (req, res) =>{
    try{
        const { id } = req.params
        const deletedTutor = await Tutor.findByIdAndDelete(id)
        if(!deletedTutor){
            return res.status(400).json({ msg: "Tutor not found in database" })
        }
        return res.status(200).json({ msg: "Tutor is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}