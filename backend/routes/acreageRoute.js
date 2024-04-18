import express  from "express";
import { getAcreageController } from "../controllers/acreageController";

const router = express.Router()

router.get('/get-all', getAcreageController)

export default router
