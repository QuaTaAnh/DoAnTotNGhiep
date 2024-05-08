import express  from "express";
import { checkFollowController, followController, unFollowController } from "../controllers/followController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get('/:userId/is-check', authMiddleware, checkFollowController)
router.post('/:userId', authMiddleware, followController)
router.delete('/:userId', authMiddleware, unFollowController)

export default router
