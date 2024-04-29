import express  from "express";
import { getPostController, getNewPostController, getPostSearchController } from "../controllers/postController";

const router = express.Router()

router.get('/get-all', getPostController)
router.get('/get-new', getNewPostController)
router.get('/search/:keyword', getPostSearchController)

export default router
