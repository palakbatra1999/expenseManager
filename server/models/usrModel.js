import mongoose, { Mongoose } from "mongoose";

const userschema = new mongoose.Schema({
    namE : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
       
    },
    address : {
        type : String,
        default : 0
       
    },
    phone : {
        type : Number,
        required : true,
     
    }
},{timestamps:true})

export default mongoose.model('users',userschema);