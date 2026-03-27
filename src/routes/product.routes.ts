import express from "express"
import { addProduct ,getbyId,getAllProducts , deleteProductById, updateProductById} from "../controller/product.controller.js"
import { onlyAdmin, requiresAuth } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/:id" ,getbyId)
router.get("/",getAllProducts)

router.post("/createProduct", requiresAuth,onlyAdmin,addProduct)
router.patch("/:id", requiresAuth,onlyAdmin,updateProductById)
router.delete("/:id",requiresAuth, onlyAdmin, deleteProductById)

export default router