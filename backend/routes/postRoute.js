import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getPostController, getNewPostController, getPostSearchController, createPostController, getPostByIdController, getPostSuggestController, getPostByUserIdController, hiddenPostController, adminGetPostController, getPostFollowController, incrementPostViewController } from "../controllers/postController";

const router = express.Router()

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
