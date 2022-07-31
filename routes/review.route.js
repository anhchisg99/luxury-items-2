import express from "express";
import { reviewProductController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const ReviewRouter = express.Router();

ReviewRouter.post("/:id", auth.verifyToken, reviewProductController.createReview);
ReviewRouter.get("/:id", reviewProductController.getOne);
// WishlistRoute.delete("/:id", auth.verifyToken, wishlistProduct.deleteItem);

export default ReviewRouter;
