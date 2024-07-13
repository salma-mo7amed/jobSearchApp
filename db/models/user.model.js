// import modules:
import { model, Schema } from "mongoose";
// create schema:
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    recoveryEmail: {
      type: String,
      unique: false,
    },
    DOB: {
      type: Date,
    },
    mobileNumber:{
        type:Number,
        unique:true
    },
    role:{
        type:String,
       
    },
    status:{
        type:String,
        default:"offline"
    },
    isOwner:{
      type:Boolean
    },
    verified:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true, versionKey: false }
);
// create model:
export const User = model('User', userSchema)