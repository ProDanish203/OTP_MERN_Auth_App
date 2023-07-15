import { Router } from "express";
import { register, resetMail, authenticate, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword } from "../Controllers/AuthController.js";
const router = Router();


router.post("/register", register);
router.post("/registerMail", resetMail);
router.post("/authenticate", authenticate);
router.post("/login", login);


router.get("/user/:username", getUser);
router.get("/genOTP", generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);


router.put("/updateUser", updateUser);
router.put("/resetPassword", resetPassword)


export default router;