import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createCommentController, getCommentByPageController } from "../controllers/commentController.js";

const router = express.Router()

router.post('/create', authMiddleware, createCommentController)
router.get('/get-all', getCommentByPageController)
// router.post('/update/:id', authMiddleware, updateCommentController)
// router.delete('/:id', authMiddleware, deleteCommentController)

export default router
