// import modules:
import mongoose, { model, mongo, Schema } from "mongoose";
// create schema:
const applicationSchema = new Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userTechSkills: {
      type: Array,
      ref: "Job",
    },
    userSoftSkills: {
      type: Array,
      ref: "Job",
    },
    userResume:{
    type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// create model:
export const Application = model('Application', applicationSchema)

