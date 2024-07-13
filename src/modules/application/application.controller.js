// import modules

import { Application } from "../../../db/models/application.model.js"

// add an application
export const addApplication = async(req, res, next)=>{
    const { jobId, userId, userTechSkills, userSoftSkills, userResume } =
      req.body;
    // prepare application
    const application = new Application({
      jobId,
      userId,
      userTechSkills, 
      userSoftSkills,
      userResume

    });
    // ADD TO DB
    const createdApplication = await application.save()
    // send res
    return res.status(201).json({message:'application added successfully', data: createdApplication,file:req.file})
}
// 6- get all applications for a specific company
export const getAllApplications = async (req, res, next)=>{
  const application = await Application.find()
  const jobs = await Application.find().populate([
    "userId",
    "jobId" 
  ]);
  return res.status(200).json({success:true, data: jobs, application})}