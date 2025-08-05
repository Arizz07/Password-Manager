import mongoose from "mongoose";

const PasswordScema = mongoose.Schema({
    url:String,
    user:String,
    pass: String
  
})

const Password = mongoose.model('password',PasswordScema)
export default Password