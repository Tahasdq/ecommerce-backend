import express from "express"
import { addProduct ,getbyId} from "../controller/product.controller.js"
const router = express.Router()

router.post("/", addProduct)
router.get("/:id" , getbyId)

export default router