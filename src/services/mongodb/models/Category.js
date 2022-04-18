import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true,
        maxlength:500,
        minlength: 10,
    }
},{
    timestamps:true
})

const Category = new mongoose.model("Category",CategorySchema)

export default Category