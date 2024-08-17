import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./routers/index.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_DOMAIN,
    methods: 'GET, PUT, PATCH, POST, DELETE, HEAD',
    credentials: true //Allow credentials (cookies, authorization headers)
}))


app.use('/api/v1', routers)


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