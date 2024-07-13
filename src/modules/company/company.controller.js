// import modules:

import { Company } from "../../../db/models/company.model.js"
import { Job } from "../../../db/models/job.model.js"


// 1-add a company:
export const addCompany = async (req, res, next)=>{
    // get data from req.body:
    const{companyName, description,industry, address, numberOfEmployees, companyEmail, companyHR} = req.body
    // Prepare company:
    const company = new Company({
    companyName,
    description,
    industry,
    address,
    numberOfEmployees, 
    companyEmail,
    companyHR

    })
    // add to db
    const createdCompany = await company.save()
    // send response:
    return res.status(201).json({message: "Company created successfully.",data: createdCompany, success: true});


}
// ******************************************************
//2- update a company:
export const updateCompany = async(req, res, next)=>{
    const {companyId,id} = req.params; 
    const {email, companyName, address}= req.body;
    const updatedCompany = await Company.findByIdAndUpdate([companyId, id], req.body, {new:true}).populate('companyHR')   
   return  res.status(200).json({ message: "Company updated successfully." ,  data: updatedCompany,success: true });
}
// ****************************************
//3- delete a company:
export const deleteCompany = async(req, res, next)=>{
    const { id , companyId} = req.params;
    await Company.findByIdAndDelete([ companyId,id] , req.body);
    return res.status(200).json({ message: "company deleted successfully.", success: true });
}
//  4- get search company:
export const getSearchedCompany = async (req, res, next)=>{
    const filteredCompany = await Company.find({ companyName: { $regex: req.params.key } 
      });
    return res.status(200).json({ success: true, data: filteredCompany });
}
// 5- get company data:
export const getCompanyData = async (req, res, next)=>{
    const {id} = req.params;
     const thisCompany =await Company.findById(id).populate('companyHR')
     const jobs = await Job.find({addedBy : thisCompany.companyHR}).populate("addedBy");
   return res.status(200).json({ success: true, data: thisCompany, jobs });
       
     
    

}
// 6- get all applications for a specific company