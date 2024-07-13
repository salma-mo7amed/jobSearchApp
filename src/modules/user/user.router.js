// import modules:
import { Router } from "express";
import { deleteAccount, getAccountData, getAccountsWithRecoveryEmail, getProfileData, updateAccount } from "./user.controller.js";
import { auth } from "../../middlewares/authentication.js";
import { ownerAuth } from "../../middlewares/authorization.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
// create router:
const userRouter = Router();
// get all account to a specific recoveryEmail
userRouter.get('/:id/:key', [auth, ownerAuth], asyncHandler(getAccountsWithRecoveryEmail))
// update account
userRouter.put('/:id',[auth, ownerAuth]  ,asyncHandler(updateAccount));
// delete account:
userRouter.delete("/:id", [auth, ownerAuth], asyncHandler(deleteAccount));
// get account data:
userRouter.get("/:id", [auth, ownerAuth], asyncHandler(deleteAccount));
// get a profile:
userRouter.get('/profile/:id', asyncHandler(getProfileData))

// export:
export default userRouter