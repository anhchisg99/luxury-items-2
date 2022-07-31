import express from "express";
import { vendorController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const vendorRouter = express.Router();

vendorRouter.get("/revenue", auth.verifyToken, vendorController.getRevenue);
vendorRouter.get("/filter-order", auth.verifyToken, vendorController.getOrdersFilterByStatus);
vendorRouter.get("/all-orders", auth.verifyToken, vendorController.getAllOrders);
vendorRouter.get("/search-order", auth.verifyToken, vendorController.searchOrders);
vendorRouter.get("/:id", vendorController.getStoreDetail);
vendorRouter.patch("/:id/change-status", auth.verifyToken, vendorController.updateStatusOrder);
vendorRouter.patch("/", auth.verifyToken, vendorController.updateInformation);

export default vendorRouter;
