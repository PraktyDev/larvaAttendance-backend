import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./routers/index.js";
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1', routers) 


//Logout route (Authentication Logout)
app.post('/logout', (req,res,next)=>{
    if(!req.user) return res.sendStatus(401)
    req.logout((err)=>{
        if(err) return res.sendStatus(400)
    })
    next()
})

//Custom 404
app.use((req,res) => {
    res.status(404)
    res.send('404 - Not Found')
})

//Custom 500
app.use((err,req,res,next) => {
    console.log(err.message)
    res.status(500)
    res.json({ msg: "Something went wrong", error: err.message })
    next()
})

const port = process.env.PORT || 3500

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {console.log(`Server listening on ${port}`)})
        console.log("Connected to database successfully")
    })
    .catch((err) => {console.log(err.message)});