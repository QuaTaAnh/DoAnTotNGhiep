import express  from "express";
import { insertController } from "../controllers/insert.js";

const router = express.Router()

router.post('/', insertController)

export default router
