import express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { updateProfileController } from "../controllers/userController.js";

const router = express.Router()

router.use(authMiddleware)
router.patch('/update', updateProfileController)

export default router
