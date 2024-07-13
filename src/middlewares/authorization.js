import { Company } from "../../db/models/company.model.js"
import { User } from "../../db/models/user.model.js"
import { AppError } from "../utils/appError.js"
// function to authorize only the owner to update the account:
export const ownerAuth = async (req, res, next)=>{
    const {_id }=req.body
    const {id} = req.params
    const isOwner = await User.findOne({ id:_id });
    if(!isOwner){
      return next(new AppError("you are not the owner of this account", 401));
    }
     next();
}
// function to authorize hr 
export const companyAuth = async (req, res, next) => {
  const {  companyHR, role} = req.body;

  const isCompanyHR = await Company.findOne({ companyHR });
  const isAuth = await User.findOne({role: "company_HR"} )
  if ( !isAuth && !isCompanyHR) {
    return next(new AppError("you have to be a companyHR", 401 || 500));
  }

  next();

};
// function to authorize company owner
export const companyOwner = async (req, res, next)=>{
  const { companyId } = req.params
    const isOwner = await Company.findOne({ companyId: Company._id});
    if(!isOwner){
      return next(new AppError("you are not the owner of this company", 401));
    }
     next();
}