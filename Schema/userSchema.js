import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  
    name:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:true,
        unique:true
    },
    phone:{
        type:"number",
        required:true
    }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel