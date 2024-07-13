// import modules:
import { Router } from "express";
import { addCompany, deleteCompany, getCompanyData, getSearchedCompany, updateCompany } from "./company.controller.js";
import { auth } from "../../middlewares/authentication.js";
import { companyAuth, companyOwner } from "../../middlewares/authorization.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import { companyVal } from "./company.validation.js";
// create router:
const companyRouter = Router();
// add a company:
companyRouter.post("/",validate(companyVal),[ auth, companyAuth], asyncHandler(addCompany));
// update a company:
companyRouter.put('/:companyId/:id', [auth, companyOwner], asyncHandler(updateCompany));
// DELETE A COMPANY:
companyRouter.delete("/:companyId/:id",[auth, companyOwner], asyncHandler( deleteCompany));
// search for a company with the name:
companyRouter.get('/search/:key', [auth, companyAuth], asyncHandler(getSearchedCompany))
// get company data 
companyRouter.get('/:id',[auth, companyAuth], asyncHandler(getCompanyData))
// export:
export default companyRouter;
