import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { updateProfileController } from "../controllers/userController.js";

const router = express.Router()

router.patch('/update', authMiddleware, updateProfileController)

export default router
