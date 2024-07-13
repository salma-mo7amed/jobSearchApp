import joi from "joi";
export const companyVal = joi.object({
  companyName: joi.string().required(),
  description: joi.string().required(),
  industry: joi.string().required(),
  address: joi.string().required(),
  numberOfEmployees: joi.string().required(),
  companyEmail: joi.string().email().required(),
  companyHR:joi.string().required()
});
  
