import express  from "express";
import { addMessageController, getMessageController } from "../controllers/messageController.js";

const router = express.Router()

router.post('/', addMessageController)
router.get('/:chatId', getMessageController)

export default router
