const mongoose=require('mongoose')
const validator =require('validator')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3,'must include at least 3 , got {value}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkdin:{
        type:String
    },
    profile:{
        type:String
    }


})

const users =mongoose.model("users",userSchema)
module.exports=users