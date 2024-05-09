import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createCommentController, deleteCommentController, getCommentByPageController, updateCommentController } from "../controllers/commentController.js";

const router = express.Router()

router.post('/create', authMiddleware, createCommentController)
router.get('/get-all', getCommentByPageController)
router.put('/:id', authMiddleware, updateCommentController)
router.delete('/:id', authMiddleware, deleteCommentController)

export default router
