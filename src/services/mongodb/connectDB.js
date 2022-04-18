import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to the DB')
    } catch (error) {
        console.log(error)
    }
}