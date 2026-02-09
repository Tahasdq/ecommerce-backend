import express from 'express'
import {orderStatus} from '../controller/order.controller.js'
import { requiresAuth } from '../middlewares/auth.middleware.js'
const router = express.Router()


router.get('/status' ,requiresAuth, orderStatus)

export default router