import express from 'express'
import {orderStatus , getAllOrders,getOrderById , updateOrderById , getOrdersByUserId} from '../controller/order.controller.js'
import { requiresAuth ,onlyAdmin } from '../middlewares/auth.middleware.js'
const router = express.Router()


router.get('/status' ,requiresAuth, orderStatus)
router.get('/:id' ,requiresAuth , getOrderById )
router.get('/user/:id' ,requiresAuth ,  getOrdersByUserId)

router.put('/:id' ,requiresAuth , onlyAdmin,updateOrderById )
router.get('/'  ,requiresAuth, onlyAdmin,getAllOrders)

export default router