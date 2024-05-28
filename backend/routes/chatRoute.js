import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createChatController, userChatsController } from "../controllers/chatController.js";

const router = express.Router()

router.post('/:receiverId', authMiddleware, createChatController)
router.get('/:userId', userChatsController)

export default router
