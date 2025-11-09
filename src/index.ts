import express from 'express'
// import mongoose from 'mongoose'

const app = express()

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello world")    
})
app.listen(8000,()=>{
    console.log("app running on port 8000")
})