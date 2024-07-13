import joi from "joi";
export const jobVal = joi.object({
  jobTitle: joi.string().required(),
  jobLocation: joi.string().required(),
  workingTime: joi.string().required(),
  seniorityLevel: joi.string().required(),
  technicalSkills: joi.array(),
  softSkills: joi.array(),
  addedBy:joi.string().required(),
  
});
