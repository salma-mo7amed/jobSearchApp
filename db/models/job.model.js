// import modules:
import mongoose, { model, Schema } from "mongoose";
import { Company } from "./company.model.js";
// create schema:
const jobSchema = new Schema({
  jobTitle: { type: String },
  jobLocation: { type: String },
  workingTime: {
    type: String,
  },
  seniorityLevel: {
    type: String,
    enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
  },
  jobDescription: { type: String },
  technicalSkills: { type: Array },
  softSkills: { type: Array },
  addedBy:{
    type: mongoose.Types.ObjectId,
    ref:'User'
    
  }

},{
    timestamps:true,
    versionKey:false
});
// create model:
//  const companies = Company;
export const Job = model('Job',  jobSchema  )


