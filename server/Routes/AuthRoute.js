import { Router } from "express";
import { register, verifyUser, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword, getAuthUser } from "../Controllers/AuthController.js";
import userAuth from "../middlwares/authMiddleware.js";
import { localVariables } from "../middlwares/localVariables.js";
import { registerMail } from "../Controllers/Mail.js";
const router = Router();


router.post("/register", register);
router.post("/registerMail", registerMail);
router.post("/login" ,login);
router.post("/verifyUser" ,verifyUser);

router.post("/getAuthUser", userAuth, getAuthUser)

router.get("/user/:username", getUser);
router.get("/genOTP", localVariables, generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);


router.put("/updateUser", userAuth, updateUser);
router.put("/resetPassword", resetPassword)


export default router;