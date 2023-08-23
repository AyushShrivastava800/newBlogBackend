import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";

const userSchema=mongoose.Schema({
name:{
    type:String,
    required:[true,"name is required"],
    lowercase:true,
    trim:true
},
email:{
   type: String,
   required:[true,'email.is required'],
   lowercase:true,
   trim:true,
   unique:true
},
password:{
    type:String,
    required:[true,'password is required'],
    minlength:5,
    trim:true,
},
confirmPassword:{
    type:String,
    required:[true,'password is required'],
    minlength:5,
    trim:true,
},
role:{
    type:String,
    required:true,
    default:'user'
}


});

userSchema.plugin(UniqueValidator)
const userSchemaModel=mongoose.model("user_collection",userSchema)

export default userSchemaModel;