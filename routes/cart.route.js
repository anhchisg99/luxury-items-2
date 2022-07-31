import express from "express";
import {
  cartController,
} from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const cartRoute = express.Router();

//TODO: Route for cart
cartRoute.post("/", cartController.createOne)
cartRoute.get("/", cartController.getAllCartItems)
cartRoute.delete("/empty-cart", cartController.getEmptyCart);

export default cartRoute;
