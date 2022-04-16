import express from 'express'
import dotenv from 'dotenv'
dotenv.config('./.env')

const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})