import express from "express";
import { productCategoryController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const productCategoryRouter = express.Router();

productCategoryRouter.get("/", productCategoryController.listAll);
productCategoryRouter.get("/parent", productCategoryController.getAllParentCategories);
productCategoryRouter.get("/popular", productCategoryController.getCategoriesHome);
productCategoryRouter.post("/", auth.verifyToken, productCategoryController.createOne);
productCategoryRouter.get("/:id", productCategoryController.getOne);
productCategoryRouter.patch("/:id", auth.verifyToken, productCategoryController.updateOne);
productCategoryRouter.delete("/:id", auth.verifyToken, productCategoryController.deleteOne);

export default productCategoryRouter;

