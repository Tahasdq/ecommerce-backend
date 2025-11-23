import express from 'express'
const router = express.Router()
import {makePayment} from  '../controller/payment.controller.js'
router.post("/" ,makePayment )

export default router