import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getUserPersonalController, updateProfileController } from "../controllers/userController.js";

const router = express.Router()

router.get('/:id', authMiddleware, getUserPersonalController)
router.patch('/update', authMiddleware, updateProfileController)

export default router
