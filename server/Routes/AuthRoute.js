import { Router } from "express";
import { register, verifyUser, resetMail, authenticate, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword } from "../Controllers/AuthController.js";
import userAuth from "../middlwares/authMiddleware.js";
import { localVariables } from "../middlwares/localVariables.js";
import { registerMail } from "../Controllers/Mail.js";
const router = Router();


router.post("/register", register);
router.post("/registerMail", registerMail);
router.post("/authenticate", authenticate);
router.post("/login" ,login);
router.post("/verifyUser" ,verifyUser);



router.get("/user/:username", getUser);
router.get("/genOTP", localVariables, generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);


router.put("/updateUser", userAuth, updateUser);
router.put("/resetPassword", resetPassword)


export default router;