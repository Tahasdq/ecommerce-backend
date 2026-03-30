import express from 'express'
import { onlyAdmin, requiresAuth } from '../middlewares/auth.middleware.js'
import { getAllUsers } from '../controller/user.controllers.js'
const router = express.Router()

router.get("/", requiresAuth,onlyAdmin,getAllUsers)

export default  router