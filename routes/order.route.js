import express, { Router } from "express";
import {
  orderController
} from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const orderRouter = express.Router();

//TODO: Route for order
// orderRouter.post("/", auth.verifyToken, orderController.createOrder)
// orderRouter.post("/order-vendor", auth.verifyToken, orderController.createOrdersForVendor)
orderRouter.get('/shipping-information',auth.verifyToken, orderController.shippingInformation)
orderRouter.get('/filter-status',auth.verifyToken, orderController.getOrdersFilterByStatus)
// orderRouter.patch("/:id/pay", orderController.updateOrderToPay)
// orderRouter.patch("/:id/deliver", auth.verifyToken, orderController.updateOrderToDeliver)
// orderRouter.get("/:id", auth.verifyToken, orderController.getOne)


export default orderRouter;
