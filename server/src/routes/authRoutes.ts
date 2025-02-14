import express from "express";
import {
  loginAdmin,
  loginUser,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

//Route to handle admin login
router.post("/admin/login", loginAdmin);

//user routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
