import express from "express";
import { vendorProductController, guestProductController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const productRouter = express.Router();

productRouter.post("/", auth.verifyToken, vendorProductController.createOne); //TODO: Change role
productRouter.post("/search", guestProductController.searchProductsByFilters);
productRouter.get("/", guestProductController.getAllWithPagination);
productRouter.get("/search-total-vendor", vendorProductController.searchTotalVendor);
productRouter.get("/favorite-product", guestProductController.sortFavoritesProduct);
productRouter.get("/hot-picks", guestProductController.getHotPicks);
productRouter.get("/popular", guestProductController.getPopular);
productRouter.get("/favorite-user", auth.verifyToken, guestProductController.getFavoritesUser);
productRouter.get("/fashion-product", guestProductController.getFashionProduct);
productRouter.get("/new-arrival", guestProductController.getNewArrival);
productRouter.get("/search-name-product", guestProductController.searchNameProduct);
productRouter.get("/search-total", guestProductController.searchTotal);
productRouter.get("/search", guestProductController.queryByKeywords);
productRouter.get("/all-product-vendor/:id", guestProductController.getAllProductOfVendor);
productRouter.get("/similar-product/:id", guestProductController.similarProduct); //TODO: Change role
productRouter.get("/sponsored-product/:id", guestProductController.sponsoredProduct); //TODO: Change role
productRouter.patch("/:id", auth.verifyToken, vendorProductController.updateOne);
productRouter.get("/:id", guestProductController.getProductDetail);
productRouter.get("/:id", guestProductController.getProductDetail);
productRouter.patch("/:id/restore", auth.verifyToken, vendorProductController.restore);
productRouter.delete("/:id", auth.verifyToken, vendorProductController.deleteTemporarily);

export default productRouter;
