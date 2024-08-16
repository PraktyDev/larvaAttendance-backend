import jwt from "jsonwebtoken";

//middleware function to decode token
export const ensureAuthenticated = async (req,res,next) =>{ 
    const accessToken = req.cookies.accessToken
    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.user = { id: decodedToken.userId }
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized' })
    }
}
