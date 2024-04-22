import express  from "express";
import { getNewPostController, getPostController } from "../controllers/postController";

const router = express.Router()

router.get('/get-all', getPostController)
router.get('/get-new-all', getNewPostController)

export default router
