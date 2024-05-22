import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addMessageController, getMessageController } from "../controllers/messageController.js";

const router = express.Router()

router.post('/', authMiddleware, addMessageController)
router.get('/:chatId', getMessageController)

export default router
