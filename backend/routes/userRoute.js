import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllUserController, getUserPersonalController, statistUserRegisterController, updateProfileController } from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/all', authMiddleware, adminMiddleware, getAllUserController)
router.get('/static-user-register', authMiddleware, adminMiddleware, statistUserRegisterController)
router.get('/:id', authMiddleware, getUserPersonalController)
router.patch('/update', authMiddleware, updateProfileController)

export default router
