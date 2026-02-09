import express from 'express'
const router = express.Router()
import {makePayment,webhook} from  '../controller/payment.controller.js'
import { requiresAuth } from '../middlewares/auth.middleware.js'
router.post("/" ,requiresAuth,makePayment )
router.post("/webhook" ,webhook)

export default router