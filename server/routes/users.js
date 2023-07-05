import express from "express";
import {
    register, 
    login, 
    logout,
    logoutAll,
    getCurrentUser } from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/register", register);

/* READ & UPDATE */
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/logoutAll", verifyToken, logoutAll);

// Get the current user
router.get("/me", verifyToken, getCurrentUser);

export default router;