import express from "express";
import { favoriteController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const favoriteRouter = express.Router();

favoriteRouter.get("/",auth.verifyToken, favoriteController.getAllFavorites);
favoriteRouter.get("/create-favorite-product",auth.verifyToken, favoriteController.createFavoritesProduct);
favoriteRouter.get("/del-favorite-product",auth.verifyToken, favoriteController.removeFavoritesProduct);
// favoriteRouter.get("/create-favorite-vendor", favoriteController.createFavoritesVendor);
// favoriteRouter.get("/del-favorite-vendor", favoriteController.removeFavoritesVendor);
favoriteRouter.get("/create-favorite-brand",auth.verifyToken, favoriteController.createFavoritesBrand);
favoriteRouter.get("/del-favorite-brand",auth.verifyToken, favoriteController.removeFavoritesBrand);
// auth.verifyToken,
export default favoriteRouter;
