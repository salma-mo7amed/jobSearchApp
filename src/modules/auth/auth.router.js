// import modules:
import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { logIn, signUp, verifyOtp } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { signupVal } from "../user/user.validation.js";
// create router:
const authRouter = Router();
// sign up api:
authRouter.post('/signup',validate(signupVal),asyncHandler(signUp));
// login api:
authRouter.post('/login', asyncHandler(logIn))
// verify otp:
authRouter.post('/verify',validate(signupVal), asyncHandler(verifyOtp))
// export:
export default authRouter;
