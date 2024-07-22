import { Router } from "express";
import { isAuthenticated } from "@/middleware/isAuthenticated";
import { createCheckoutSession } from "@/controller/orderController";

const orderRouter: Router = Router();

orderRouter.use(isAuthenticated);

orderRouter.get("/checkout-session/:id", createCheckoutSession);

export { orderRouter };
