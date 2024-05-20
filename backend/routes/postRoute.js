import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getPostController, getNewPostController, getPostSearchController, createPostController, getPostByIdController, getPostSuggestController, getPostByUserIdController, hiddenPostController, adminGetPostController, getPostFollowController, incrementPostViewController, monthlyPostCountController, topViewPostController } from "../controllers/postController";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/monthly-posts', authMiddleware, adminMiddleware, monthlyPostCountController)
router.get('/top-view', authMiddleware, adminMiddleware, topViewPostController)
router.get('/get-all', getPostController)
router.get('/get-new', getNewPostController)
router.get('/get-follow', authMiddleware, getPostFollowController)
router.get('/get-suggest', getPostSuggestController)
router.get('/:userId', getPostByUserIdController)
router.get('/search/:keyword', getPostSearchController)
router.get('/:id/detail', getPostByIdController)

router.post('/create', authMiddleware, createPostController)
router.post('/hidden/:postId', authMiddleware, hiddenPostController)
router.post('/increment-view/:postId', authMiddleware, incrementPostViewController)

export default router
