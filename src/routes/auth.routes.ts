import express from 'express'
import {registerUser , loginUser ,verifyUserEmail ,verifyUserEmailByLink} from '../controller/auth.controller.js'
import { requiresAuth } from '../middlewares/auth.middleware.js'
const router = express.Router()


router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/me', requiresAuth , (req, res) => {
  res.json({ user: req.user }); // defined type in express.d.ts file
})
router.post('/verify-email' , verifyUserEmail)
router.get('/verify-email-link', verifyUserEmailByLink)

export default router