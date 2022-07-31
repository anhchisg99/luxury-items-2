import express from "express";
import { wishlistProductController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const WishlistRoute = express.Router();

WishlistRoute.get("/", auth.verifyToken, wishlistProductController.getOne);
WishlistRoute.post("/", auth.verifyToken, wishlistProductController.addFavorites);
WishlistRoute.delete("/remove", auth.verifyToken, wishlistProductController.deleteItem);

export default WishlistRoute;
