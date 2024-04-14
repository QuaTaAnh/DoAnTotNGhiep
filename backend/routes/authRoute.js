import express  from "express";
import { getProfileController, loginController, registerController } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)

router.use(authMiddleware)
router.get('/profile', getProfileController)

export default router
