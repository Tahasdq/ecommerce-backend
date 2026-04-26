import express from 'express'
import { onlyAdmin, requiresAuth } from '../middlewares/auth.middleware.js'
import dashboardController from '../controller/dashboard.controller.js'
const router = express.Router()
router.get("/total-revenue",requiresAuth , onlyAdmin ,dashboardController.totalRevenue )
router.get("/total-orders",requiresAuth , onlyAdmin ,dashboardController.totalOrders )
router.get("/total-customers",requiresAuth , onlyAdmin ,dashboardController.totalCustomers )
router.get("/total-products",requiresAuth , onlyAdmin ,dashboardController.totalProducts )
router.get("/top-products",requiresAuth , onlyAdmin ,dashboardController.topProducts )
router.get("/recent-orders",requiresAuth , onlyAdmin ,dashboardController.recentOrders )
router.get("/sales-overview",requiresAuth , onlyAdmin ,dashboardController.salesOverview )
router.get("/total-sales-per-month",requiresAuth , onlyAdmin ,dashboardController.totalSalesPerMonth )

export default router