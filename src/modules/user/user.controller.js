// import modules:

import { User } from "../../../db/models/user.model.js";
import { AppError } from "../../utils/appError.js";


//3- update account:
export const updateAccount = async (req, res, next)=>{
    const {id} = req.params;
    const {email, mobileNumber}= req.body;
    // check on email:
    const isEmail = await User.findOne({email})
    if(isEmail){
        return next(new AppError('there is a same version of this email', 409))
    }
    // check on mobile number:
    const isMobile = await User.findOne({ mobileNumber });
    if (isMobile) {
      return next(new AppError("there is a same version of this mobile number", 409));
    }
    // send correct data:
    
     const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});
     res.status(200).json({ message: "Account updated successfully." ,  data: updatedUser,success: true });
}
// ******************************************************************
// 4-delete account:
export const deleteAccount = async(req, res, next)=>{
    const { id } = req.params;
    await User.findByIdAndDelete(id, req.body);
    res.status(200).json({ message: "user deleted successfully.", success: true });
}
// *******************************************************
//5- get user account data:
export const getAccountData = async (req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user });
}
// *********************************************
// 6- get profile data:
export const getProfileData = async (req, res, next)=>{
     const { id } = req.params;
     const user = await User.findById(id);
     res.status(200).json({ success: true, data: user });
}
// get all account to a specific recoveryEmail
export const getAccountsWithRecoveryEmail = async (req, res, next)=>{
    const accountAfterRecovery = await User.find({
      recoveryEmail: { $regex: req.params.key }
    });
    return res.status(200).json({success:true, data:accountAfterRecovery})
}