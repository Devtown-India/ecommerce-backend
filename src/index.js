import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './services/mongodb/connectDB'
dotenv.config('./.env')

const app = express()

const PORT = process.env.PORT || 8080

connectDB()

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})