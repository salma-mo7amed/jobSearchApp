// import modules:
import mongoose, { model, Schema } from "mongoose";
// create schema:
const companySchema = new Schema(
  {
    companyName: {
      type: String,
      unique: true,
    },
    description:{ type: String },
    industry: { type: String },
    address:{type:String},
    numberOfEmployees:{
        type: String
    },
    companyEmail:{
        type:String,
        unique:true
    },
    companyHR:{
        type:mongoose.Types.ObjectId,
        ref: 'User'}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// create model:
export const Company = model('Company', companySchema)
