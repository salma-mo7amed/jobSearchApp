import joi from "joi";
export const signupVal = joi.object({
  userName: joi.string().min(3).max(25).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  mobileNumber: joi.number(),
  role: joi.string(),
  recoveryEmail:joi.string().email()
});

