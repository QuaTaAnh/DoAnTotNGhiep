import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminUpdateUserController, getAllUserController, getUserByIdController, getUserPersonalController, statistUserRegisterController, updateProfileController } from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/all', authMiddleware, adminMiddleware, getAllUserController)
router.get('/static-user-register', authMiddleware, adminMiddleware, statistUserRegisterController)
router.get('/:id', authMiddleware, getUserPersonalController)
router.get('/follow/:id', authMiddleware, getUserByIdController)
router.patch('/update', authMiddleware, updateProfileController)
router.patch('/admin-update', authMiddleware, adminMiddleware, adminUpdateUserController)

export default router
