import express  from "express";
import { getPriceController } from "../controllers/priceController";

const router = express.Router()

router.get('/get-all', getPriceController)

export default router
