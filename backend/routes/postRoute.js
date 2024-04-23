import express  from "express";
import { getPostController, getNewPostController } from "../controllers/postController";

const router = express.Router()

router.get('/get-all', getPostController)
router.get('/get-new', getNewPostController)

export default router
