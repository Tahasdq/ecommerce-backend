import express from 'express'
import {registerUser , loginUser} from '../controller/auth.controller.js'
import { requiresAuth } from '../middlewares/auth.middleware.js'
const router = express.Router()


router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/me', requiresAuth , (req, res) => {
  res.json({ user: req.user });
})

export default router