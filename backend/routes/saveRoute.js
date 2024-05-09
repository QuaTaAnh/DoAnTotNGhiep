import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkFavoriteController, getFavoriteByPageController, savePostController, unSavePostController } from "../controllers/saveController.js";

const router = express.Router()

router.post('/:postId', authMiddleware, savePostController)
router.delete('/:postId', authMiddleware, unSavePostController)
router.get('/:postId/is-check', authMiddleware, checkFavoriteController)
router.get('/:userId', getFavoriteByPageController)

export default router
