import Admin from '../models/Admin.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//ADMIN REGISTRATION
export const register = async (req, res) =>{
    try {
        const { body } = req
        const { image, publicId, name, email, password, post } = body
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const newAdmin = new Admin({
            image,
            publicId,
            name,
            email,
            password: hashPassword,
            post,
        })
        await newAdmin.save()
        return res.status(201).json({ msg: "Admin is created", newAdmin })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//ADMIN LOGIN
export const login = async (req, res) =>{
    try {
        const { body } = req
        const { email, password } = body
        const admin = await Admin.findOne({ email })
        if(!admin){
            return res.status(401).json({ msg: 'Email or Password incorrect' })
        }
        const passwordCompare = await bcrypt.compare(password, admin.password)
        if(!passwordCompare){
            return res.status(404).json({ msg: 'Invalid credentials' })
        }

        const accessToken = jwt.sign(
            { userId: admin._id },
            process.env.JWT_ACCESS_SECRET,
            { subject: 'accessApi', expiresIn: process.env.TOKEN_EXPIRATION }
        )

        res.cookie('accessToken', accessToken, { maxAge: 60000 })
        // res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' })

        return res.status(200).json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            login: true
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//ADMIN LOGOUT
export const logout = (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Logout failed", error: error.message });
    }
};

//Admin Auth Status
export const authStatus = async (req,res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({ Authenticate: false, msg: "Invalid Token" });
        }
        const admin = await Admin.findOne({ _id: req.user.id })
        return admin
            ? res.status(200).json({ Authenticate: true, id: admin._id, name: admin.name})
            : res.status(401).json({ Authenticate: false, msg: "You are not Authenticated" })
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

//FETCH ALL ADMINS
export const admins = async (req, res) =>{
    try {
        const admin = await Admin.find()
        if(admin.length === 0){
            return res.status(404).json({ msg: 'No admins in the database' })
        }
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//FETCH ADMIN BY ID (INDIVIDUAL ADMIN)
export const admin = async (req, res) =>{
    try {
        const { id } = req.params
        const admin = await Admin.findById(id)
        if(!admin){
            return res.status(404).json({ msg: 'Admin not found' })
        }
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

//UPDATE ADMIN BY ID
export const updateAdmin = async (req, res) =>{
    try {
        const { id } = req.params;
        const admin = req.body;
    
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, { new: true });
    
        if (!updatedAdmin) {
          return res.status(404).json({ msg: 'Admin not found' });
        }
        res.status(200).json({ msg: "Admin is updated", updatedAdmin });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

//DELETE ADMIN BY ID
export const deleteAdmin = async (req, res) =>{
    try{
        const { id } = req.params
        const deletedAdmin = await Admin.findByIdAndDelete(id)
        if(!deletedAdmin){
            return res.status(400).json({ msg: "Admin not found in database" })
        }
        return res.status(200).json({ msg: "Admin is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}