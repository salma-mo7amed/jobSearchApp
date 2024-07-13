// import from other files
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from "../../../db/models/user.model.js";
import { AppError } from "../../utils/appError.js";
import { sendEmail } from '../../utils/email.js';


// 1-sign up 
export const signUp = async (req, res, next)=>{
  // get data from req:
  const { userName, email, password, mobileNumber, role, DOB, recoveryEmail } = req.body;
  // check existence:
  const isEmail = await User.findOne({ email });
   if (isEmail){
     return next( new AppError('email already exists', 409, 'success:false'))
   }
  //  hashing the password
   const hashPassword = bcrypt.hashSync('password', 8)
  // prepare user:
  const user = new User({
    userName,
    email,
    password:hashPassword,
    mobileNumber,
    role, 
    recoveryEmail

  });
  user.DOB instanceof Date;
  // add to db
  const createdUser = await user.save();
  // send email
  sendEmail(req.body.email)
  // send response
  return res.status(201).json({ message: "User added successfully.", data: createdUser, success: true});
};
// ********************** end of sign up******************
//2- login
export const logIn = async (req, res, next)=>{
  // get data
  const { email, password } = req.body;

  // check existence
  const isUserExist = await User.findOne({ email });
  if (!isUserExist || !bcrypt.compareSync("password", isUserExist.password)) {
    return next(new AppError('invalid credentials, 401'));
  }
    
  const token = jwt.sign({ userId: isUserExist._id }, "secret_key");
  isUserExist.status = "online";
  await isUserExist.save();
  return res.status(200).json({ message: `welcome to your profile`, success: true, token });
}
// **************** end of login ****************************

// 3-VERIFY oTP:
export const  verifyOtp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const userExist = await User.findOne({ email, password });
  if (userExist && userExist.verified) {
    return next(new AppError(messages.user.alreadyExist, 409));
  }
  if (userExist &&  userExist.verified == false &&userExist.expireOtp > Date.now()
  ) {
    return next(new AppError("check your email", 400));
  }
  if (
    userExist &&
    userExist.verified == false &&
    userExist.expireOtp < Date.now()
  ) {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    userExist.OTP = OTP;
    userExist.expireOtp = Date.now() + 500000;
    await userExist.save();
    sendEmail(email, "User Reset password OTP", OTP);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const userCreated = await User.create({
    userName,
    email,
    password: hashPassword,
    OTP,
    expireOtp: Date.now() + 500000,
  });
  if (!userCreated)
    return next(new AppError(messages.user.failedToCreate, 500));
  sendEmail(email, "User Reset Password OTP", OTP);

  res.status(201).json({
    message: "user created successfully",
    success: true,
    data: userCreated,
  });
};