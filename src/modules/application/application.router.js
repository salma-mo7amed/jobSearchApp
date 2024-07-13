// import modules:
import { Router } from "express";
import { auth } from "../../middlewares/authentication.js";
import { ownerAuth } from "../../middlewares/authorization.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { addApplication, getAllApplications } from "./application.controller.js";
import { fileUpload } from "../../utils/fileUpload.js";
// create router:
const applicationRouter = Router();
// add an application:
applicationRouter.post('/', [auth, ownerAuth,fileUpload().single('userResume')], asyncHandler(addApplication))
applicationRouter.get("/", [ auth,ownerAuth,fileUpload().single("userResume")], asyncHandler(getAllApplications));
// export:
export default applicationRouter;
