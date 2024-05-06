import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getPostController, getPostSearchController, createPostController } from "../controllers/postController";

const router = express.Router()

router.get('/get-all', getPostController)
router.get('/search/:keyword', getPostSearchController)

router.post('/create', authMiddleware, createPostController)

export default router
