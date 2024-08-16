import jwt from "jsonwebtoken";

//middleware function to decode token
export const ensureAuthenticated = async (req,res,next) =>{ 
    const accessToken = req.cookies.accessToken
    if(!accessToken){
        if(renewToken(req, res)) {
            next()
        }
        return res.status(401).json({ msg: 'Access & refresh  token not found' })
    }
    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.user = { id: decodedToken.userId }
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Access token invalid or expired' })
    }
}

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken
    let exist = false;
    if(!refreshtoken) {
        return res.json({valid: false, message: "No Refresh token: login again"})
    } else {
        jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Refresh Token"})
            } else {
                const accessToken = jwt.sign({email: decoded.email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'})
                res.cookie('accessToken', accessToken, {maxAge: 60000})
                exist = true;
            }
        })
    }
    return exist;
}