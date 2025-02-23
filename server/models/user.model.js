import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor", "student"],
        default:'student'
    },
    photoUrl:{
        type:String,
        default:""
    }
})

export const User=mongoose.model("User",userSchema)