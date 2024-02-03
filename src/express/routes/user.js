import express from "express";
import userControllers from "../controllers/user.js";
const router = express.Router();

router.get("/login", userControllers.login)
router.get("/signup", userControllers.signup)



export default router