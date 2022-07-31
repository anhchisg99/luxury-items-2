import express from "express";
import { favoriteArticleController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";
const favoriteArticleRouter = express.Router();

favoriteArticleRouter.post("/", auth.verifyToken, favoriteArticleController.addFavorites);
favoriteArticleRouter.get("/", auth.verifyToken, favoriteArticleController.getOne);
favoriteArticleRouter.delete("/remove", auth.verifyToken, favoriteArticleController.removeFavorite);

export default favoriteArticleRouter;
