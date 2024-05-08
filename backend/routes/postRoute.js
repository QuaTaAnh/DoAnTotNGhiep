import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getPostController, getNewPostController, getPostSearchController, createPostController, getPostByIdController, getPostSuggestController } from "../controllers/postController";

const router = express.Router()

router.get('/get-all', getPostController)
router.get('/get-new', getNewPostController)
router.get('/get-suggest', getPostSuggestController)
router.get('/search/:keyword', getPostSearchController)
router.get('/:id/detail', getPostByIdController)

router.post('/create', authMiddleware, createPostController)

export default router
