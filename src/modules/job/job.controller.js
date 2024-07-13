// import modules:

import { Company } from "../../../db/models/company.model.js";
import { Job } from "../../../db/models/job.model.js";


// 1- add a job:
export const addJob = async (req, res, next)=>{
    // get data from req.body:
    const {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
      addedBy,
    } = req.body;
    // PREPARE jOB:
    const job = new Job({
        jobTitle,
        jobLocation, 
        workingTime,
        seniorityLevel,
        jobDescription,
         technicalSkills,
         softSkills,
          addedBy
    })
    // add to db
    const createdJob = await job.save()
    // send response:
    return res.status(201).json({message: "Job added successfully.",data: createdJob, success: true});


}
//2- update job:
export const updateJob = async (req, res, next)=>{
    const {hrId,id} = req.params; 
     const updatedJob = await Job.findByIdAndUpdate([hrId, id], req.body, {new:true}).populate('addedBy')   
    return res.status(200).json({ message: "Job updated successfully." ,  data: updatedJob,success: true})
}
// 3-delete job:
export const deleteJob = async (req, res, next)=>{
    const { id, hrId } = req.params;
    await Job.findByIdAndDelete([hrId, id], req.body);
   return res.status(200).json({ message: "Job deleted successfully.", success: true });
}
// 4-get all jobs with their companies information:
export const getAllJobs = async(req, res, next)=>{
    const {companyHR, addedBy} = req.body
    const companyInfo = await Company.findOne({companyHR})
    const jobs = await Job.find().populate("addedBy");
   return res.status(200).json({ success: true, data: jobs });
    
}
// 5- get filtered jobs:
export const getFilteredJobs = async (req, res, next)=>{
  const filteredJob = await Job.find({
    $or: [
      { workingTime: { $regex: req.params.key } },
      { jobLocation: { $regex: req.params.key } },
    ],
  });
 return res.status(200).json({success:true, data:filteredJob })
}

// 6- get all jobs with a specific companyName:
export const getSpecificJobs = async (req, res, next)=>{
  // i tried to specify the jobs with this condition but it did not work in this api nor in the company one
  // const specificJobs = await Job.find({addedBy :Company.companyHR}).populate('addedBy')
  const specificJobs = await Job.find().populate(  "addedBy" );
  const specificCompany = await Company.find({
    companyName: { $regex: req.params.key },
  });
 return  res.status(200).json({success:true, data: specificCompany, specificJobs})
}

