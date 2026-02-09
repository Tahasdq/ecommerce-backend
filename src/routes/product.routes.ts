import express from "express"
import { addProduct ,getbyId,getAllProducts , deleteProductById} from "../controller/product.controller.js"
import { requiresAuth } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/createProduct", requiresAuth,addProduct)
router.get("/:id" ,getbyId)
router.get("/",getAllProducts)
router.delete("/:id",requiresAuth,deleteProductById)

export default router