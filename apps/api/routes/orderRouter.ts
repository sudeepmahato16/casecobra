import { Router } from "express";
import { isAuthenticated } from "@/middleware/isAuthenticated";
import {
  createCheckoutSession,
  getOrderById,
  getRecentOrders,
  getStats,
} from "@/controller/orderController";

const orderRouter: Router = Router();

orderRouter.use(isAuthenticated);

orderRouter.get("/checkout-session/:id", createCheckoutSession);

orderRouter.get("/recent-orders", getRecentOrders);
orderRouter.get("/stats", getStats);
orderRouter.get("/:id", getOrderById);

export { orderRouter };
