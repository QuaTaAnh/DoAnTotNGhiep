import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createChatController, findChatController, userChatsController } from "../controllers/chatController.js";

const router = express.Router()

router.post('/', authMiddleware, createChatController)
router.get('/:userId', userChatsController)
router.get('/find/:firstId/:secondId', findChatController)

export default router
