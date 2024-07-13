// import modules:
import { Router } from "express";
import { auth } from "../../middlewares/authentication.js";
import { companyAuth } from "../../middlewares/authorization.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { addJob, deleteJob, getAllJobs, getFilteredJobs, getSpecificJobs, updateJob } from "./job.controller.js";
import { validate } from "../../middlewares/validate.js";
import { jobVal } from "./job.validation.js";
// create router:
const jobRouter = Router();
// add a job:
jobRouter.post('/',validate(jobVal),[auth, companyAuth], asyncHandler(addJob))
// update a job:
jobRouter.put('/:hrId/:id', [auth, companyAuth], asyncHandler(updateJob))
// delete job:
jobRouter.delete("/:hrId/:id", [auth, companyAuth], asyncHandler(deleteJob));
// get all jobs with their companies:
jobRouter.get('/',[auth], asyncHandler(getAllJobs))
// get filter jobs:
jobRouter.get('/filter/:key', [auth, companyAuth], asyncHandler(getFilteredJobs))
// get all jobs with a specific companyName:
jobRouter.get('/:key',[auth, companyAuth], asyncHandler(getSpecificJobs))
// export:

export default jobRouter;
