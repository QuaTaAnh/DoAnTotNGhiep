import express  from "express";
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get('/get-all', getCategoryController)
router.post('/create', authMiddleware, adminMiddleware, createCategoryController)
router.post('/update/:id', authMiddleware, adminMiddleware, updateCategoryController)
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategoryController)

export default router
